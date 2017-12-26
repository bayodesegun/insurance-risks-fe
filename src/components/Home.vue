<template>
  <div class="app">
    <div class="col-md-6 col-md-offset-3 col-sm-12">
      <h4 v-if="user.authenticated" class="text-center welcome-message">Welcome! Select a risk type to show the corresponding form.</h4>
      <div v-if="user.authenticated">      
         <!-- All risks drop down -->
        <div v-if="risks.length" class="risk-select-div">            
          <div class="row">
            <div class="col-md-8 col-sm-12">
              <select v-model="riskId" v-on:change="riskFormButtonEnabled=true" class="form-control">
                <option v-for="risk in risks" v-bind:value="risk.id">
                  {{ risk.name }}
                </option>
              </select>
            </div>
            <div class="col-md-4 col-sm-12">
              <button class="btn btn-primary form-control risk-form-show" v-on:click="getRiskDetails()" :disabled="!riskFormButtonEnabled">Show Form</button>
            </div>
          </div>
        </div>
        <div v-if="error"> 
          <br>         
          <div class="alert alert-danger">{{ error }}</div>
        </div> 
      </div> 
    </div>
    
    <!-- Risk details form -->
    <div class="col-md-8 col-md-offset-2 col-sm-12 risk-form-div" v-if="Object.keys(riskDetails).length">
      <hr>
      <button class="btn-danger btn-link pull-right risk-form-hide" v-on:click="hideForm()">&#10060;</button>
      <h3 class="text-center risk-form-header">Risk form for <b>{{ riskDetails.risk }}</b> </h3>
      <div v-for="field in riskDetails.fields">
        <div class="form-group">
          <div class="row">
            <div class="col-md-4">
              <label> {{ field.name }}</label>
            </div>
            <div class="col-md-8" v-if="!field.options">
              <input 
                :type="FIELD_TYPES[field.type]"
                :name="field.name" 
                class="form-control"
                v-model="formData[field.name]"
              >
            </div>
            <div class="col-md-8" v-if="field.options">
              <div v-for="option in field.options">
                <input 
                  type="radio"
                  :id="option"
                  :value="option"
                  :name="option"
                  v-model="formData[field.name]"
                >
                <label :for="option">{{option}}</label>
              </div>
            </div>
          </div> 
        </div>
      </div
      <div class="form-group">
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <button class="btn btn-danger form-control risk-form-reset" v-on:click="resetForm()" :disabled="Object.keys(formData).length === 0">Reset</button>
          </div>
          <div class="col-md-6 col-sm-12">
            <button class="btn btn-primary form-control pull-right risk-form-submit" v-on:click="submitForm()">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/auth'
import api from '@/api'

export default {
  // Initialize component's data
  data() {
    return {
      user: auth.user,
      error: null,
      risks: [],
      riskId: null,
      riskDetails: {},
      formData: {},
      submittedData: {},
      FIELD_TYPES: {
        1: 'text',
        2: 'number',
        3: 'date',
        4: 'enum',
      }, 
      riskFormButtonEnabled: true,
    }
  },

  // Try getting a list of all risks on creating Home page
  created() {
    // get all risks only if user is logged in
    if (auth.checkAuth()) {
      api.getRisks(this)
    } else {
      this.$router.push('login')
    }
  },

  methods: {

    getRiskDetails() {
      if (!this.riskId) {
        this.error = "Please select a risk type from the dropdown."
        return
      }
      else {
        this.error = null
      }

      api.getRiskDetails(this)
      this.formData = {}
      this.riskFormButtonEnabled = false
    },

    resetForm() {
      this.formData = {}
    },

    hideForm() {
      this.riskDetails = {}
      this.formData = {}
      this.riskFormButtonEnabled = true
    },

    submitForm() {
      // TODO: validate input
      this.submittedData = this.formData
      this.formData = {}
      // TODO: submit data to API
    },
  }

}
</script>