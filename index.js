'use strict'

const { inlineSource } = require('inline-source')
const PluginError = require('plugin-error')
const through = require('through2')

const PLUGIN_NAME = '@exuanbo/gulp-inline-source'

const gulpInlineSource = options => {
  return through.obj(function (file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file)
    }

    if (file.isStream()) {
      return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
    }

    const fileOptions = {
      htmlpath: file.path
    }

    if (options) {
      for (const i in options) {
        fileOptions[i] = options[i]
      }
    }

    inlineSource(file.contents.toString(), fileOptions)
      .then(html => {
        file.contents = Buffer.from(html)
        return callback(null, file)
      })
      .catch(err => {
        return callback(new PluginError(PLUGIN_NAME, err))
      })
  })
}

module.exports = gulpInlineSource
