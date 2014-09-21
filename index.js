/*!
 * omit-empty <https://github.com/jonschlinkert/omit-empty>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

module.exports = function omitEmpty(o, flatten) {
  var target = {};
  var value;

  for (var key in o) {
    if (!o.hasOwnProperty(key)) {
      // leave as early as possible
      continue;
    }

    value = o[key];

    if (isObject(value)) {
      if (isEmpty(value)) {
        continue;
      } else {
        target[key] = omitEmpty(value);
      }
    } else if (Array.isArray(value)) {
      if (isEmpty(value)) {
        continue;
      } else if (flatten) {
        target[key] = flatten(value).filter(Boolean);
        console.log(value)
      } else {
        target[key] = value.filter(Boolean);
      }
    } else {
      if (isEmpty(value)) {
        continue;
      } else {
        target[key] = value;
      }
    }
  }
  return target;
};

function isObject(o) {
  return typeof o === 'object' && !Array.isArray(o);
}

function isEmpty(o) {
  if (o == null) {
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

function flatten(arr) {
  if (isEmpty(arr)) {
    return [];
  }

  do {
    arr = [].concat.apply([], arr);
  } while(arr.some(Array.isArray));
  return arr;
}