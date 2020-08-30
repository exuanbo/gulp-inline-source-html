# gulp-inline-source-html

> Inlines flagged js, css, and img sources in html with [inline-source](https://github.com/popeindustries/inline-source)

[![npm](https://img.shields.io/npm/v/gulp-inline-source-html.svg?style=flat-square)](https://www.npmjs.com/package/gulp-inline-source-html)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
[![Travis (.com)](https://img.shields.io/travis/com/exuanbo/gulp-inline-source-html/master.svg?style=flat-square)](http://travis-ci.com/exuanbo/gulp-inline-source-html)
[![David](https://img.shields.io/david/exuanbo/gulp-inline-source-html.svg?style=flat-square)](https://david-dm.org/exuanbo/gulp-inline-source-html)
[![License](https://img.shields.io/github/license/exuanbo/gulp-inline-source-html.svg?style=flat-square)](https://github.com/exuanbo/gulp-inline-source-html/blob/master/LICENSE)

This plugin is based on [fmal/gulp-inline-source](https://github.com/fmal/gulp-inline-source), which is no longer maintained. It now supports Gulp.js v4 and ES6 / ES2015.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [How it works](#how-it-works)
- [Usage](#usage)
- [License](#license)

## Description

Inline and compress tags that contain the `inline` attribute. Supports `<script>`, `<link>`, and `<img>` (including `*.svg` sources) tags by default.

## Installation

Install `gulp-inline-source-html` as a development dependency

```bash
npm install --save-dev gulp-inline-source-html
```

## How it works

Targate file `src/html/index.html`

```html
<html>
  <body>
    <script src="../js/app.js" inline></script>
  </body>
</html>
```

Source file `src/js/app.js`

```js
function test() {
  const foo = 'lorem ipsum';
  return foo;
}
```

Output file

```html
<html>
  <body>
    <script>function test(){const a="lorem ipsum";return a}</script>
  </body>
</html>
```

## Usage

`inlineSource(options?: Object)`

```javascript
const { task, src, dest } = require('gulp')
const inlineSource = require('gulp-inline-source-html')

task('inlineSource', () => {
  return src('src/*.html')
    .pipe(inlineSource())
    .pipe(dest('dist'))
})
```

or you can

```javascript
import inlineSource from 'gulp-inline-source-html'
```

```javascript
task('inlineSource', () => {
  return src('src/*.html')
    .pipe(inlineSource({ compress: false }))
    .pipe(dest('dist'))
})
```

Available `options` include:

- `attribute`: attribute used to parse sources (all tags will be parsed if set to `false`. Default `'inline'`)
- `compress`: enable/disable compression of inlined content (default `true`)
- `fs`: specify `fs` implementation (default is Node core `'fs'`)
- `handlers`: specify custom handlers (default `[]`) [see [custom handlers](#custom-handlers)]
- `preHandlers`: specify custom pre handlers (default `[]`) [see [custom pre handlers](#custom-pre-handlers)]
- `ignore`: disable inlining based on `tag`, `type`, and/or `format` (default `[]`)
- `pretty`: maintain leading whitespace when `options.compress` is `false` (default `false`)
- `rootpath`: directory path used for resolving inlineable paths (default `process.cwd()`)
- `saveRemote`: enable/disable saving a local copy of remote sources (default `true`)
- `svgAsImage`: convert `<img inline src="*.svg" />` to `<img>` and not `<svg>` (default `false`)
- `swallowErrors`: enable/disable suppression of errors (default `false`)

For documentation about the options-object, see [popeindustries/inline-source](https://github.com/popeindustries/inline-source#usage).

## License

[MIT](https://github.com/exuanbo/gulp-inline-source-html/blob/master/LICENSE)

## Donate

<a href="https://www.buymeacoffee.com/exuanbo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" height="38.25px" width="162.75px"></a>
