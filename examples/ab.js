
module.define(['./a', './b'], function AB (a,b){
  return {ab: function (x){return a(b(x))} }//exports is returned.
})
