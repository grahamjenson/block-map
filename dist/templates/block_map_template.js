(function() {
  if (process.HAML == null) {
    process.HAML = {};
  }

  process.HAML['block_map_template'] = function(context) {
    return (function() {
      var $o;
      $o = [];
      $o.push("block_map_template.haml");
      return $o.join("\n");
    }).call(context);
  };

}).call(this);
