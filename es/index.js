import path from 'path';
import merge from 'lodash.merge';

var env = process.env.NODE_ENV;

var envConfigPath = void 0;
var defaultConfig = void 0;
var envConfig = {};
var cfgDir = process.env.CONFIG_DIR;

// figure out where the config files are at
if (!cfgDir) {
  cfgDir = path.resolve(process.cwd(), 'config/') + '/';
} else {
  cfgDir = path.resolve(cfgDir) + '/';
}

var defaultConfigPath = path.join(cfgDir, 'default');
if (env) {
  envConfigPath = path.join(cfgDir, env);
}

try {
  defaultConfig = require(defaultConfigPath);
} catch (err) {
  defaultConfig = {}; // no default specified
}

try {
  if (envConfigPath) {
    envConfig = require(envConfigPath);
  }
} catch (err) {
  throw new Error(err);
}

export default merge(defaultConfig, envConfig);