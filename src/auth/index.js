import router from '@/router'
import {LOGIN_URL, processError} from '@/main'

export default {

  user: {
    authenticated: false
  },

  login: async function (context, creds, redirect) { // sorry arrow function messes `this` up!
    await context.$http.post(LOGIN_URL, creds).then(okResp => {
      localStorage.setItem('token', okResp.body.token)
      this.user.authenticated = true
      if(redirect) {
        router.push(redirect)        
      }
    }, 
    errorResp => {
      context.error = processError(errorResp)
    })
  },

  logout() {
    localStorage.removeItem('token')
    this.user.authenticated = false
    router.push('login')
  },

  checkAuth() {
    var token = localStorage.getItem('token')
    if(token) {
      this.user.authenticated = true
      return true
    }
    else {
      this.user.authenticated = false
      return false      
    }
  },

  getAuthHeader() {
    return {
      'Authorization': 'Token ' + localStorage.getItem('token')
    }
  }
}
