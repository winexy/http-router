const paramsRegExp = /(:[^/.]*)/g;

class ParamParser {
  static parse(path) {
    const params = path.match(paramsRegExp);

    if (!params) {
      return;
    }

    const keys = params.map(removeColonSymbol);
    const replacedPath = replacePathParams(path, params);

    const pattern = new RegExp(`^${replacedPath}$`, 'g');

    return { pattern, keys };
  }


  static mapParamsToPath({ pattern, keys }, pathname) {
    const foundParams = [...pattern.exec(pathname)].slice(1);

    return keys.reduce(function(params, key) {
      const value = foundParams.shift();
      params[key] = value;

      return params;
    }, {});
  }
}


function removeColonSymbol(param) {
  return param.slice(1);
}


function replacePathParams(path, params) {
  let replacedPath = path;
  params.forEach(param => {
    replacedPath = replacedPath.replace(param, '(.*)');
  });

  return replacedPath;
}


module.exports = ParamParser;
