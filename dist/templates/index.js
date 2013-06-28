(function() {
  var f, files, tem, _i, _len;

  files = ['layout', 'block_map', 'javascripts', 'stylesheets', 'templates'];

  for (_i = 0, _len = files.length; _i < _len; _i++) {
    f = files[_i];
    tem = require("./" + f);
    if (tem.t) {
      module.exports[f] = tem.t;
    }
  }

}).call(this);
