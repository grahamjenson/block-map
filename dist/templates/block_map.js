(function() {
  if (module.exports == null) {
    module.exports = {};
  }

  module.exports['t'] = function(context) {
    return (function() {
      var $o;
      $o = [];
      $o.push("<div class='alert'>\n  <strong>\n    Parameters:\n  </strong>\n  (\n  <strong>\n    scale\n  </strong>\n  <em>\n    : Integer\n  </em>\n  )\n  d3.js scale\n  , (\n  <strong>\n    blocksize\n  </strong>\n  <em>\n    : Integer\n  </em>\n  )\n  size of block, (\n  <strong>\n    lat\n  </strong>\n  <em>\n    : Float\n  </em>\n  )\n  rotation latitude, (\n  <strong>\n    lon\n  </strong>\n  <em>\n    : Float\n  </em>\n  )rotation longitude\n</div>\n<div id='container'></div>");
      return $o.join("\n").replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(context);
  };

}).call(this);
