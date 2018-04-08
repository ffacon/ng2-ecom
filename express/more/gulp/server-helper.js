'use strict';

let	gutil= require('gulp-util'),
	express = require('express'),
  	http = require('http'),
  	bodyParser= require('body-parser'),
  	path= require('path'),
  	utils= require('./utils');






class ServerHelper{

	constructor(gulp){
		this.gulp= gulp;
		this.server= this.initServer();
	}


	buildNewsApi(appServer){

		const news= require( path.join( utils.baseProject, utils.appFolder, 'data', 'news.json' ) );

		appServer.get('/api/app/news', function(req, res){
			res.send(news);
		});

		appServer.get('/api/app/news/random', function(req, res){
			var index= Math.floor( Math.random() * news.length );
			res.send(news[index]);			
		});

		appServer.delete('/api/app/news/:newsId', function(req, res){
			let newsId= parseInt(req.params.newsId);

			for (var i in news){
				let currentNews= news[i];
				if (currentNews.id === newsId){
					news.splice(i,1);
					res.status(204); //success with 204 but not with 200
					//204 no content  : indique que la requête a réussi mais que le client n'a pa besoin de quitter la page actuelle
					//200 ok : Si la page doit être actualisée avec une nouvelle page mise à jour, c'est le code de statut 200 qui doit être utilisé
					res.send('OK');
					return;
				}
			}

			res.status(500);
			res.send('Invalid id');
		});

		appServer.post('/api/app/news/like/:newsId', function(req, res){

			let newsId= parseInt(req.params.newsId);

			for (var i in news){
				let currentNews= news[i];
				if (currentNews.id === newsId){
					currentNews.likes++;
					res.status(200);
					res.send(currentNews);
					return;
				}
			}

			res.status(500);
			res.send('Invalid id');


		});

		appServer.post('/api/app/news', function(req, res){

			let newsToAdd= req.body;

			if (!newsToAdd.content || !newsToAdd.author || !newsToAdd.category ){
				res.status(500);
				res.send('Invalid news content, missing values');
				return;
			}

			let higherId= 0;
			news.forEach(function(value, index){
				if (value.id > higherId){
					higherId= value.id;
				}
			});

			newsToAdd.id= higherId + 1;
			newsToAdd.likes= 0;

			news.push(newsToAdd);
			res.send(newsToAdd);
		});


	};


	buildAuthentication(appServer){
		let users= require( path.join( utils.baseProject, utils.appFolder, 'data', 'users.json' ) );

		appServer.post('/api/app/login', function(req, res){

			let userToAuthenticate= req.body;

			if (!userToAuthenticate.login || !userToAuthenticate.password){
				res.status(500);
				res.send('Invalid authentication content, missing values');
				return;
			}

			for(let i in users){
				let user= users[i];
				if (user.login == userToAuthenticate.login &&
					user.password == userToAuthenticate.password
				){
					res.status(200);
					res.send(user);
					return;
				}
			}

			res.status(401);
			res.send('Invalid credentials');

		});		

	};


	buildCatalog(appServer){

		let catalog= require( path.join( utils.baseProject, utils.appFolder, 'data', 'books.json' ) );

		appServer.get('/api/app/catalog', function(req, res){
			res.send(catalog);
		});


		appServer.get('/api/app/catalog/:productId', function(req, res){

			let productId= parseInt(req.params.catalogId);

			for (let i= 0; i< catalog.length; i++){
				let product= catalog[i];
				if (product.id == productId){
					res.send(product);
					return;
				}
			}

			res.status(500);
			res.send('Invalid id');
		});		

	}


	initServer(){

		let appServer= express()
		    .get('/', function(req, res){
		    	res.sendFile('index.html', {root: utils.appFolder});
		    })
		    .use(bodyParser.json())
		    .use(express.static(utils.baseProject + '/' + utils.appFolder))
		    .use(express.static(utils.baseProject + '/node_modules'));

		this.buildNewsApi(appServer);
		this.buildAuthentication(appServer);
		this.buildCatalog(appServer);

		return http.createServer(appServer);
	}


	getServer(){
		return this.server;
	}


	registerTasks(){

		let gulp= this.gulp,
			that= this;

		gulp.task('express', function(cb){
		  let port= 8080;
		  that.server.listen(port, function(){
		    gutil.log(`server listening on ${port}`);
		    cb();
		  });
		});
	}

};


module.exports= ServerHelper;