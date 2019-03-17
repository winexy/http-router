const ParamParser = require('./param-parser');

module.exports = function findHandler(map, method, pathname) {
  let params = {};
  let handler = null;

  handler = map[method].find(handler => {
    const namedParams = ParamParser.parse(handler.path);

    if (!namedParams) {
      return pathname === handler.path;
    }

    const matches = pathname.match(namedParams.pattern);

    if (matches) {
      params = ParamParser.mapParamsToPath(namedParams, pathname);
      return true;
    }

  });

  return {
    handler,
    params
  };
};
