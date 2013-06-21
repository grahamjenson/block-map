(function() {
  if (module.exports == null) {
    module.exports = {};
  }

  module.exports['t'] = function(context) {
    return (function() {
      var $o;
      $o = [];
      $o.push("<h1>asd</h1>");
      return $o.join("\n");
    }).call(context);
  };

}).call(this);
