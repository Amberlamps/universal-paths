const has = require('lodash/has');

const replaceParameters = (path) => (params = {}) => path.replace(/:([a-zA-Z]*)/g, (match, group) => (
  has(params, group) ? params[group] : match
));

module.exports = replaceParameters;
