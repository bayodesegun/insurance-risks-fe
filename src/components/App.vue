<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li><router-link to="/home" class="home-link">Home</router-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-if="!user.authenticated"><router-link to="/login" class="login-logout-link">Login</router-link></li>
          <li v-if="user.authenticated"><a href="#" @click="logout()" class="login-logout-link">Logout</a></li>
        </ul>
      </div>    
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import auth from '@/auth'

export default {
  data() {
    return {
      user: auth.user
    }
  },

  methods: {
    logout() {
      auth.logout()
    }
  }
}
</script>
