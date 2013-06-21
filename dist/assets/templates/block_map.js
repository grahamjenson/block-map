(function() {
  if (window.HAML == null) {
    window.HAML = {};
  }

  window.HAML['block_map'] = function(context) {
    return (function() {
      var $o;
      $o = [];
      $o.push("<h1>asd</h1>");
      return $o.join("\n");
    }).call(context);
  };

}).call(this);
