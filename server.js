'use strict'

const Hapi = require('hapi')

const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
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
      console.log('here')
      var data = request.payload
      if (data.file) {
        var name = data.file.hapi.filename
        var path = process.cwd() + '/uploads/' + name
        var file = fs.createWriteStream(path)
        file.on('error', function (err) {
          console.error(err)
        })
        data.file.pipe(file)
        data.file.on('end', function (err) {
          if (err) {
            throw err
          }
          var ret = {
            filename: data.file.hapi.filename,
            headers: data.file.hapi.headers
          }
          reply(JSON.stringify(ret))
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
