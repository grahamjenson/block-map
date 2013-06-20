(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Faces.Views.MapView = (function(_super) {
    __extends(MapView, _super);

    function MapView() {
      _ref = MapView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MapView.prototype.initialize = function(args) {
      return this.render();
    };

    MapView.prototype.render = function() {
      var canvas, context, height, multi_polygon, path, projection, width;
      width = $(window).width();
      height = $(window).height();
      projection = d3.geo.equirectangular().scale(300).translate([width / 2, height / 2]).rotate([-180, 0]);
      multi_polygon = topojson.object(worldtopo, worldtopo.objects.land);
      canvas = d3.select("body").append("canvas").attr("width", width).attr("height", height);
      context = canvas.node().getContext("2d");
      path = d3.geo.path().projection(projection).context(context);
      path(multi_polygon);
      context.fill();
      return context.stroke();
    };

    MapView.prototype.calcDist = function(p1, p2) {
      var d1, d2, dLatRad, dLonRad, eR, lat1Rad, lat2Rad, lon1Rad, lon2Rad;
      dLatRad = Math.abs(p1[1] - p2[1]) * Math.PI / 180;
      dLonRad = Math.abs(p1[0] - p2[0]) * Math.PI / 180;
      lat1Rad = p1[1] * Math.PI / 180;
      lon1Rad = p1[0] * Math.PI / 180;
      lat2Rad = p2[1] * Math.PI / 180;
      lon2Rad = p2[0] * Math.PI / 180;
      eR = 6371;
      d1 = Math.sin(dLatRad / 2) * Math.sin(dLatRad / 2) + Math.sin(dLonRad / 2) * Math.sin(dLonRad / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
      d2 = 2 * Math.atan2(Math.sqrt(d1), Math.sqrt(1 - d1));
      return eR * d2;
    };

    return MapView;

  })(Backbone.View);

}).call(this);
