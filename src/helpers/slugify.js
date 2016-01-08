'use strict'

function slugify(string) {
  return string
    .replace(/\&/g,'och')
    .toLowerCase()
    .replace(/å/g,'aa')
    .replace(/ä/g,'ae')
    .replace(/ö/g,'oe')
    .replace(/\s/g,'-')
}

module.exports = slugify
