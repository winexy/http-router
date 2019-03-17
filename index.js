const url = require('url');
const methods = require('./utils/http-methods');
const ErrorHandlers = require('./utils/error-handlers');
const findHandler = require('./utils/find-handler');
const iterateMiddlewares = require('./utils/iterate-middlewares');

const Router = function () {
  const map = {
    [methods.GET]: [],
    [methods.POST]: [],
    [methods.PUT]: [],
    [methods.DELETE]: []
  };

  function registerHandler(method, path, ...fns) {
    if (fns.length === 0) {
      throw new Error(`Apply at least one handler for path: ${path}`);
    }

    map[method].push({ path, fns });
  }


  return {
    get: (...args) => registerHandler(methods.GET, ...args),
    post: (...args) => registerHandler(methods.POST, ...args),
    put: (...args) => registerHandler(methods.PUT, ...args),
    delete: (...args) => registerHandler(methods.DELETE, ...args),
    defineModule() {
      // TODO
    },
    resolve(req, res) {
      const pathname = decodeURI(
        url.parse(req.url).pathname
      );
      const { method } = req;

      if (!map[method]) {
        return ErrorHandlers[501](req, res);
      }

      const handler = findHandler(map, method, pathname);

      if (!handler) {
        return ErrorHandlers[404](req, res);
      }

      iterateMiddlewares({ req, res }, handler.fns);
    }
  };
};

module.exports = Router();
