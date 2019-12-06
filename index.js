'use strict';

const typeOf = require('kind-of');

const omitEmpty = (obj, options = {}) => {
  const runtimeOpts = _buildRuntimeOpts(options);

  let omit = (value, opts) => {
    if (Array.isArray(value)) {
      value = value.map(v => omit(v, opts)).filter(v => !isEmpty(v, opts));
    }

    if (typeOf(value) === 'object') {
      let result = {};
      for (let key of Object.keys(value)) {
        if (!opts.excludedProperties.includes(key)) {
          let val = omit(value[key], opts);
          if (val !== void 0) {
            result[key] = val;
          }
        }
      }
      value = result;
    }

    if (!isEmpty(value, opts)) {
      return value;
    }
  };

  let res = omit(obj, runtimeOpts);
  if (res === void 0) {
    return typeOf(obj) === 'object' ? {} : res;
  }
  return res;
};

function _buildRuntimeOpts(options = {}) {
  return {
    omitZero: options.omitZero || false,
    omitEmptyArray: options.omitEmptyArray || true,
    excludedProperties: options.excludedProperties || []
  };
};

function isEmpty(value, runtimeOpts) {
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
      return runtimeOpts.omitZero ? value === 0 : false;
    case 'error':
      return value.message === '';
    case 'array':
      if (runtimeOpts.omitEmptyArray) {
        for (let ele of value) {
          if (!isEmpty(ele, runtimeOpts)) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    case 'object':
      for (let key of Object.keys(value)) {
        if (!isEmpty(value[key], runtimeOpts)) {
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
