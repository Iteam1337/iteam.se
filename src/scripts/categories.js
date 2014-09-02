'use strict';

var cases = document.querySelectorAll('.selected-cases li');

// var filtersNode = document.querySelectorAll('ul.filters-list li:not(.filters-options)');

// function getActiveFilters() {
//   var activeFilters = document.querySelectorAll('ul.filters-list > li.active');
//   return Array.prototype.slice.call(activeFilters, 0).reduce(function (result, child) {
//     result.push(child.getAttribute('data-category'));
//     return result;
//   }, []);
// }

// function showFilteredElements (filters) {
//   filters.forEach(function (filter) {
//     var elements = document.querySelectorAll('ul.cases-list > li.' + filter);
//     Array.prototype.slice.call(elements, 0).forEach(function (element) {
//       element.classList.remove('hidden');
//       element.classList.remove('visually-hidden');
//     });
//   });
// }

// function generateContainRegexp (className) {
//   return new RegExp('(?:^|\\s)' + className + '(?:$|\\s)', 'gi');
// }

// function hasClass (classList, regexp) {
//   return (classList.match(regexp) !== null);
// }

// function toggleFilters(){
//   var filters = document.querySelectorAll('.less-used-filter');
//   Array.prototype.slice.call(filters, 0).forEach(function (filter) {
//     var regexp = generateContainRegexp('hidden');
//     if (hasClass(filter.className, regexp)) {
//       filter.className = filter.className.replace(regexp, '');
//     } else {
//       filter.className += ' hidden';
//     }
//   });
// }

// function toggleFilter(event) {
//   var element = event.srcElement || event.target;
//   element.classList.toggle('active');
//   var activeFilters = getActiveFilters();
//   Array.prototype.slice.call(cases, 0).forEach(function (child) {
//     if(activeFilters.length) {
//       child.classList.add('visually-hidden');
//       child.classList.add('hidden');
//     } else {
//       child.classList.remove('hidden');

//       setTimeout(function () {
//         child.classList.remove('visually-hidden');
//       }, 20);
//     }
//   });

//   showFilteredElements(activeFilters);
// }

// if (filtersNode.length) {
//   Array.prototype.slice.call(filtersNode, 0).map(function (child) {
//     child.addEventListener('click', toggleFilter);
//   });

//   var clearFiltersNode = document.getElementById('clear-all');

//   if(clearFiltersNode) {
//     clearFiltersNode.addEventListener('click', function () {
//       Array.prototype.slice.call(filtersNode, 0).forEach(function (child) {
//         child.classList.remove('active');
//       });

//       Array.prototype.slice.call(cases, 0).forEach(function (child) {
//         child.classList.remove('hidden');

//         setTimeout(function () {
//           child.classList.remove('visually-hidden');
//         }, 20);
//       });
//     });
//   }

//   var toggleFiltersNode = document.getElementById('toggle-all');
//   if(toggleFiltersNode) {
//     toggleFiltersNode.addEventListener('click', toggleFilters);
//   }
// }

