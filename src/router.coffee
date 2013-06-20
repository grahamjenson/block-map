express = require("express")

app = express()

app.use(express.logger())
app.use(express.static(__dirname + './javascripts'));

app.get('/', (request, response) ->
  templates = require './templates'
  response.send(process.HAML.layout(body: 'body template'))
)


port = process.env.PORT || 3000

app.listen(port, ->
  console.log("Listening on " + port)
)