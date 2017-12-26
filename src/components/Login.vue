<template>
  <div class="col-md-4 col-md-offset-4 col-sm-12 login-form-div">
    <h4>Log In</h4>
    <p class="text-center login-message">Log in to your account to see your risk types.</p>
    <div class="form-group">
      <input 
        type="text" 
        class="form-control"
        placeholder="Enter your username"
        v-model="credentials.username"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="credentials.password"
      >
    </div>
    <div class="row">
      <div class="col-md-9 col-xs-12">
        <p class="alert alert-danger" v-if="error">{{ error }}</p>
      </div>
      <div class="col-md-3 col-xs-12">
        <button class="btn btn-primary pull-right login-submit" @click="submit()">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/auth'

export default {

  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },

  // redirect to '/home' if logged in already
  created() {
    if (auth.checkAuth()) {
        this.$router.push('/home')
    }
  },
  
  methods: {

    submit() {

      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }
      if (!credentials.username) {
        this.error = "Username is required."
        return
      }

      if (!credentials.password) {
        this.error = "Password is required."
        return
      }

      auth.login(this, credentials, '/home')

    }
  }
  
}
</script>