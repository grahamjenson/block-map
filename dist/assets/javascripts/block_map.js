(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.BlockMap = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function() {
      Backbone.defaultrouter = new BlockMap.Routers.BlockMapRouter();
      return Backbone.history.start();
    }
  };

  window.getURLParameter = function(name) {
    return (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [null, null])[1];
  };

  BlockMap.Routers.BlockMapRouter = (function(_super) {
    __extends(BlockMapRouter, _super);

    function BlockMapRouter() {
      _ref = BlockMapRouter.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BlockMapRouter.prototype.routes = {
      '': 'visualise'
    };

    BlockMapRouter.prototype.visualise = function() {
      var bm;
      return bm = new BlockMap.Views.MapView({
        el: $('#container')
      });
    };

    return BlockMapRouter;

  })(Backbone.Router);

  $(document).ready(function() {
    return BlockMap.init();
  });

}).call(this);
