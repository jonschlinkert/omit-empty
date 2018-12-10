'use strict';

const typeOf = require('kind-of');

const omitEmpty = (obj, options) => {
  let omitZero = options ? options.omitZero : false;

  let omit = value => {
    if (Array.isArray(value)) {
      value = value.map(v => omit(v)).filter(v => !isEmpty(v, omitZero));
    }

    if (typeOf(value) === 'object') {
      let result = {};
      for (let key of Object.keys(value)) {
        let val = omit(value[key]);
        if (val !== void 0) {
          result[key] = val;
        }
      }
      value = result;
    }

    if (!isEmpty(value, omitZero)) {
      return value;
    }
  };

  let res = omit(obj);
  if (res === void 0) {
    return typeOf(obj) === 'object' ? {} : res;
  }
  return res;
};

function isEmpty(value, omitZero) {
  switch (typeOf(value)) {
    case 'null':
    case 'undefined':
      return true;
    case 'boolean':
    case 'function':
    case 'date':
    case 'regexp':
      return false;
    case 'string':
    case 'arguments':
      return value.length === 0;
    case 'file':
    case 'map':
    case 'set':
      return value.size === 0;
    case 'number':
      return omitZero ? value === 0 : false;
    case 'error':
      return value.message === '';
    case 'array':
      for (let ele of value) {
        if (!isEmpty(ele, omitZero)) {
          return false;
        }
      }
      return true;
    case 'object':
      for (let key of Object.keys(value)) {
        if (!isEmpty(value[key], omitZero)) {
          return false;
        }
      }
      return true;
    default: {
      return true;
    }
  }
}

/**
 * Expose `omitEmpty`
 */

module.exports = omitEmpty;
