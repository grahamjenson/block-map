(function() {
  var app, express, js, port, ss, templates;

  express = require("express");

  templates = require('./templates');

  app = express();

  app.use(express.logger());

  app.use(express["static"](__dirname + '/assets'));

  js = function() {
    var jss;
    jss = ['jquery', 'topojson', 'world-50m', 'underscore', 'backbone', 'block_map', 'map_view', 'd3'];
    return templates.javascripts({
      files: jss
    });
  };

  ss = function() {
    var sss;
    sss = ['base'];
    return templates.stylesheets({
      files: sss
    });
  };

  app.get('/', function(request, response) {
    console.log(templates);
    return response.send(templates.layout({
      body: templates.block_map,
      javascripts: js,
      stylesheets: ss
    }));
  });

  port = process.env.PORT || 3000;

  app.listen(port, function() {
    return console.log("Listening on " + port);
  });

}).call(this);
