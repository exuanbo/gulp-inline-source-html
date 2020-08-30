/* eslint-env mocha */
'use strict'

const fs = require('fs')
const path = require('path')
const expect = require('chai').expect
const Vinyl = require('vinyl')
const inlineSource = require('..')

const getFile = (filePath, contents) => {
  filePath = filePath.replace(/\\/g, '/')
  if (!path.extname(filePath)) filePath += '.html'
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

const compare = (done, fixtureName, expectedName, options = {}) => {
  const stream = inlineSource(options)
  stream.on('error', err => done(err))
  stream.on('data', file => {
    expect(String(file.contents)).to.equal(
      String(getExpected(expectedName).contents)
    )
    done()
  })
  stream.write(getFixture(fixtureName))
  stream.end()
}

describe('gulp-inline-source', () => {
  it('Should inline <script> tag', done => {
    compare(done, 'script', 'inlined-script')
  })

  it('Should inline <script> tag with ES6 source', done => {
    compare(done, 'script-es6', 'inlined-script')
  })

  it('Should inline <link> tag', done => {
    compare(done, 'link', 'inlined-link')
  })

  it('Should inline <img> tag with SVG source', done => {
    compare(done, 'image-svg', 'inlined-image-svg')
  })

  it('Should inline <img> tag with PNG source', done => {
    compare(done, 'image-png', 'inlined-image-png')
  })

  it('Should work with type and media attributes', done => {
    compare(done, 'with-attributes', 'inlined-with-attributes')
  })

  it('Should work with relative paths', done => {
    compare(done, 'script-relative', 'inlined-script')
  })

  it('Should inline assets without minification', done => {
    compare(done, 'nominify', 'inlined-nominify', { compress: false })
  })
})
