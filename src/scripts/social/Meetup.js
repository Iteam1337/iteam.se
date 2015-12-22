(function () {
  'use strict';

  function Meetup(count) {
    window.Social.apply(this, ['meetup', count]);

    this.url = 'https://api.meetup.com/2/events?status=upcoming&order=time&limited_events=False&group_urlname=STHLM-Lounge-Hackers&desc=false&offset=0&photo-host=public&format=json&page=20&fields=&sig_id=84621862&sig=415d640c682d97c625694e951468d0ae9e23779f';
  }

  Meetup.prototype = Object.create(window.Social.prototype);

  Meetup.prototype.handleResponse = function (response) {
    response = JSON.parse(response);

    if (!response.length) {
      return;
    }

    return [response, response[0].pushed_at];
  };

  Meetup.prototype.prerender = function (array) {
    console.log(array);
  };

  Meetup.prototype.constructor = window.Social;

  window.Meetup = Meetup;
})();
