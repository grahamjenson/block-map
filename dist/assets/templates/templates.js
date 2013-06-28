(function() {
  if (window.HAML == null) {
    window.HAML = {};
  }

  window.HAML['templates'] = function(context) {
    return (function() {
      var $c, $e, $o, f, _i, _len, _ref;
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
      _ref = this.files;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        $o.push("<script src='templates/" + ($e($c(f))) + ".js'></script>");
      }
      return $o.join("\n").replace(/\s(\w+)='true'/mg, ' $1').replace(/\s(\w+)='false'/mg, '');
    }).call(context);
  };

}).call(this);
