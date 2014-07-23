'use strict';

var filtersNode = document.querySelector('ul.filters-list');

function getActiveFilters() {
  var activeFilters = document.querySelectorAll('ul.filters-list > li.active');
  return Array.prototype.slice.call(activeFilters, 0).reduce(function (result, child) {
    result.push(child.className.replace(' active', ''));
    return result;
  }, []);
}


function showFilteredElements(filters) {
  filters.forEach(function (filter) {
    var elements = document.querySelectorAll('ul.cases-list > li.' + filter);
    Array.prototype.slice.call(elements, 0).forEach(function (element) {
      element.style.display = 'block';
    });
  });
}

function toggleFilter() {
  this.classList.toggle('active');
  var activeFilters = getActiveFilters();
  var cases = document.querySelector('ul.cases-list');
  Array.prototype.slice.call(cases.children, 0).forEach(function (child) {
    if(activeFilters.length) {
      child.style.display = 'none';
    } else {
      child.style.display = 'block';
    }
  });
  showFilteredElements(activeFilters);
}


if(filtersNode) {
  Array.prototype.slice.call(filtersNode.children, 0).map(function (child) {
    child.addEventListener('click', toggleFilter);
  });
}