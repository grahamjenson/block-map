class BlockMap.Views.MapView extends Backbone.View

  initialize: (args) ->
    @render() 
    window.mapview = @

  render: () ->
    width = $(window).width()
    height = $(window).height()
    
    @smallgj = {
      "type": "MultiPolygon",
      "coordinates" : []
    }
    
    @mediumgj = {
      "type": "MultiPolygon",
      "coordinates" : []
    }

    @largegj = {
      "type": "MultiPolygon",
      "coordinates" : []
    }


    scale = parseInt(getURLParameter('scale')) || 150
    rx = parseFloat(getURLParameter('lon')) || -180
    ry = parseFloat(getURLParameter('lat')) || 0
    size = parseInt(getURLParameter('blocksize')) || 20
    sen = parseFloat(getURLParameter('sen')) || 1.0

    @gridobject = {
      'size' : size,
      grid : []
    }

    projection = d3.geo.equirectangular()
      .scale(scale)
      .translate([width/2,height/2])
      .rotate([rx,ry]);

    @projection = projection

    multi_polygon = topojson.object(worldtopo, worldtopo.objects.land)

    @multi_polygon = multi_polygon

    canvas = d3.select("body").append("canvas")
      .attr("width", width-10)
      .attr("height", height-10)

    @context = canvas.node().getContext("2d");

    path = d3.geo.path()
      .projection(projection)
      .context(@context);
    

    ######AUTO SCALE KEEP INCREASING BOUNDS TILL IT IS CLOSE
    bounds = path.bounds(multi_polygon) 
    while bounds[0][0] > 100 or bounds[0][1] > 100
      projection.scale(projection.scale() + 25)
      bounds = path.bounds(multi_polygon)
    @path = path
    #####

    path(multi_polygon);
    
    @context.fillStyle = '#000000FF'
    @context.strokeStyle = '#000000FF'
    
    @context.fill();
    @context.stroke();
    
    small = Math.min(254,(76*sen))
    medium = Math.min(254,(150*sen))
    large = Math.min(254,(230*sen))

    xsize = size
    ysize = size
    xdivs = ~~(width/xsize)-1
    ydivs = ~~(height/ysize)-1
    for y in [0..ydivs]
      row = $("<div id='#{y}_row'></div>").appendTo(@el)
      for x in [0..xdivs]
        box = $("<div id='#{x}_col' class='block' ></div>").appendTo(row)
        l = x*xsize 
        t = y*ysize
        h = ysize
        w = xsize
        box.css('left', l).css('top',-ysize).css('width',w).css('height',h).data({top: t})
        v = @average_color(@context.getImageData(l,t,h,w)).a
        
        p1 = projection.invert([l,t])
        p2 = projection.invert([l+w,t])
        p3 = projection.invert([l+w,t+h])
        p4 = projection.invert([l,t+h])
        ps = [[p1, p2, p3, p4, p1]]
        @gridobject.grid.push({'latlon': [p1,p3], 'xy' : [l,t] })

        tex = $("<div></div>").appendTo(box)
        if v > small
          tex.addClass('land')
          if v > large
            tex.addClass('large')
            @largegj.coordinates.push(ps)
          else if v > medium
            tex.addClass('medium')
            @mediumgj.coordinates.push(ps)
          else
            tex.addClass('small')
            @smallgj.coordinates.push(ps)
        else
          tex.addClass('water')
          box.css('top',t)
    
    $('.land').parent().each((i, box) ->
      setTimeout( ->
        t = $(box).data().top
        $(box).animate({top: "+=#{t}"},500)
      , (Math.random() * 2000) + 300
      );  
    )
    
    @geojson = { 
      "type": "GeometryCollection",
      "geometries": [@smallgj, @mediumgj, @largegj]
    }

    $('.downloads').prepend(window.HAML.download_btn({name: 'GeoJSON', text: JSON.stringify(@geojson)}))     
    $('.downloads').prepend(window.HAML.download_btn({name: 'GridObject', text: JSON.stringify(@gridobject)}))

  average_color: (data) ->
    #http://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
    length = data.data.length;
    rgb = {r:0, g:0, b:0, a:0}

    i = -4
    blockSize = 5
    count = 0
    while (i += blockSize * 4) < length
      ++count;
      rgb.r += data.data[i]
      rgb.g += data.data[i+1]
      rgb.b += data.data[i+2]
      rgb.a += data.data[i+3]

    # ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    rgb.a = ~~(rgb.a/count);
    return rgb;
