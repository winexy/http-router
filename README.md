example:

`index.js`

````javascript

const http = require('http');

const server = new http.Server();

const Router = require('./router');
require('./routes');

server.on('request', Router.resolve);

server.listen(3000);
````

`routes.js`

````javascript
const Router = require('./libs/router');

Router.get('/', function(req, res) {
  res.end('hello, there!');
});
````
