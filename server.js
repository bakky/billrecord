
/**
 * Module dependencies.
 */

require('./lib/patch');
var connect = require('connect');
var render = require('connect-render');
var urlrouter = require('urlrouter');
var config = require('./config');
var bill = require('./controllers/bill');

var app = connect();

app.use('/public', connect.static(__dirname + '/public', {maxAge: 3600000 * 24 * 30}));
app.use(connect.cookieParser());
app.use(connect.query());
app.use(connect.bodyParser());
app.use(connect.session({secret: config.session_secret}));
app.use(connect.csrf());
app.use(render({
  root: __dirname + '/views',
  layout: 'layout.html',
  cache: config.debug, // `false` for debug
  helpers: {
    config: config,
    _csrf: function (req, res) {
      return req.session._csrf;
    }
  }
}));


/**
 * Routing
 */
var router = urlrouter(function (app) {
  app.get('/', bill.index);
  app.post('/bill/new', bill.new);
  app.get('/bill/:id', bill.view);
  app.get('/bill/:id/edit', bill.edit);
  app.post('/bill/:id/edit', bill.save);
  app.get('/bill/:id/delete', bill.delete);
  app.get('/bill/:id/finish', bill.finish);
});
app.use(router);

app.listen(config.port);
console.log('Server start on ' + config.port);