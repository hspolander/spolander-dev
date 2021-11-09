import routes from './routes/wineRoutes';

const restify = require('restify');
const md5 = require('md5');
const CookieParser = require('restify-cookies');

const server = restify.createServer();

const { plugins } = restify;

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());
server.use(CookieParser.parse);

routes(server);

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
