/**
  by Nemes Ioan Sorin - not an jQuery big fan 
  therefore this script is for those who love the old clean coding style  
  @id = the id of the element who need to come into view
*/
(function () {
  window.setTimeout = window.setTimeout; //
})();

var smoothScr = {
  iterr : 30, // set timeout miliseconds ..decreased with 1ms for each iteration
  tm : null, //timeout local variable
  setActive: function (className) {
    className = className.substr(4);
    document.querySelector('.side-menu .active').classList.remove('active');
    document.querySelector('.side-menu ' + className).classList.add('active');
  },
  stopShow: function () {
    clearTimeout(this.tm); // stopp the timeout
    this.iterr = 30; // reset milisec iterator to original value
  },
  getRealTop : function (el) {
    var elm = el; 
    var realTop = 0;
    
    do
    {
      realTop += elm.offsetTop;
      elm = elm.offsetParent;
    } while(elm);

    return realTop;
  },
  getPageScroll : function() {
    var pgYoff = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
    return pgYoff;
  },
  anim : function (className) {
    this.stopShow(); // for click on another button or link
    var eOff, pOff, tOff, scrVal, pos, dir, step;

    if (className.substr(0,4) !== '.row') {
      className = '.row.' + className;
    }

    var element = document.querySelector(className);

    eOff = element.offsetTop; // element offsetTop
    tOff =  this.getRealTop(element.parentNode); // terminus point 
    pOff = this.getPageScroll(); // page offsetTop

    if (pOff === null || isNaN(pOff) || pOff === 'undefined') pOff = 0;

    scrVal = eOff - pOff; // actual scroll value;

    if (scrVal > tOff)  {
      pos = (eOff - tOff - pOff); 
      dir = 1;
    }

    if (scrVal < tOff) {
      pos = (pOff + tOff) - eOff;
      dir = -1; 
    }

    if(scrVal !== tOff) {
      step = ~~((pos / 4) +1) * dir;

      if(this.iterr > 1) this.iterr -= 1; 
      else this.itter = 0; // decrease the timeout timer value but not below 0
      window.scrollBy(0, step);
      this.tm = setTimeout(function () {
         smoothScr.anim(className);  
      }, this.iterr); 
    }  
    if (scrVal === tOff) { 
      this.setActive(className);
      this.stopShow(); // reset function values

      return;
    }
  }
};

var bullets = document.querySelectorAll('.side-menu li');

if (bullets) {
  var positions = [];
  
  bullets = Array.prototype.slice.call(bullets);
  bullets.forEach(function (bullet) {
    var firstClass = bullet.classList[0];
    var offset = document.querySelector('.row.' + firstClass).offsetTop;

    positions.push(offset);
  });
}

window.onscroll = function () {
  if (document.querySelector('.side-menu')) {
    var windowY = window.scrollY;
    var body = document.body;
    var html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    
    if ((windowY + html.clientHeight + 400) <= height) {
      positions.forEach(function (position, i) {
        if (windowY >= position) {
          document.querySelector('.side-menu .active').classList.remove('active');
          document.querySelector('.side-menu').children[i].classList.add('active');
        }
      });
    } else {
      var active = document.querySelector('.side-menu .active');

      if (active) {
        active.classList.remove('active');
      }

      document.querySelectorAll('.side-menu')[0].children[positions.length - 1].classList.add('active');
    }
  }
};