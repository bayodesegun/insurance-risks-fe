'use strict'
import {RISKS_URL, processError} from '@/main'
import auth from '@/auth'

export default {

  getRisks: async (context) => {
    await context.$http
      .get(RISKS_URL, {headers: auth.getAuthHeader()}).then(okResp  => {
        context.risks = okResp.body
      },
      errorResp => {
        context.error = processError(errorResp)
      })
  },

  getRiskDetails: async (context) => {
    await context.$http
      .get(RISKS_URL + `${context.riskId}/`, { headers: auth.getAuthHeader() } ).then(okResp => {
        context.riskDetails = okResp.body
      }, 
      errorResp => {
        context.error = processError(errorResp)
      })
  }
}
