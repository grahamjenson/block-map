window.BlockMap =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: ->
    Backbone.defaultrouter = new BlockMap.Routers.BlockMapRouter()
    Backbone.history.start()

window.getURLParameter = (name) ->
  return decodeURI(
      (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[null])[1]
  );

class BlockMap.Routers.BlockMapRouter extends Backbone.Router
  routes:
    '': 'visualise'

  visualise: () ->
    bm = new BlockMap.Views.MapView({el: $('#container')})

$(document).ready ->
  BlockMap.init()
