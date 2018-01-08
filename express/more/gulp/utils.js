'use strict';

let _= require('underscore'),
	glob=require('glob'),
  	path= require('path'),
  	baseProject= path.join(__dirname, '..', '..', '/'),
  	distFolder= path.join(baseProject, 'dist');


var Module= function(){

	let that= this;

	this.baseProject= baseProject;

	this.appFolder= 'app';

	this.confFolder= 'more/conf';

	this.distFolder= distFolder;

	this.nodeModules= 'node_modules';

	this.getFilesForPatterns= function(patterns){
	  return _.chain(patterns)
	  .map(function(pattern){return glob.sync(pattern); })
	  .reduce(function(memo, num){
	    return memo.concat(num);
	  }, []).value();
	};

};

module.exports=new Module();
