/*!
 * omit-empty <https://github.com/jonschlinkert/omit-empty>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
const typeOf = require('kind-of');
const assert = require('assert');
const omitEmpty = require('./');

describe('omit-empty', () => {
  it('should return non-empty string values', () => {
    assert.equal(omitEmpty('foo'), 'foo');
  });

  it('should return undefined when the value is an empty string', () => {
    assert.equal(omitEmpty(''), void 0);
  });

  it('should return non-empty arrays', () => {
    assert.deepEqual(omitEmpty(['foo']), ['foo']);
  });

  it('should return empty arrays with option config', () => {
    assert.deepEqual(omitEmpty(['foo'], { omitEmptyArray: false }), ['foo']);
  });


  it('should return undefined when the value is an empty string', () => {
    assert.equal(omitEmpty(''), void 0);
  });

  it('should omit empty values from the given object', () => {
    let fixture = { one: {}, a: '', b: 'c' };
    assert.deepEqual(omitEmpty(fixture), { b: 'c' });
  });

  it('should omit deeply nested empty values from the given object', () => {
    let fixture = {
      foo: [{ a: '' }, { bar: 'baz' }, [{ a: '' }, { bar: 'baz' }]],
      one: { two: { three: { four: { abc: { xyz: '' } } }, five: '', six: 'seven' } },
      a: '',
      b: 'c'
    };

    assert.deepEqual(omitEmpty(fixture), {
      foo: [{ bar: 'baz' }, [{ bar: 'baz' }]],
      one: { two: { six: 'seven' } },
      b: 'c'
    });
  });

  it('should omit empty objects.', () => {
    assert.deepEqual(omitEmpty({ a: { b: { c: 'foo' }, d: {} } }), { a: { b: { c: 'foo' } } });
  });

  it('should omit empty objects.', () => {
    assert.deepEqual(omitEmpty({ a: undefined, b: 'c' }), { b: 'c' });
    assert.deepEqual(omitEmpty({ a: null, b: 'c' }), { b: 'c' });
    assert.deepEqual(omitEmpty({ a: '', b: 'c' }), { b: 'c' });
  });

  it('should omit nested empty objects.', () => {
    assert.deepEqual(omitEmpty({ a: { b: undefined, c: 'd' } }), { a: { c: 'd' } });
    assert.deepEqual(omitEmpty({ a: { b: null, c: 'd' } }), { a: { c: 'd' } });
    assert.deepEqual(omitEmpty({ a: { b: '', c: 'd' } }), { a: { c: 'd' } });
  });

  it('should deeply omit nested empty objects.', () => {
    assert.deepEqual(omitEmpty({ a: { b: undefined, c: void 0 } }), {});
    assert.deepEqual(omitEmpty({ a: { b: null, c: void 0 } }), {});
    assert.deepEqual(omitEmpty({ a: { b: '', c: void 0 } }), {});
  });

  it('should not omit functions', () => {
    let fn = (a, b, c) => { };
    let fn2 = () => { };
    assert.deepEqual(omitEmpty({ a: fn, b: fn2 }), { a: fn, b: fn2 });
  });

  it('should omit empty strings.', () => {
    assert.deepEqual(omitEmpty({ a: { b: { c: 'foo' }, d: '' } }), { a: { b: { c: 'foo' } } });
  });

  it('should omit empty Map', () => {
    assert.deepEqual(omitEmpty({ a: { b: { c: 'foo' }, d: new Map() } }), { a: { b: { c: 'foo' } } });
  });

  it('should omit empty Set', () => {
    assert.deepEqual(omitEmpty({ a: { b: { c: 'foo' }, d: new Set() } }), { a: { b: { c: 'foo' } } });
  });

  it('should not omit regex', () => {
    assert.deepEqual(omitEmpty({ a: { b: { c: /foo/ }, d: new Set() } }), { a: { b: { c: /foo/ } } });
  });

  it('should omit empty arrays.', () => {
    assert.deepEqual(omitEmpty({ a: { b: { c: 'foo', d: [] }, foo: [] } }), { a: { b: { c: 'foo' } } });
    assert.deepEqual(omitEmpty({ a: { b: { c: 'foo', d: [void 0] }, foo: [null] } }), { a: { b: { c: 'foo' } } });
    assert.deepEqual(omitEmpty({ a: { b: { c: 'foo', d: [''] }, foo: [null] } }), { a: { b: { c: 'foo' } } });
    assert.deepEqual(omitEmpty({ a: { z: [''], b: { c: 'foo', d: [''] }, foo: [null] } }), { a: { b: { c: 'foo' } } });
  });

  it('should not omit zero', () => {
    let actual = omitEmpty({ a: { b: { c: 'foo', d: 0 }, foo: [] } });
    let expected = { a: { b: { c: 'foo', d: 0 } } };
    assert.deepEqual(actual, expected);
  });

  it('should omit zero when omitZero is true', () => {
    let expected = { a: { b: { c: 'foo' } } };
    let actual = omitEmpty({ a: { b: { c: 'foo', d: 0 }, foo: [] } }, { omitZero: true });
    assert.deepEqual(actual, expected);
  });

  it('should not omit boolean false', () => {
    let actual = omitEmpty({ a: { b: { c: 'foo', d: 0 }, foo: [], bar: false } });
    let expected = { a: { b: { c: 'foo', d: 0 }, bar: false } };
    assert.deepEqual(actual, expected);
  });

  it('should not omit Dates', () => {
    let today = new Date();
    let actual = omitEmpty({ a: { b: { c: 'foo', d: today }, foo: [], bar: false } });
    let expected = { a: { b: { c: 'foo', d: today }, bar: false } };
    assert.deepEqual(actual, expected);
  });

  it('should omit deeply nested values', () => {
    let o = {
      a: {
        b: { c: 'foo', d: 0, e: { f: { g: {}, h: { i: 'i' } } } },
        foo: [['bar', 'baz'], []],
        bar: [],
        one: 1,
        two: 2,
        three: 0
      }
    };

    assert.deepEqual(omitEmpty(o), {
      a: {
        b: { c: 'foo', d: 0, e: { f: { h: { i: 'i' } } } },
        foo: [['bar', 'baz']],
        one: 1,
        two: 2,
        three: 0
      }
    });
  });
});
