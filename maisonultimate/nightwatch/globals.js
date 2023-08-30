const waitOn = require('wait-on')
const { setup, teardown } = require('@nightwatch/vue')

const serverPort = process.env.CI ? '4173' : '5173'

module.exports = {
  before(done) {
    setup()
    waitOn({
      resources: [`http-get://127.0.0.1:${serverPort}`],
      verbose: true,
      headers: {
        accept: 'text/html'
      }
    }).then(() => {
      done()
    })
  },

  after() {
    teardown()
  }
}
