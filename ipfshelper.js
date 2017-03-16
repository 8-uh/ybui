var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI({
  host: '192.168.27.101',
  port: '5001',
  protocol: 'http'
})

function pinToIpfs (file) {
  ipfs.util.addFromFs(file, { recursive: false}, (err, result) => {
    if (err) {
      throw err
    }
    return result
  })
}

module.exports.pinToIpfs = pinToIpfs
