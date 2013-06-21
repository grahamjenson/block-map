###### module
files = ['layout','block_map']
for f in files
  tem = require "./" + f
  if tem.t
    module.exports[f] = tem.t
