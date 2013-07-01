################################################
#                    Grahams Node
#             This file is the initial router
# src    <-- All src files
# dist   <-- f(src), all calculated files
# vendor <-- all supplied files (calculated on different grunt task as the change less often)
# 
# src/assets <-- all public files (still usable on server)
# 
#
################################################

express = require("express")
templates = require './templates'


app = express()
app.use(express.logger())
app.use(express.static(__dirname + '/assets'));


js = () ->
  jss = ['jquery','topojson', 'world-50m', 'underscore','backbone', 'block_map','map_view', 'd3']
  templates.javascripts(files: jss)

ss = () ->
  sss = ['base']
  templates.stylesheets(files: sss)

temp = () ->
  ttt = ['download_btn']
  templates.templates(files: ttt)

app.get('/', (request, response) ->
  response.send(templates.layout(body: templates.block_map, javascripts: js, stylesheets: ss, templates: temp))
)


port = process.env.PORT || 3000
app.listen(port, ->
  console.log("Listening on " + port)
)