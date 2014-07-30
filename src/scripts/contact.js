'use strict';

function getFormData(form) {
  var data = {
    username: form.elements.name.value + ' <' + form.elements.email.value + '>',
    text: form.elements.text.value,
    icon_emoji: ':ghost:'
  };
  return data;
}

function submit (event) {
  event.preventDefault();
  var data = getFormData(form);
  var xhr = new window.XMLHttpRequest();
  xhr.open(form.method, form.action, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    document.querySelector('input[name=text]').value = '';
  };
  xhr.send(JSON.stringify(data));
}

var form = document.getElementsByTagName('form')[0];

if(form) {
  form.addEventListener('submit', submit);
}