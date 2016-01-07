'use strict'

const crypto = require('crypto')

function gravatar(email, size) {
  if (!email) {
    return
  }

  const hash = crypto.createHash('md5').update(email).digest('hex')
  let url = `https://www.gravatar.com/avatar/${hash}.jpg`

  if (size) {
    url += `?s=${size}`
  }

  return url
}

module.exports = gravatar
module.exports.gravatar = gravatar
