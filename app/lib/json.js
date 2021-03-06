const electron = require('electron')
const https = require('https')
const app = electron.app || electron.remote.app

module.exports = (opts) => {
  const options = Object.assign({}, opts, {
    headers: {
      'User-Agent': `ZazuApp v${app.getVersion()}`,
    },
  })
  return new Promise((resolve) => {
    https.get(options, (res) => {
      var chunks = []
      res.on('data', (chunk) => {
        chunks.push(chunk.toString())
      })
      res.on('end', () => {
        resolve(JSON.parse(chunks.join('')))
      })
      res.on('error', (e) => {
        throw e
      })
    })
  })
}
