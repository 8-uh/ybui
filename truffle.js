var DefaultBuilder = require('truffle-default-builder')

module.exports = {
  build: new DefaultBuilder({
    'src/contracts.js': [
      'javascripts/app.js'
    ]
  }),
  networks: {
    development: {
      host: '192.168.27.101',
      port: 8545,
      network_id: '*'
    }
  }
}
