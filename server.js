var express = require('express');
var bodyParser = require('body-parser');
var htmlRoutes = require('./app/routing/html-routes.js');
var apiRoutes = require('./app/routing/api-routes.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

htmlRoutes.get(app);
apiRoutes.get(app);
apiRoutes.post(app);

app.listen(3000, function() {
  console.log('Listening on port: 3000');
});
