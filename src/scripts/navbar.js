
var navicon = document.getElementById('navicon');
var close = document.getElementById('close-navbar');

function toggle () {
  document.getElementById('navbar').classList.toggle('open');
}

if (navicon) {
  navicon.addEventListener('click', toggle);
  close.addEventListener('click', toggle);
}