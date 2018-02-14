const replaceParameters = require('./replace-parameters');

const Path = (name) => ({
  name,
  url: replaceParameters(name)
});

module.exports = Path;
