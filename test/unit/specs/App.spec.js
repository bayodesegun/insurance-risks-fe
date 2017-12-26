import App from '@/components/App'
import Vue from 'vue'
import {mount} from 'vue-test-utils'
import sinon from 'sinon'
import router from '@/router'
import auth from '@/auth'

describe('App.vue', () => {
	let wrapper
	beforeEach(() => {
		wrapper = mount(App, {router })	
	})

	it('should have the required properties and methods', () => {   
    expect(wrapper.vm.user).toEqual(auth.user)
    expect(wrapper.vm.logout).toBeInstanceOf(Function)
  })

  it('should render correct text/markup when user is not logged in', () => {
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Login')
  	expect(wrapper.find('a.home-link').exists()).toBe(true)
  	expect(wrapper.find('a.login-logout-link').exists()).toBe(true)
  })

  it('should render correct text/markup when user is logged in', (done) => {
  	auth.user.authenticated = true
  	Vue.nextTick( () => {
      expect(wrapper.text()).toContain('Home')
      expect(wrapper.text()).toContain('Logout')
      done()
    })      
  })

  it('should call logout() method when logout link is clicked', (done) => {
  	auth.user.authenticated = true
  	Vue.nextTick( () => {
      const logoutStub = sinon.stub()
      wrapper.setMethods({ logout: logoutStub })
      wrapper.find('a.login-logout-link').trigger('click')
      expect(logoutStub.called).toBe(true)
      done()
    }) 
  	
  })

  it('should redirect to "/login" when Logout link is clicked', (done) => {
  	localStorage.setItem('token', 'hihfhoewhfoho') // so that auth.checkAuth() can pass
    wrapper = mount(App, {router }) // remount to call the created hook
  	Vue.nextTick( () => {
      const prevRoute = wrapper.vm.$route.path // expect '/home'
      wrapper.find('a.login-logout-link').trigger('click')      
      const currentRoute = wrapper.vm.$route.path
      expect(prevRoute).not.toEqual(currentRoute)
      expect(currentRoute).toEqual('/login')
      done()      
    })  	
  })

  it('should redirect to "/home" when Home link is clicked (and user is logged in)', (done) => {
  	const prevRoute = wrapper.vm.$route.path //expect '/login'
    localStorage.setItem('token', 'hihfhoewhfoho') // so that auth.checkAuth() can pass
    wrapper = mount(App, {router }) // remount to call the created hook
    Vue.nextTick( () => {
      wrapper.find('a.home-link').trigger('click')
      const currentRoute = wrapper.vm.$route.path
      expect(prevRoute).not.toEqual(currentRoute)
      expect(currentRoute).toEqual('/home')
      done()     
    })    
  })
})
