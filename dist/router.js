(function() {
  var app, express, port;

  express = require("express");

  app = express();

  app.use(express.logger());

  console.log('DIR NAME', __dirname);

  app.use(express["static"](__dirname + '/assets'));

  app.get('/', function(request, response) {
    var templates;
    templates = require('./templates');
    return response.send(process.HAML.layout({
      body: 'body template'
    }));
  });

  port = process.env.PORT || 3000;

  app.listen(port, function() {
    return console.log("Listening on " + port);
  });

}).call(this);
