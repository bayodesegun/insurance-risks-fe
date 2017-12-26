import Login from '@/components/Login'
import {mount} from 'vue-test-utils'
import Vue from 'vue'
import sinon from 'sinon'
import router from '@/router'

describe('Login.vue', () => {
	let wrapper
	beforeEach(() => {
		wrapper = mount(Login, {router})
	})

	it('should have the required properties and methods', () => {
    expect(wrapper.vm.credentials).toBeInstanceOf(Object)
    expect(wrapper.vm.error).toEqual("")
    expect(wrapper.vm.submit).toBeInstanceOf(Function)
  })

  it('should render correct initial text/markup on page', () => {
    expect(wrapper.text()).toContain('Log In')
    expect(wrapper.find('h4').exists()).toBe(true)
    expect(wrapper.text()).toContain('Log in to your account')
    expect(wrapper.find('p.login-message').exists()).toBe(true)
  	expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  	expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  	expect(wrapper.find('button.login-submit').exists()).toBe(true)
  	expect(wrapper.find('p.alert').exists()).toBe(false)
  })

  it('should call submit() method when Login Submit button is clicked', () => {
  	const loginStub = sinon.stub()
		wrapper.setMethods({ submit: loginStub })
    wrapper.find('button.login-submit').trigger('click')
    expect(loginStub.called).toBe(true)
  })

  it('should show the error box if there\'s an error', (done) => {
    wrapper.vm.error = 'Test error'
    Vue.nextTick( () => {
      expect(wrapper.find('p.alert').exists()).toBe(true)
      done()
    })    
  })

  it('should generate error when credentials are missing', (done) => {
    wrapper.vm.credentials = {'username': '', 'password': 'password'}
    wrapper.find('button.login-submit').trigger('click')
    Vue.nextTick( () => {
      expect(wrapper.vm.error).toContain('Username is required')
      wrapper.vm.credentials = {'username': 'username', 'password': ''}
      wrapper.find('button.login-submit').trigger('click')
      expect(wrapper.vm.error).toContain('Password is required')
      done()
    })  
  })
})
