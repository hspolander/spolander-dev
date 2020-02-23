let restify = require('restify');
var CookieParser = require('restify-cookies');

import routes from './routes/wineRoutes';

const server = restify.createServer();

const plugins = restify.plugins;

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());
server.use(CookieParser.parse);

routes(server);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
