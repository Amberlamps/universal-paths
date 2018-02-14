const has = require('lodash/has');

const replaceParameters = (path) => (params = {}) => path.replace(/:([A-Za-z0-9_]*)/g, (match, group) => (
  has(params, group) ? params[group] : match
));

module.exports = replaceParameters;
