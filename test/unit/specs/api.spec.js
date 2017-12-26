import chai from 'chai'
import Vue from 'vue'
import Resource from 'vue-resource'
import {routes} from '../setup'
import { mount } from 'vue-test-utils'
import api from '@/api'

Vue.use(Resource)
var should = chai.should()

describe('API module', () => {
  let compInstance
  beforeEach(() => {
    var comp = Vue.component('test-comp', {
      data() {
        return {
          risks: [],
          riskDetails: {},
          riskId: 1,
          error: 'no error!'
        }
      }
    })
    const wrapper = mount(comp)
    compInstance = wrapper.vm
  })

  it('should contain the right methods', () => {    
    api.getRisks.should.be.a('function')
    api.getRiskDetails.should.be.a('function')    
  })

  it('should return correct risks data with getRisks()', async () => {
    const expectedRisks = routes.find( obj => { return obj.api === 'getRisks' }).response    
    await api.getRisks(compInstance).then(() => {
      compInstance.risks.should.equal(expectedRisks)
      compInstance.error.should.equal('no error!')
    })    
  })

  it('should return correct risk details data with getRiskDetails()', async () => {
    const expectedRiskDetails = routes.find( obj => { return obj.api === 'getRiskDetails' }).response    
    await api.getRiskDetails(compInstance).then(() => {
      compInstance.riskDetails.should.equal(expectedRiskDetails)
      compInstance.error.should.equal('no error!') 
    })    
  })

  it('should return error when calling getRiskDetails() with incorrect riskId', async () => {
    compInstance.riskId = 99
    const expectedRiskDetails = routes.find( obj => { return obj.api === 'getRiskDetails' }).response    
    await api.getRiskDetails(compInstance).then(() => {
      compInstance.riskDetails.should.not.equal(expectedRiskDetails)
      compInstance.error.should.not.equal('no error!')  
    })    
  })
})
