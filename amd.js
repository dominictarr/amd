
/*
  adds support for using AMD  (CommonJS2.0) style modules in node.
*/

module.constructor.prototype.define = function (depends,initializer){
  var self = this
  var _id = module.filename
  module.filename = self.filename
  this.exports = initializer.apply(global,depends.map(require))
  module.filename = _id
}
