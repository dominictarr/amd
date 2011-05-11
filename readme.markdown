#A lightweight module loader for node and the browser.

The goal of AMD is to create the simplest possible 
module loader that is compatible with both node and the browser. it is a partial implementation of [CommonJS/Modules/SimpleAsynchronous] (http://wiki.commonjs.org/wiki/Modules/SimpleAsynchronous)

AMD forces you to declare all your dependencies up front, 
and not require anything new after that point. 

This makes module loading easy.

##AMD modules:

  * work in browser and node
  * can be loaded with require() from normal node modules.
  * does not add any overhead to the modules - unlike other node-browser-module systems!

It is necessary to define your modules a new way:

###the old way:

    //ab.js
    var a = require('./a')
      , b = require('./b')
      
    exports.ab = function (x){return a(b(x))}

###the NEW way:

    //ab.js - amd style
    require('amd') // (loads monkeypatch which makes amd work in node)

    module.define(['./a', './b'], function AB (a,b){
    
      return {ab: function (x){return a(b(x))} } //exports is returned.
    })

`module.define` takes two arguments an array of dependencies and a initializer function. 
the dependencies are loaded and passed to the initializer in the same order that they are in the array. 
The return value of the initializer is the module's exports.

####then do `$ amd ab.js > ab-browser.js`:

AMD will load the modules, get their dependencies, topologically sort them, 
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

##limitations

AMD does not support:

  * circular dependencies.
  * dynamic dependencies.
  * `__filename`, `__dirname`, or `module` variables (in the browser)
  * no way to catch errors which may occur in the initializer functions.
 
If you think these features should be supported please 
[email me] (mailto:dominic.tarr@gmail.com) with your use-case.

Currently these features are ignored to keep this module simple, 
or because they aren't appropriate on browser side modules.

##FORTHCOMING FEATURES: (things I am thinking about, at least)

  * get semi-dynamic dependencies by specifying passing dependencies to amd/bundle.
  * way to catch errors or defer loading, so that it is possible to write a test framework.
