require('../amd')
module.define(['assert','./examples/a','./examples/b'], function (assert,a,b){
 
  this ['loads AMD style modules'] = function (){
    assert.equal(b.a,'aardvark')
    assert.equal(b.b,'banana')
  }

})
