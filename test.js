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

  it('should omit `0`.', function () {
    omitEmpty({a: {b: {c: 'foo', d: 0}, foo: []}}).should.eql({a: {b: {c: 'foo'}}});
  });

  it('should handle complex objects.', function () {
    omitEmpty({
      a: {
        b: {
          c: 'foo',
          d: 0,
          e: {f: {g: {}, h: {i: 'i'}}}
        },
        foo: [['bar', 'baz'], []],
        one: 1,
        two: 2,
        three: 0
      }
    }, true).should.eql({a: {b: {c: 'foo'}}});
  });
});

