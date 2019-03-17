const handlers = {};

handlers[404] = function(req, res) {
  res.statusCode = 404;
  res.end('Not found');
};

handlers[501] = function(req, res) {
  res.statusCode = 501;
  res.end('Not implemented');
};

module.exports = handlers;
