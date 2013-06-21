(function() {
  var app, express, port, templates;

  express = require("express");

  templates = require('./templates');

  app = express();

  app.use(express.logger());

  app.use(express["static"](__dirname + '/assets'));

  app.get('/', function(request, response) {
    return response.send(templates.layout({
      body: templates.block_map
    }));
  });

  port = process.env.PORT || 3000;

  app.listen(port, function() {
    return console.log("Listening on " + port);
  });

}).call(this);
