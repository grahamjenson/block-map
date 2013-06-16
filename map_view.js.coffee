class Faces.Views.MapView extends Backbone.View

  initialize: (args) ->

    @render() 

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

    context = canvas.node().getContext("2d");

    path = d3.geo.path()
      .projection(projection)
      .context(context);

    path(multi_polygon);
    context.fill();
    context.stroke();

  calcDist: (p1,p2) ->
    #Haversine formula
    dLatRad = Math.abs(p1[1] - p2[1]) * Math.PI/180;
    dLonRad = Math.abs(p1[0] - p2[0]) * Math.PI/180;
    # Calculate origin in Radians
    lat1Rad = p1[1] * Math.PI/180;
    lon1Rad = p1[0] * Math.PI/180;
    # Calculate new point in Radians
    lat2Rad = p2[1] * Math.PI/180;
    lon2Rad = p2[0] * Math.PI/180;

    # Earth's Radius
    eR = 6371;
    d1 = Math.sin(dLatRad/2) * Math.sin(dLatRad/2) +
       Math.sin(dLonRad/2) * Math.sin(dLonRad/2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    d2 = 2 * Math.atan2(Math.sqrt(d1), Math.sqrt(1-d1));
    return(eR * d2);
