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
    
    xsize = 12
    ysize = 12
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
        box.css('left', l).css('top',0).css('width',w).css('height',h).data({top: t})
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
    
    count = 0
    $('.land').parent().each((i, box) ->
      count += 1
      setTimeout( ->
        t = $(box).data().top
        $(box).animate({top: "+=#{t}"},700)
      , Math.random() * 4000
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
