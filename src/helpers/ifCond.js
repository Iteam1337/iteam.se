'use strict'

/*jshint maxcomplexity:13 */
/*jshint eqeqeq:false */
function ifCond(v1, operator, v2, options) {
  let leftAssociativity

  switch (operator) {
  case '==': leftAssociativity = (v1 == v2); break
  case '===': leftAssociativity = (v1 === v2); break
  case '!==': leftAssociativity = (v1 !== v2); break
  case '!=': leftAssociativity = (v1 != v2); break
  case '<': leftAssociativity = (v1 < v2); break
  case '<=': leftAssociativity = (v1 <= v2); break
  case '>': leftAssociativity = (v1 > v2); break
  case '>=': leftAssociativity = (v1 >= v2); break
  case '&&': leftAssociativity = (v1 && v2); break
  case '||': leftAssociativity = (v1 || v2); break
  default: leftAssociativity = false
  }

  /*jshint validthis:true */
  return leftAssociativity ? options.fn(this) : options.inverse(this)
}

module.exports = ifCond
