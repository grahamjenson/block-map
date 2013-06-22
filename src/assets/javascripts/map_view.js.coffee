class BlockMap.Views.MapView extends Backbone.View

  initialize: (args) ->
    @render() 
    window.mapview = @

  render: () ->
    width = $(window).width()
    height = $(window).height()

    projection = d3.geo.equirectangular()
      .scale(300)
      .translate([width/2,height/2])
      .rotate([-180,0]);

    multi_polygon = topojson.object(worldtopo, worldtopo.objects.land)

    canvas = d3.select("body").append("canvas")
      .attr("width", width)
      .attr("height", height)

    @context = canvas.node().getContext("2d");

    path = d3.geo.path()
      .projection(projection)
      .context(@context);

    path(multi_polygon);
    
    @context.fillStyle = '#000000FF'
    @context.strokeStyle = '#000000FF'
    
    @context.fill();
    @context.stroke();
    
    xsize = 50
    ysize = 50
    xdivs = width/xsize
    ydivs = height/ysize
    for y in [0..ydivs]
      row = $("<div id='#{y}_row'></div>").appendTo(@el)
      for x in [0..xdivs]
        box = $("<div id='#{x}_col' class='block' ></div>").appendTo(row)
        l = x*xsize 
        t = y*ysize
        h = ysize
        w = xsize
        box.css('left', l).css('top',0).css('width',w).css('height',h)
        v = @average_color(@context.getImageData(l,t,h,w)).a
        box.animate({top: "+=#{t}"},1000+(y*20) + (x*20))
        if v > 70
          box.addClass('land')

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
