/* eslint-env mocha */
'use strict'

const fs = require('fs')
const path = require('path')
const should = require('should')
const Vinyl = require('vinyl')
const inlineSource = require('..')

const getFile = (filePath, contents) => {
  return new Vinyl({
    base: path.dirname(filePath),
    path: filePath,
    contents: contents || fs.readFileSync(filePath)
  })
}

const getFixture = filePath => {
  return getFile(path.join(__dirname, 'fixtures', filePath))
}

const getExpected = filePath => {
  return getFile(path.join(__dirname, 'expected', filePath))
}

const compare = (stream, fixtureName, expectedName, done) => {
  stream.on('error', error => {
    should.exist(error)
    done(error)
  })

  stream.on('data', file => {
    should.exist(file)
    should.exist(file.contents)

    const contents = String(file.contents)
    contents.should.equal(String(getExpected(expectedName).contents))
    done()
  })

  stream.write(getFixture(fixtureName))
  stream.end()
}

describe('gulp-inline-source', () => {
  it('Should inline <script> tag', done => {
    compare(inlineSource(), 'script.html', 'inlined-script.html', done)
  })

  it('Should inline <script> tag with ES6 source', done => {
    compare(inlineSource(), 'script-es6.html', 'inlined-script.html', done)
  })

  it('Should inline <link> tag', done => {
    compare(inlineSource(), 'link.html', 'inlined-link.html', done)
  })

  it('Should inline <img> tag with SVG source', done => {
    compare(inlineSource(), 'image-svg.html', 'inlined-image-svg.html', done)
  })

  it('Should inline <img> tag with PNG source', done => {
    compare(inlineSource(), 'image-png.html', 'inlined-image-png.html', done)
  })

  it('works with type and media attributes', done => {
    compare(
      inlineSource(),
      'with-attributes.html',
      'inlined-with-attributes.html',
      done
    )
  })

  it('works with relative paths', done => {
    compare(inlineSource(), 'script-relative.html', 'inlined-script.html', done)
  })

  it('Should inline assets without minification', done => {
    const stream = inlineSource({
      compress: false
    })

    compare(stream, 'nominify.html', 'inlined-nominify.html', done)
  })
})
