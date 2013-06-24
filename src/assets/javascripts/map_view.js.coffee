class BlockMap.Views.MapView extends Backbone.View

  initialize: (args) ->
    @render() 
    window.mapview = @

  render: () ->
    width = $(window).width()
    height = $(window).height()

    scale = getURLParameter('scale') || 150
    rotatex = getURLParameter('x') || -180
    rotatey = getURLParameter('y') || 0

    projection = d3.geo.equirectangular()
      .scale(scale)
      .translate([width/2,height/2])
      .rotate([rotatex,rotatey]);

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
    
    xsize = 15
    ysize = 15
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

        tex = $("<div></div>").appendTo(box)
        if v > 50
          tex.addClass('land')
          if v > 200
            tex.addClass('large')
          else if v > 150
            tex.addClass('medium')
          else
            tex.addClass('small')
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
