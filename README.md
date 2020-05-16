# @exuanbo/gulp-inline-source

> A Gulp.js plugin for inlining flagged js, css, and img sources in html with [inline-source](https://github.com/popeindustries/inline-source)

[![npm (scoped)](https://img.shields.io/npm/v/@exuanbo/gulp-inline-source.svg?style=flat-square)](https://www.npmjs.com/package/@exuanbo/gulp-inline-source)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
[![Travis (.com)](https://img.shields.io/travis/com/exuanbo/gulp-inline-source/master.svg?style=flat-square)](http://travis-ci.com/exuanbo/gulp-inline-source)
[![David](https://img.shields.io/david/exuanbo/gulp-inline-source.svg?style=flat-square)](https://david-dm.org/exuanbo/gulp-inline-source)
[![License](https://img.shields.io/github/license/exuanbo/gulp-inline-source.svg?style=flat-square)](https://github.com/exuanbo/gulp-inline-source/blob/master/LICENSE)

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

Install `@exuanbo/gulp-inline-source` as a development dependency

```bash
npm install --save-dev @exuanbo/gulp-inline-source
```

## How it works

Targate file `src/html/index.html`

```html
<html>
  <head>
    <script src="../js/inlineScript.js" inline></script>
  </head>
  <body>
  </body>
</html>
```

Source file `src/js/inlineScript.js`

```js
function test() {
  const foo = 'lorem ipsum';
  return foo;
}
```

Output file

```html
<html>
  <head>
    <script>function test(){const a="lorem ipsum";return a}</script>
  </head>
  <body>
  </body>
</html>
```

## Usage

`inlineSource(options?: Object)`

```javascript
const inlineSource = require('@exuanbo/gulp-inline-source')

gulp.task('inlineSource', () => {
  return gulp.src('src/*.html')
    .pipe(inlineSource())
    .pipe(gulp.dest('dist'))
})
```

```javascript
const inlineSource = require('@exuanbo/gulp-inline-source')

gulp.task('inlineSource', () => {
  const options = {
    compress: false
  }

  return gulp.src('src/*.html')
    .pipe(inlineSource(options))
    .pipe(gulp.dest('dist'))
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

[MIT](https://github.com/exuanbo/gulp-inline-source/blob/master/LICENSE)

## Donate

<a href="https://www.buymeacoffee.com/exuanbo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" height="38.25px" width="162.75px"></a>
