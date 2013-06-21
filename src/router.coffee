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

app.get('/', (request, response) ->
  response.send(templates.layout(body: templates.block_map))
)


port = process.env.PORT || 3000
app.listen(port, ->
  console.log("Listening on " + port)
)