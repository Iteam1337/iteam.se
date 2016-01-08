'use strict'

const front = require('yaml-front-matter')
const moment = require('moment')

function calendar(options) {
  const frontmatter = front.loadFront('./src/pages/calendar.yml')
  const fmCalendar = frontmatter.calendar

  if (!fmCalendar) {
    return ''
  }

  const filtered = fmCalendar.filter(entry =>
    moment(entry.time).isAfter(moment().subtract(30, 'day')))
  .sort((a, b) =>
    moment(a.time).diff(moment(b.time)))

  if (filtered.length === 0) {
    filtered.push({
      title: 'Currently no upcoming events'
    })
  }

  return options.fn(filtered)
}

module.exports = calendar
