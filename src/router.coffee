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

app = express()


app.use(express.logger())

console.log 'DIR NAME', __dirname

app.use(express.static(__dirname + '/assets'));

app.get('/', (request, response) ->
  templates = require './templates'
  response.send(process.HAML.layout(body: 'body template'))
)


port = process.env.PORT || 3000

app.listen(port, ->
  console.log("Listening on " + port)
)