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
      var bounds, box, canvas, h, height, l, large, medium, multi_polygon, p1, p2, p3, p4, path, projection, ps, row, rx, ry, scale, sen, size, small, t, tex, v, w, width, x, xdivs, xsize, y, ydivs, ysize, _i, _j;
      width = $(window).width();
      height = $(window).height();
      this.smallgj = {
        "type": "MultiPolygon",
        "coordinates": []
      };
      this.mediumgj = {
        "type": "MultiPolygon",
        "coordinates": []
      };
      this.largegj = {
        "type": "MultiPolygon",
        "coordinates": []
      };
      scale = parseInt(getURLParameter('scale')) || 150;
      rx = parseFloat(getURLParameter('lon')) || -180;
      ry = parseFloat(getURLParameter('lat')) || 0;
      size = parseInt(getURLParameter('blocksize')) || 20;
      sen = parseFloat(getURLParameter('sen')) || 1.0;
      this.gridobject = {
        'size': size,
        grid: []
      };
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
      small = Math.min(254, 76 * sen);
      medium = Math.min(254, 150 * sen);
      large = Math.min(254, 230 * sen);
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
          p1 = projection.invert([l, t]);
          p2 = projection.invert([l + w, t]);
          p3 = projection.invert([l + w, t + h]);
          p4 = projection.invert([l, t + h]);
          ps = [[p1, p2, p3, p4, p1]];
          this.gridobject.grid.push({
            'latlon': [
              (function() {
                var _k, _len, _results;
                _results = [];
                for (_k = 0, _len = p1.length; _k < _len; _k++) {
                  x = p1[_k];
                  _results.push(parseFloat(x.toFixed(3)));
                }
                return _results;
              })(), (function() {
                var _k, _len, _results;
                _results = [];
                for (_k = 0, _len = p3.length; _k < _len; _k++) {
                  x = p3[_k];
                  _results.push(parseFloat(x.toFixed(3)));
                }
                return _results;
              })()
            ],
            'xy': [l, t]
          });
          tex = $("<div></div>").appendTo(box);
          if (v > small) {
            tex.addClass('land');
            if (v > large) {
              tex.addClass('large');
              this.largegj.coordinates.push(ps);
            } else if (v > medium) {
              tex.addClass('medium');
              this.mediumgj.coordinates.push(ps);
            } else {
              tex.addClass('small');
              this.smallgj.coordinates.push(ps);
            }
          } else {
            tex.addClass('water');
            box.css('top', t);
          }
        }
      }
      $('.land').parent().each(function(i, box) {
        return setTimeout(function() {
          t = $(box).data().top;
          return $(box).animate({
            top: "+=" + t
          }, 500);
        }, (Math.random() * 2000) + 300);
      });
      this.geojson = {
        "type": "GeometryCollection",
        "geometries": [this.smallgj, this.mediumgj, this.largegj]
      };
      $('.downloads').prepend(window.HAML.download_btn({
        name: 'GeoJSON',
        text: JSON.stringify(this.geojson)
      }));
      return $('.downloads').prepend(window.HAML.download_btn({
        name: 'GridObject',
        text: JSON.stringify(this.gridobject)
      }));
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
