import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'

Vue.use(Router)

const routes = [
    { 
    	path: '*', 
    	name: 'any',
    	component: Home 
    },
    { 
    	path: '/home', 
    	name: 'home',
    	component: Home 
    },
    { 
    	path: '/login', 
    	name: 'login',
    	component: Login 
    }
]

export default new Router({
	mode: 'history',
  	routes: routes
})
