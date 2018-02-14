const toPairs = require('lodash/toPairs');
const map = require('lodash/map');
const merge = require('lodash/merge');
const has = require('lodash/has');

const Path = require('./path');

const universalPaths = (mapping = {}) => {
  const lookUp = merge(...map(toPairs(mapping), ([name, path]) => ({ [name]: Path(path) })))
  
  return (name) => {
    if (!has(lookUp, name)) {
      throw new Error(`Cannot find path mapping for name "${name}"`);
    }

    return lookUp[name];
  }
};

module.exports = universalPaths;
