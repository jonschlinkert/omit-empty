/*!
 * omit-empty <https://github.com/jonschlinkert/omit-empty>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var reduce = require('reduce-object');
var hasValue = require('has-value');
var isObject = require('isobject');

module.exports = function omitEmpty(o, noZero) {
  return reduce(o, function (acc, value, key) {
    if (isObject(value)) {
      var val = omitEmpty(value, noZero);
      if (hasValue(val)) {
        acc[key] = val;
      }
    } else if (hasValue(value, noZero)) {
      acc[key] = value;
    }
    return acc;
  }, {});
};
