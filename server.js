'use strict'

const Hapi = require('hapi')
const fs = require('fs')
const server = new Hapi.Server()

var ipfsAPI = require('ipfs-api')

var ipfs = ipfsAPI({
  host: 'ipfs.lightrains.com',
  port: '80',
  protocol: 'http'
})

server.connection({
  host: 'localhost',
  port: 8000,
  routes: {
    cors: {
      origin: ['*']
    }
  }
})

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    return reply('Yep, i am up!')
  }
})

server.route({
  method: 'POST',
  path: '/asset/upload',
  config: {
    payload: {
      output: 'file',
      parse: false,
      allow: 'multipart/form-data',
      uploads: '~/hapi-test-uploads'
    },
    maxBytes: 10240, // 10meg upload limit
    timeout: 30000, // 30 second timeout
    /** It doesn't appear that you need a handler for this, unless you have some other side
    effect that you need to handle
  }
})

server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
