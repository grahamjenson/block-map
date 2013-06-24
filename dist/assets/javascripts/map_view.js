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
      var bounds, box, canvas, h, height, l, multi_polygon, path, projection, row, rx, ry, scale, size, t, tex, v, w, width, x, xdivs, xsize, y, ydivs, ysize, _i, _j;
      width = $(window).width();
      height = $(window).height();
      scale = parseInt(getURLParameter('scale')) || 150;
      rx = parseFloat(getURLParameter('lon')) || -180;
      ry = parseFloat(getURLParameter('lat')) || 0;
      size = parseInt(getURLParameter('blocksize')) || 20;
      projection = d3.geo.equirectangular().scale(scale).translate([width / 2, height / 2]).rotate([rx, ry]);
      this.projection = projection;
      multi_polygon = topojson.object(worldtopo, worldtopo.objects.land);
      this.multi_polygon = multi_polygon;
      canvas = d3.select("body").append("canvas").attr("width", width - 10).attr("height", height - 10);
      this.context = canvas.node().getContext("2d");
      path = d3.geo.path().projection(projection).context(this.context);
      bounds = path.bounds(multi_polygon);
      while (bounds[0][0] > 100 || bounds[0][1] > 100) {
        projection.scale(projection.scale() + 25);
        bounds = path.bounds(multi_polygon);
      }
      this.path = path;
      path(multi_polygon);
      this.context.fillStyle = '#000000FF';
      this.context.strokeStyle = '#000000FF';
      this.context.fill();
      this.context.stroke();
      xsize = size;
      ysize = size;
      xdivs = ~~(width / xsize) - 1;
      ydivs = ~~(height / ysize) - 1;
      for (y = _i = 0; 0 <= ydivs ? _i <= ydivs : _i >= ydivs; y = 0 <= ydivs ? ++_i : --_i) {
        row = $("<div id='" + y + "_row'></div>").appendTo(this.el);
        for (x = _j = 0; 0 <= xdivs ? _j <= xdivs : _j >= xdivs; x = 0 <= xdivs ? ++_j : --_j) {
          box = $("<div id='" + x + "_col' class='block' ></div>").appendTo(row);
          l = x * xsize;
          t = y * ysize;
          h = ysize;
          w = xsize;
          box.css('left', l).css('top', -ysize).css('width', w).css('height', h).data({
            top: t
          });
          v = this.average_color(this.context.getImageData(l, t, h, w)).a;
          tex = $("<div></div>").appendTo(box);
          if (v > 50) {
            tex.addClass('land');
            if (v > 200) {
              tex.addClass('large');
            } else if (v > 150) {
              tex.addClass('medium');
            } else {
              tex.addClass('small');
            }
          } else {
            tex.addClass('water');
            box.css('top', t);
          }
        }
      }
      return $('.land').parent().each(function(i, box) {
        return setTimeout(function() {
          t = $(box).data().top;
          return $(box).animate({
            top: "+=" + t
          }, 500);
        }, (Math.random() * 2000) + 300);
      });
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
