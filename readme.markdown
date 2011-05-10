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
  * can be required by normal node modules.
  * does not add any overhead to the modules - unlike other node-browser-module systems!

###the old way:

    //ab.js
    var a = require('./a')
      , b = require('./b')
      
    exports.ab = function (x){return a(b(x))}

###the NEW way:

    //ab.js - amd style
    require('amd')
    //module.define(dependencies, initializer)
    module.define(['./a', './b'], function AB (a,b){
    
      return {ab: function (x){return a(b(x))} } //exports is returned.
    })

The dependencies array specifies your dependencies, which will be passed 
as arguments to the initializer function. 
The return value of the intializer will be the module's exports.

####then do `$ amd ab.js > ab-browser.js`:

AMD will load the modules, get thier dependencies, topologicially sort them, 
stringify them, and plug dependencies into the correct places, with very little overhead!

then it will return a script that you can simply include on your page:

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

##what _can't_ AMD do?

AMD does not support:

  * circular dependencies.
  * dynamic dependencies.
  * __filename, __dirname, or module variables (in the broswer)

If you think these features should be supported please 
[mailto:dominic.tarr@gmail.com] (email me) with your usecase.

Currently these features are ingored to keep this module simple, 
or because they arn't appropiate on browser side modules.
