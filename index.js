'use strict'

const { inlineSource } = require('inline-source')
const PluginError = require('plugin-error')
const through = require('through2')

const PLUGIN_NAME = '@exuanbo/gulp-inline-source'

/**
 * inline-source wrapper
 * @param {Object} [options] - https://github.com/popeindustries/inline-source#usage
 */
const gulpInlineSource = (options = {}) => {
  return through.obj(async (file, encoding, callback) => {
    try {
      if (file.isNull()) {
        return callback(null, file)
      }

      if (file.isStream()) {
        return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
      }

      const defaultOptions = {
        rootpath: file.base
      }

      const pluginOptions = { ...defaultOptions, ...options }

      const newFileContents = await inlineSource(
        String(file.contents),
        pluginOptions
      )
      file.contents = Buffer.from(newFileContents)
      callback(null, file)
    } catch (err) {
      callback(new PluginError(PLUGIN_NAME, err))
    }
  })
}

module.exports = gulpInlineSource
