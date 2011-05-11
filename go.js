#!/usr/bin/env node
require('./bundle')(process.env.PWD + '/' + process.argv[2], process.argv[3]
  , function (e,s){
    console.log(s)
  })
