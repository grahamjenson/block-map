###### module
files = ['layout','block_map', 'javascripts', 'stylesheets', 'templates']
for f in files
  tem = require "./" + f
  if tem.t
    module.exports[f] = tem.t
