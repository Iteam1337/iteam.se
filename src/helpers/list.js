'use strict'

function list(items) {
  items = items || []
  const split = Math.ceil(items.length / 2)

  function makelistItems (column) {
    return column.map(value =>
      `<li>${value}</li>`)
  }

  const ul = '<ul class="list__list">'
  const colOne = makelistItems(items.slice(0, split))
  const colTwo = makelistItems(items.slice(split))
  const firstUL = `${ul}${colOne.join().replace(/\,/g, '')}</ul>`
  const secondUL = `${ul}${colTwo.join().replace(/\,/g, '')}</ul>`
  return `${firstUL}${secondUL}`
}

module.exports = list
module.exports.list = list
