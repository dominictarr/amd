require('amd')
var bundle = require('amd/bundle')

exports ['test'] = function (test){

  bundle(__dirname + '/examples/b.js', true,function (err,src){
    console.log(src)

    var x = eval(src)

    test.deepEqual(x,{a:'aardvark', b: 'banana'})

    test.done()
  })

}

exports ['test repeated'] = function (test){

  bundle(__dirname + '/examples/c.js', true, function (err,src){
    console.log(src)

    var x = eval(src)

    test.deepEqual(x,{a:'aardvark', b: 'banana', c:'coco'})

    test.done()
  })

} 
