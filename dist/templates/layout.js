(function() {
  if (process.HAML == null) {
    process.HAML = {};
  }

  process.HAML['layout'] = function(context) {
    return (function() {
      var $c, $e, $o;
      $e = function(text, escape) {
        return ("" + text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/\//g, '&#47;').replace(/"/g, '&quot;');
      };
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
      $o.push("    " + $e($c(this.body)));
      $o.push("  </body>\n  <script src='javascripts/topojson.js'></script>\n</html>");
      return $o.join("\n").replace(/\s(\w+)='true'/mg, ' $1').replace(/\s(\w+)='false'/mg, '');
    }).call(context);
  };

}).call(this);
