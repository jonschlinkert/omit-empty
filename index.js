/*!
 * omit-empty <https://github.com/jonschlinkert/omit-empty>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var reduce = require('reduce-object');
var hasValues = require('has-values');
var isObject = require('isobject');

module.exports = function omitEmpty(o, noZero) {
  return reduce(o, function (acc, value, key) {
    if (isObject(value)) {
      var val = omitEmpty(value, noZero);
      if (hasValues(val)) {
        acc[key] = val;
      }
    } else if (hasValues(value, noZero)) {
      acc[key] = value;
    }
    return acc;
  }, {});
};
