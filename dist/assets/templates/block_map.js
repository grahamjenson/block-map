(function() {
  if (window.HAML == null) {
    window.HAML = {};
  }

  window.HAML['block_map'] = function(context) {
    return (function() {
      var $o;
      $o = [];
      $o.push("<div class='alert'>\n  <strong>\n    Parameters:\n  </strong>\n  (\n  <strong>\n    scale\n  </strong>\n  <em>\n    : Integer\n  </em>\n  )\n  d3.js scale\n  , (\n  <strong>\n    blocksize\n  </strong>\n  <em>\n    : Integer\n  </em>\n  )\n  size of block, (\n  <strong>\n    lat\n  </strong>\n  <em>\n    : Float\n  </em>\n  )\n  rotation latitude, (\n  <strong>\n    lon\n  </strong>\n  <em>\n    : Float\n  </em>\n  )rotation longitude\n</div>\n<div id='container'></div>\n<script>\n  var _gaq = _gaq || [];\n  _gaq.push(['_setAccount', 'UA-21053562-1']);\n  _gaq.push(['_setDomainName', 'block-map.maori.geek.nz']);\n  _gaq.push(['_trackPageview']);\n  (function() {\n      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;\n      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';\n      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);\n    })();\n</script>");
      return $o.join("\n").replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(context);
  };

}).call(this);
