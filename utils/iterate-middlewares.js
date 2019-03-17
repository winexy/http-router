function iterateMiddlewares(context, middlewares) {
  const { req, res } = context;

  const iterator = middlewares[Symbol.iterator]();
  const { value: fn } = iterator.next();

  fn(req, res, shouldCallNext.bind(iterator, req, res));
}

function shouldCallNext(req, res) {
  const { value: fn, done } = this.next();

  if (done) {
    return;
  }

  fn(req, res, shouldCallNext.bind(this, req, res));
}

module.exports = iterateMiddlewares;
