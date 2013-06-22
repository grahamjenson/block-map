(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BlockMap.Views.MapView = (function(_super) {
    __extends(MapView, _super);

    function MapView() {
      _ref = MapView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MapView.prototype.initialize = function(args) {
      this.render();
      return window.mapview = this;
    };

    MapView.prototype.render = function() {
      var box, canvas, h, height, l, multi_polygon, path, projection, row, t, v, w, width, x, xdivs, xsize, y, ydivs, ysize, _i, _results;
      width = $(window).width();
      height = $(window).height();
      projection = d3.geo.equirectangular().scale(300).translate([width / 2, height / 2]).rotate([-180, 0]);
      multi_polygon = topojson.object(worldtopo, worldtopo.objects.land);
      canvas = d3.select("body").append("canvas").attr("width", width).attr("height", height);
      this.context = canvas.node().getContext("2d");
      path = d3.geo.path().projection(projection).context(this.context);
      path(multi_polygon);
      this.context.fillStyle = '#000000FF';
      this.context.strokeStyle = '#000000FF';
      this.context.fill();
      this.context.stroke();
      xsize = 50;
      ysize = 50;
      xdivs = width / xsize;
      ydivs = height / ysize;
      _results = [];
      for (y = _i = 0; 0 <= ydivs ? _i <= ydivs : _i >= ydivs; y = 0 <= ydivs ? ++_i : --_i) {
        row = $("<div id='" + y + "_row'></div>").appendTo(this.el);
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (x = _j = 0; 0 <= xdivs ? _j <= xdivs : _j >= xdivs; x = 0 <= xdivs ? ++_j : --_j) {
            box = $("<div id='" + x + "_col' class='block' ></div>").appendTo(row);
            l = x * xsize;
            t = y * ysize;
            h = ysize;
            w = xsize;
            box.css('left', l).css('top', 0).css('width', w).css('height', h);
            v = this.average_color(this.context.getImageData(l, t, h, w)).a;
            box.animate({
              top: "+=" + t
            }, 1000 + (y * 20) + (x * 20));
            if (v > 70) {
              _results1.push(box.addClass('land'));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    MapView.prototype.average_color = function(data) {
      var blockSize, count, i, length, rgb;
      length = data.data.length;
      rgb = {
        r: 0,
        g: 0,
        b: 0,
        a: 0
      };
      i = -4;
      blockSize = 5;
      count = 0;
      while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
        rgb.a += data.data[i + 3];
      }
      rgb.r = ~~(rgb.r / count);
      rgb.g = ~~(rgb.g / count);
      rgb.b = ~~(rgb.b / count);
      rgb.a = ~~(rgb.a / count);
      return rgb;
    };

    return MapView;

  })(Backbone.View);

}).call(this);
