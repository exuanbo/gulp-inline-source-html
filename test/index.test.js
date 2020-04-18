'use strict'

const fs = require('fs')
const path = require('path')
const should = require('should')
const Vinyl = require('vinyl')
const inlineSource = require('../index.js')

const getFile = (filePath, contents) => {
  return new Vinyl({
    path: filePath,
    base: path.dirname(filePath),
    contents: contents || fs.readFileSync(filePath)
  })
}

const getFixture = filePath => {
  return getFile(path.join(__dirname, 'fixtures', filePath))
}

const getExpected = filePath => {
  return getFile(path.join(__dirname, 'expected', filePath))
}

const compare = (stream, fixtureName, expectedName) => {
  stream.on('error', error => {
    should.exist(error)
  })

  stream.on('data', file => {
    should.exist(file)
    should.exist(file.contents)

    const contents = String(file.contents)
    contents.should.equal(String(getExpected(expectedName).contents))
  })

  stream.write(getFixture(fixtureName))
  stream.end()
}

describe('gulp-inline-source', () => {
  it('Should inline <script> tag', async () => {
    await compare(inlineSource(), 'script.html', 'inlined-script.html')
  })

  it('Should inline <script> tag with ES6 source', async () => {
    await compare(inlineSource(), 'script-es6.html', 'inlined-script.html')
  })

  it('Should inline <link> tag', async () => {
    await compare(inlineSource(), 'link.html', 'inlined-link.html')
  })

  it('Should inline <img> tag with SVG source', async () => {
    await compare(inlineSource(), 'image-svg.html', 'inlined-image-svg.html')
  })

  it('Should inline <img> tag with PNG source', async () => {
    await compare(inlineSource(), 'image-png.html', 'inlined-image-png.html')
  })

  it('works with type and media attributes', async () => {
    await compare(
      inlineSource(),
      'with-attributes.html',
      'inlined-with-attributes.html'
    )
  })

  it('works with relative paths', async () => {
    await compare(inlineSource(), 'script-relative.html', 'inlined-script.html')
  })

  it('Should inline assets without minification', async () => {
    const stream = inlineSource({
      compress: false
    })

    await compare(stream, 'nominify.html', 'inlined-nominify.html')
  })
})
