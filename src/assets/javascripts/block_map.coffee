window.BlockMap =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: ->
    Backbone.defaultrouter = new BlockMap.Routers.BlockMapRouter()
    Backbone.history.start()

class BlockMap.Routers.BlockMapRouter extends Backbone.Router
  routes:
    '': 'visualise'

  visualise: () ->
    bm = new BlockMap.Views.MapView({el: $('#container')})

$(document).ready ->
  BlockMap.init()
