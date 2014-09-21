/*!
 * omit-empty <https://github.com/jonschlinkert/omit-empty>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var reduceObj = require('reduce-object');

module.exports = function omitEmpty(o, noZero) {
  var target = {};
  var value;

  for (var key in o) {
    if (!o.hasOwnProperty(key) || isEmpty(o[key])) {
      // leave as early as possible
      continue;
    }
    value = o[key];

    if (isObject(value)) {
      if (isEmpty(value)) {
        continue;
      }
      target[key] = omitEmpty(value, noZero);
    } else if (Array.isArray(value)) {
      if (isEmpty(value)) {
        continue;
      }
      target[key] = value;
    } else {
      if (value === '' || (noZero && value === 0)) {
        continue;
      }
      target[key] = value;
    }
  }
  return reduceObj(target, function (acc, value, key) {
    if (!isEmpty(value)) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

function isObject(o) {
  return typeof o === 'object' && !Array.isArray(o);
}

function isEmpty(o) {
  if (typeof o === 'boolean') {
    return false;
  }
  if (typeof o === 'number') {
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

