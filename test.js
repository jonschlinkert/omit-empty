/*!
 * omit-empty <https://github.com/jonschlinkert/omit-empty>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var omitEmpty = require('./');

describe('.omitEmpty()', function () {
  it('should omit empty objects.', function () {
    omitEmpty({a: {b: {c: 'foo'}, d: {}}}).should.eql({a: {b: {c: 'foo'}}});
  });

  it('should omit empty primatives.', function () {
    omitEmpty({a: {b: {c: 'foo'}, d: ''}}).should.eql({a: {b: {c: 'foo'}}});
  });

  it('should omit empty arrays.', function () {
    omitEmpty({a: {b: {c: 'foo', d: []}, foo: []}}).should.eql({a: {b: {c: 'foo'}}});
  });

  it('should not omit `0`.', function () {
    omitEmpty({a: {b: {c: 'foo', d: 0}, foo: []}}).should.eql({a: {b: {c: 'foo', d: 0}}});
  });

  it('should omit `0` when `noZero` is defined.', function () {
    omitEmpty({a: {b: {c: 'foo', d: 0}, foo: []}}, true).should.eql({a: {b: {c: 'foo'}}});
  });

  it('should not omit `false`.', function () {
    omitEmpty({a: {b: {c: 'foo', d: 0}, foo: [], bar: false}}).should.eql({a: {b: {c: 'foo', d: 0}, bar: false}});
  });

  it('should handle complex objects.', function () {
    var o = {a: {b: {c: 'foo', d: 0, e: {f: {g: {}, h: {i: 'i'}}}}, foo: [['bar', 'baz'], []], bar: [], one: 1, two: 2, three: 0 } };
    omitEmpty(o).should.eql({a: {b: {c: 'foo', d: 0, e: {f: {h: {i: 'i'}}}}, foo: [['bar', 'baz'], []], one: 1, two: 2, three: 0}});
  });
});

