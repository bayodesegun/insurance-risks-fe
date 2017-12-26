import chai from 'chai'
import Vue from 'vue'
import auth from '@/auth'

var should = chai.should()

describe('auth module', () => {
  const token = 'ho13489y320r09h023r'
  beforeEach(() => {  	
  	localStorage.setItem('token', token)
  })

  it('should contain the right properties and methods', () => {
    auth.user.should.be.an('object')
    auth.login.should.be.a('function')
    auth.logout.should.be.a('function')
    auth.checkAuth.should.be.a('function')
    auth.getAuthHeader.should.be.a('function')
  })

  it('should authenticate when user token is present', () => {
    auth.checkAuth()
    auth.user.authenticated.should.be.true
  })

  it('should not authenticate when user token is absent', () => {
    localStorage.removeItem('token')
    auth.checkAuth()
    auth.user.authenticated.should.be.false
  })

  it('should remove token and unauthenticate user upon logout()', () => {
    auth.logout()
    should.not.exist(localStorage.getItem('token'))
    auth.user.authenticated.should.be.false
  })

  it('should return correct header using getAuthHeader()', () => {
    var header = auth.getAuthHeader()
    header.should.be.an('object')
    header.Authorization.should.equal(`Token ${token}`)
  })

  it('should set token and authenticate user upon login', async () => {
    localStorage.removeItem('token') // remove existing token first
    await auth.login(new Vue(), {username: 'test', password: 'test'}, null).then(() => {
      (localStorage.getItem('token')).should.be.a('string')
      auth.user.authenticated.should.be.true  
    })
  })
})
