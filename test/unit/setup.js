'use strict'
import Vue from 'vue'
import Resource from 'vue-resource'
import VueRouter from 'vue-router'
import 'jest-localstorage-mock'

Vue.use(VueRouter)
Vue.use(Resource)

// Mock calls to API
let BASE_URL = (process.env.NODE_ENV == "production") ? 'https://api.ins-risks.bayodesegun.com': 'http://127.0.0.1:8000'
let routes = [
  {
    api: 'login',
    method: 'POST',
    url: BASE_URL + '/obtain-token/',
    response: {token: 'hoghwoighyr9yrywohsd'},
  },

  {
    api: 'getRisks',
    method: 'GET',
    url: BASE_URL + '/risks/',
    response: [
    	{id: 1, name: 'Phone'},
    	{id: 2, name: 'Hair'},
    ]
  },

  {
    api: 'getRiskDetails',
    method: 'GET',
    url: BASE_URL + '/risks/1/',
    response: {
    	risk: 'Phone', 
    	fields: [
    		{name: 'Full Name', type: 1},
    		{name: 'Insured Amount', type: 2},
    		{name: 'Insured Date', type: 3},
    		{name: 'Cover Type', type: 4, options: ['Basic', 'Comprehensive', 'Premium']},

    	]
    }
  }
]

export { routes }

Vue.http.interceptors.unshift((request, next) => {
  let route = routes.find((item) => {
    return (request.method === item.method && request.url === item.url)
  })

  if (!route) {
    next(
    	request.respondWith({},
    		{
    			status: 404, 
    			statusText: 'Oh no! Not found!'
    		})
    	)
  } else {
    next(
      request.respondWith(
        route.response,
        {status: 200}
      )
    )
  }
})
