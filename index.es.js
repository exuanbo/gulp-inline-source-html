import require$$0 from 'inline-source';
import PluginError from 'plugin-error';
import through from 'through2';

const { inlineSource } = require$$0;



const PLUGIN_NAME = '@exuanbo/gulp-inline-source';

/**
 * inline-source wrapper
 * @param {Object} [options] - https://github.com/popeindustries/inline-source#usage
 */
const gulpInlineSource = (options = {}) => {
  return through.obj(async (file, _, callback) => {
    try {
      if (file.isNull()) {
        return callback(null, file)
      }

      if (file.isStream()) {
        return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
      }

      const defaultOptions = {
        rootpath: file.base
      };

      const pluginOptions = { ...defaultOptions, ...options };

      const newFileContents = await inlineSource(
        String(file.contents),
        pluginOptions
      );
      file.contents = Buffer.from(newFileContents);
      callback(null, file);
    } catch (err) {
      callback(new PluginError(PLUGIN_NAME, err));
    }
  })
};

var gulpInlineSource_1 = gulpInlineSource;

export default gulpInlineSource_1;
