#a superlightweight module loader for node and the browser.

The objective of AMD is to create a the simplest possible 
node/browser module loader. Instead of trying to do something 
clever and force node modules into the browser, instead it's 
better to change our problem behaviour to make the hard problem into a easy one.

AMD forces you to declare all your dependencies up front, 
and not require anything new after that point. 

It's not unreasonable, but suddenly loading modules is easy.

##AMD modules:

  * work in browser and node
  * can be required by normal node modules, with no funny business.
  * does not add any overhead to the modules - unlike other node-browser-module systems!

###the old way:

    //ab.js
    var a = require('./a')
      , b = require('./b')
      
    exports.ab = function (x){return a(b(x))}

###the NEW way:

    //ab.js - amd style
    require('amd')
    module.define(['./a', './b'], function AB (a,b){
    
      return function (x){return a(b(x))} //exports is returned.
    })

then do `$ amd ab.js`:

amd will load the modules, get thier dependencies, topologicially sort them, 
and stringify them, pluging dependencies into the correct places! 
with very little overhead!

    (function (M){
    M[1] =
      (function A(){
        return function (x){'!' + x + '!'}
      })();
  
    M[2] =
      (function B(){
        return function (x){'?' + x + '?'}
      })();
  
    return  (function AB(a,b){
        return function (x){return a(b(x))} //exports is returned.
      })(M[1],M[2]);
  
    })({});
