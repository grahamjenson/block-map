(function() {
  if (module.exports == null) {
    module.exports = {};
  }

  module.exports['t'] = function(context) {
    return (function() {
      var $c, $o;
      $c = function(text) {
        switch (text) {
          case null:
          case void 0:
            return '';
          case true:
          case false:
            return '' + text;
          default:
            return text;
        }
      };
      $o = [];
      $o.push("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Block Map</title>\n  </head>\n  <body>");
      $o.push("    " + $c(this.body()));
      $o.push("  </body>\n  <script src='javascripts/topojson.js'></script>\n  <script src='javascripts/world-110m.js'></script>\n  <script src='javascripts/underscore.js'></script>\n  <script src='javascripts/backbone.js'></script>\n  <script src=''></script>\n</html>");
      return $o.join("\n").replace(/\s(\w+)='true'/mg, ' $1').replace(/\s(\w+)='false'/mg, '');
    }).call(context);
  };

}).call(this);
