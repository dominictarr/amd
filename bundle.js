require('amd')

module.define(['fs','vm'],function (fs,vm){
  var _fn = module.filename

  return function (){
    var _fn = module.filename
      , path = [].shift.call(arguments)
      , done = [].pop.call(arguments)
      , minify = ![].pop.call(arguments)
      , filename = resolve(path), refs = {}, rCount = 0, funx = [], modules = {}

    function resolve (req,filename){
      module.filename = filename || path 
      var r = require.resolve(req)
      module.filename = _fn
      return r
    }


    function load (filename){
      var src = fs.readFileSync(filename,'utf-8')

      var script = vm.createScript(src)
      script.runInNewContext({
        require:function (){},
        module: {
          define: function (depends,init){

            var m = {
              fn: filename,
              init: init,
              resolves: {},
              }

            depends.forEach(function (e){
              var depFN = resolve(e,filename)
              if(!modules[depFN])
                load(depFN)
              m.resolves[e] = resolve(e,filename)
            })
            if(!modules[filename])
              modules[filename] = m
          }
        }
      })
    }

    load(filename)

    function makeRef(item){
      return refs[item] = rCount ++ 
    }

    function ref (item){
      if(minify)
        return 'M[' + ( refs[item] !== undefined ? refs[item] : makeRef(item) ) +']'
      return 'M[' + JSON.stringify(item) + ']'
    }

    function indent(src){
      return src.split('\n').map(function (x){return'  ' + x}).join('\n')
    }

    function argsFor(fn){
      var resolves = modules[fn].resolves
        , args = []
      for(var key in resolves)
        args.push(ref(resolves[key]))
      return args
    }

    for(var fn in modules){
      //if it is the main module, do not register it.
      funx.push((fn === filename ? 'return' : ref (fn) + ' =\n' )
        + indent('(' + modules[fn].init + ')(' + argsFor(fn) + ');\n')
      )
    }

    done(null,'(function (M){\n' + funx.join('\n') + '\n})({});')
  }
  
})
