module.exports = function findHandler(map, method, pathname) {
  return map[method].find(handler => pathname === handler.path);
};
