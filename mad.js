
/*
  adds support for using ADM style moduels in node.

*/

module.constructor.prototype.define = function (depends,initializer){
  var self = this
  var _id = module.filename
  module.filename = self.filename
  this.exports = initializer.apply(this.exports,depends.map(require)) || this.exports
  module.filename = _id
}
