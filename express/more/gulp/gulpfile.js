'use strict'; 

let gulp= require('gulp');


//Register server tasks
let ServerHelper= require('./server-helper'),
	serverHelper= new ServerHelper(gulp);
serverHelper.registerTasks();


