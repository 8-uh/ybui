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
      output: 'stream',
      parse: true,
      allow: 'multipart/form-data'
    },
    handler: function (request, reply) {
      var data = request.payload
      if (data.file) {
        var name = data.file.hapi.filename
        var path = process.cwd() + '/uploads/' + Date.now() + name
        var file = fs.createWriteStream(path)
        file.on('error', function (err) {
          console.error(err)
        })
        data.file.pipe(file)
        data.file.on('end', function (err) {
          if (err) {
            throw err
          }
          ipfs.util.addFromFs(path, { recursive: false}, (err, result) => {
            if (err) {
              throw err
            }
            reply(result[0])
          })
        })
      }
    }
  }
})

server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
