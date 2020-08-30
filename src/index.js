'use strict'

const { inlineSource } = require('inline-source')
const through = require('through2')
const PluginError = require('plugin-error')

const PLUGIN_NAME = 'gulp-inline-source-html'

/**
 * inline-source wrapper
 * @param {Object} [options] - https://github.com/popeindustries/inline-source#usage
 */
const gulpInlineSourceHtml = (pluginOptions = {}) => {
  return through.obj((file, _, callback) => {
    if (file.isNull()) {
      return callback(null, file)
    }

    if (file.isStream()) {
      return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
    }

    const defaultOptions = { rootpath: file.base }
    const options = { ...defaultOptions, ...pluginOptions }
    ;(async () => {
      try {
        const newFileContents = await inlineSource(
          String(file.contents),
          options
        )
        file.contents = Buffer.from(newFileContents)
        callback(null, file)
      } catch (err) {
        callback(new PluginError(PLUGIN_NAME, err))
      }
    })()
  })
}

module.exports = gulpInlineSourceHtml
