
module.exports = {
  'What should be present when not logged in...': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.title('Insurance Risks')
      .assert.urlContains('/login')
      .assert.containsText('a.home-link', 'Home')
      .assert.containsText('a.login-logout-link', 'Login')
  },

  'What should be present when Login page is loaded...': function (browser) {
    browser
      .assert.containsText('p.login-message', 'Log in to your account to see your risk types')
      .assert.elementCount('input[type="text"]', 1) 
      .assert.elementCount('input[type="password"]', 1) 
      .assert.elementPresent('button.login-submit')
  },

  'What should be present when logged in...': function (browser) {
    browser
      .setValue('input[type=text]', 'geek')
      .setValue('input[type=password]', 'password')
      .click('button.login-submit')
      .pause(500)
      .assert.containsText('.welcome-message', 'Welcome! Select a risk type to show the corresponding form.')
      .assert.containsText('a.login-logout-link', 'Logout')
      .assert.visible('select')
      .assert.containsText('button.risk-form-show', 'Show Form')
      .assert.elementCountGreaterOrEqualTo('select > option', 1)
  },

  'What should be present when a risk is selected and Show Form is clicked': function (browser) {
    browser
      .click("select option:nth-child(1)")
      .click('button.risk-form-show')
      .pause(500)
      .assert.attributeEquals('button.risk-form-show', 'disabled', 'true') // button should be disabled after showing risk form
      .assert.elementPresent('div.risk-form-div')
      .assert.visible('button.risk-form-hide')
      .assert.containsText('h3.risk-form-header', 'Risk form for')
      .assert.elementCountGreaterOrEqualTo('label', 4)
      .assert.elementCountGreaterOrEqualTo('input[type="text"]', 1) 
      .assert.elementCountGreaterOrEqualTo('input[type="number"]', 1)
      .assert.elementCountGreaterOrEqualTo('input[type="date"]', 1)
      .assert.elementCountGreaterOrEqualTo('input[type="radio"]', 2)
      .assert.containsText('button.risk-form-reset', 'Reset')
      .assert.containsText('button.risk-form-submit', 'Submit')
  },

  'What should be happen when some data is entered and Reset button is clicked': function (browser) {
    browser
      .setValue('input[type="text"]', 'Bayode Aderinola') 
      .setValue('input[type="number"]', 15000)
      .assert.value('input[type="text"]', 'Bayode Aderinola') 
      .assert.value('input[type="number"]', '15000')
      .click('button.risk-form-reset')
      .assert.value('input[type="text"]', '') 
      .assert.value('input[type="number"]', '')
  },

  'What should be present when Hide Risk Form button is clicked': function (browser) {
    browser
      .click('button.risk-form-hide')
      .pause(300)
      .assert.elementNotPresent('div.risk-form-div')
      .getAttribute('button.risk-form-show', 'disabled', function(result) {
        this.assert.equal(result.value, null) // button should be enabled now
      })
  },

  'What should be present when Logout button is clicked': function (browser) {
    browser
      .click('a.login-logout-link')
      .pause(300)
      .assert.elementNotPresent('div.risk-select-div')
      .assert.elementNotPresent('div.risk-form-div')
      .assert.elementPresent('div.login-form-div')
      .assert.containsText('a.login-logout-link', 'Login')
      .end()
  }
}
