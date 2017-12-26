import Home from '@/components/Home'
import {mount} from 'vue-test-utils'
import router from '@/router'
import auth from '@/auth'
import Vue from 'vue'
import chai from 'chai'
import sinon from 'sinon'
var expect = chai.expect

describe('Home.vue', () => {
	let wrapper
	beforeAll( () => {
  		wrapper = mount(Home, {router })
  })

  it('should have the required properties and methods', () => {   
    expect(wrapper.vm.user).to.equal(auth.user)
    expect(wrapper.vm.error).to.not.be.undefined
    expect(wrapper.vm.risks).to.be.an('array')
    expect(wrapper.vm.riskId).to.not.be.undefined
    expect(wrapper.vm.riskDetails).to.be.an('object')
    expect(wrapper.vm.riskFormButtonEnabled).to.be.a('boolean')
    expect(wrapper.vm.formData).to.be.an('object')
    expect(wrapper.vm.submittedData).to.be.an('object')
    expect(wrapper.vm.FIELD_TYPES).to.be.an('object')
    expect(Home.created).to.be.a('function')
    expect(wrapper.vm.getRiskDetails).to.be.a('function')
    expect(wrapper.vm.resetForm).to.be.a('function')
    expect(wrapper.vm.hideForm).to.be.a('function')
    expect(wrapper.vm.submitForm).to.be.a('function')
  })

  it('should render correct contents when user is not logged in', () => {
    expect(wrapper.text()).to.equal('') 
  })

  it('should render correct contents when user is logged in', (done) => {
  	auth.user.authenticated = true
  	wrapper.vm.risks = 	[
    	{id: 1, name: 'Phone'},
    	{id: 2, name: 'Hair'},
    ]
  	Vue.nextTick(() => {
  		expect(wrapper.text()).to.contain('Welcome! Select a risk type to show the corresponding form')  		
  		expect(wrapper.html()).to.contain('<option value="1">')
  		expect(wrapper.html()).to.contain('<option value="2">')
  		expect(wrapper.html()).to.contain('Phone')
  		expect(wrapper.html()).to.contain('Hair')
  		expect(wrapper.find('div.risk-select-div').exists()).to.be.true
  		expect(wrapper.find('select.form-control').exists()).to.be.true
  		expect(wrapper.find('option').exists()).to.be.true
  		expect(wrapper.find('button.risk-form-show').exists()).to.be.true
  		done()
  	})    
  })

  it('should call getRiskDetails() when Show Form button is clicked', (done) => {
   	const getRiskDetailsStub = sinon.stub()
    wrapper.setMethods({ getRiskDetails: getRiskDetailsStub })
    wrapper.find('button.risk-form-show').trigger('click')
  	Vue.nextTick( () => {      
      expect(getRiskDetailsStub.called).to.be.true
      done()
    })  	
  })

  it('should render correct contents when risk details data is present', (done) => {
  	auth.user.authenticated = true
  	wrapper.vm.riskDetails = 	{
    	risk: 'Phone', 
    	fields: [
    		{name: 'Full Name', type: 1},
    		{name: 'Insured Amount', type: 2},
    		{name: 'Insured Date', type: 3},
    		{name: 'Cover Type', type: 4, options: ['Basic', 'Comprehensive', 'Premium']},

    	]
    }
  	Vue.nextTick(() => {
  		expect(wrapper.text()).to.contain('Risk form for Phone')
  		expect(wrapper.find('div.risk-form-div').exists()).to.be.true
  		expect(wrapper.find('input[type="text"][name="Full Name"]').exists()).to.be.true
  		expect(wrapper.find('input[type="number"][name="Insured Amount"]').exists()).to.be.true
  		expect(wrapper.find('input[type="date"][name="Insured Date"]').exists()).to.be.true
  		expect(wrapper.find('input[type="radio"][name="Basic"]').exists()).to.be.true
  		expect(wrapper.find('input[type="radio"][name="Comprehensive"]').exists()).to.be.true
  		expect(wrapper.find('input[type="radio"][name="Premium"]').exists()).to.be.true
  		expect(wrapper.find('button.risk-form-hide').exists()).to.be.true
  		expect(wrapper.find('button.risk-form-submit').exists()).to.be.true
  		expect(wrapper.find('button.risk-form-reset').exists()).to.be.true
  		done()
  	})    
  })

  it('submitForm() should work as expected when Submit button is clicked', (done) => {
  	wrapper.vm.formData['Full Name'] = 'Bayode Aderinola'
   	wrapper.vm.formData['Insured Amount'] = 15000
  	Vue.nextTick( () => {
  		expect(Object.keys(wrapper.vm.formData).length).to.equal(2)
  		wrapper.find('button.risk-form-submit').trigger('click')      
      expect(Object.keys(wrapper.vm.formData).length).to.equal(0)
      expect(Object.keys(wrapper.vm.submittedData).length).to.equal(2)
      expect(wrapper.vm.submittedData['Full Name']).to.equal('Bayode Aderinola')
      expect(wrapper.vm.submittedData['Insured Amount']).to.equal(15000)
      done()
    })  	
  })

  it('clearForm() should work as expected when Reset button is clicked', (done) => {
  	wrapper.vm.formData['Full Name'] = 'Bayode Aderinola'
   	wrapper.vm.formData['Insured Amount'] = 15000
  	Vue.nextTick( () => {
  		expect(Object.keys(wrapper.vm.formData).length).to.equal(2)
  		wrapper.find('button.risk-form-reset').trigger('click')      
      expect(Object.keys(wrapper.vm.formData).length).to.equal(0)
      done()
    })  	
  })

  it('hideForm() should work as expected when Hide Form button is clicked', (done) => {
   	wrapper.vm.formData = {'Full Name': 'Bayode Aderinola'}
    wrapper.find('button.risk-form-hide').trigger('click')
  	Vue.nextTick( () => {
      expect(Object.keys(wrapper.vm.riskDetails).length).to.equal(0)
      expect(Object.keys(wrapper.vm.formData).length).to.equal(0)
      expect(wrapper.find('div.risk-form-div').exists()).to.be.false
      done()
    })  	
  })

})
