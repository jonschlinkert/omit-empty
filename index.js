/*!
 * omit-empty <https://github.com/jonschlinkert/omit-empty>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var reduceObj = require('reduce-object');

module.exports = function omitEmpty(o, noZero) {
  return reduceObj(o, function (acc, value, key) {
    if (isObject(value)) {
      var val = omitEmpty(value, noZero);
      if (!isEmpty(val)) {
        acc[key] = val;
      }
    } else if (!isEmpty(value, noZero)) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

function isObject(o) {
  return typeof o === 'object' && !Array.isArray(o);
}

function isEmpty(o, noZero) {
  if (typeof o === 'boolean') {
    return false;
  }
  if (typeof o === 'number') {
    if (noZero && o === 0) {
      return true;
    }
    return false;
  }
  if (o === null || o === undefined) {
    return true;
  }
  if (o.length !== undefined) {
    return o.length === 0;
  }
  for (var key in o) {
    if (o.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

