(function() {
  console.log('require templates dir');

  if (typeof window === 'object') {
    require("./layout-client.js");
  } else {
    require("./layout-server.js");
  }

  return exports;

}).call(this);
