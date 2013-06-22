(function() {
  if (window.HAML == null) {
    window.HAML = {};
  }

  window.HAML['block_map'] = function(context) {
    return (function() {
      var $o;
      $o = [];
      $o.push("<div id='container'></div>");
      return $o.join("\n").replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(context);
  };

}).call(this);
