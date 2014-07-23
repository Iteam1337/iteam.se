'use strict';

var filtersNode = document.querySelectorAll('ul.filters-list li:not(#clear-all)');
var cases = document.querySelectorAll('ul.cases-list li');

function getActiveFilters() {
  var activeFilters = document.querySelectorAll('ul.filters-list > li.active');
  return Array.prototype.slice.call(activeFilters, 0).reduce(function (result, child) {
    result.push(child.className.replace(' active', ''));
    return result;
  }, []);
}

function showFilteredElements (filters) {
  filters.forEach(function (filter) {
    var elements = document.querySelectorAll('ul.cases-list > li.' + filter);
    Array.prototype.slice.call(elements, 0).forEach(function (element) {
      element.classList.remove('hidden');
      element.classList.remove('visually-hidden');
    });
  });
}

function toggleFilter(event) {
  var element = event.srcElement || event.target;
  element.classList.toggle('active');
  var activeFilters = getActiveFilters();
  Array.prototype.slice.call(cases, 0).forEach(function (child) {
    if(activeFilters.length) {
      child.classList.add('visually-hidden');
      child.classList.add('hidden');
    } else {
      child.classList.remove('hidden');

      setTimeout(function () {
        child.classList.remove('visually-hidden');
      }, 20);
    }
  });

  showFilteredElements(activeFilters);
}

if (filtersNode.length) {
  Array.prototype.slice.call(filtersNode, 0).map(function (child) {
    child.addEventListener('click', toggleFilter);
  });

  document.getElementById('clear-all').addEventListener('click', function () {
    Array.prototype.slice.call(filtersNode, 0).forEach(function (child) {
      child.classList.remove('active');
    });

    Array.prototype.slice.call(cases, 0).forEach(function (child) {
      child.classList.remove('hidden');

      setTimeout(function () {
        child.classList.remove('visually-hidden');
      }, 20);
    });
  });
}