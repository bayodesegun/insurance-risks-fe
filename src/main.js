// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Resource from 'vue-resource'
import App from './components/App.vue'
import router from './router'
import auth from '@/auth'
require('bootstrap/dist/css/bootstrap.min.css')

Vue.use(Resource)
Vue.config.productionTip = false

// API URLs
const BASE_URL = (process.env.NODE_ENV == 'production') ? 'https://api.ins-risks.bayodesegun.com': 'http://127.0.0.1:8000'
const RISKS_URL = BASE_URL + '/risks/'
const LOGIN_URL = BASE_URL + '/obtain-token/'

// A function for generating 'pretty' error messages
export function processError (resp) {
  if (resp.status == 0) {
    return "Unable to reach API server; please check connectivity to server."
  }
  return `${resp.statusText} - ${resp.bodyText}`
}

export {RISKS_URL, LOGIN_URL}

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

