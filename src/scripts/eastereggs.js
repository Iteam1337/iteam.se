var easteregg = {
  konamiCode: '38384040373937396665',
  code: '',
  register: function (keyCode) {
    this.code += keyCode;
    if (this.code.indexOf(this.konamiCode) >= 0) {
      this.code = '';
      this.fire();
    }
    else if (this.code.length >= 100) {
      this.code = '';
    }
  },
  fire: function() {
    try {
      var footer = document.getElementsByClassName('easter-egg')[0];
      footer.style.display = 'inline';
      setTimeout(function () {
        footer.style.display = 'none';
      }, 1500);
    }
    catch (e) {
      // Since this is a vanity feature we do not handle any errors here.
    }
  }
};

document.addEventListener("keyup", function(event) {
  event.stopImmediatePropagation();
  easteregg.register(event.which);
  return false;
}, false);