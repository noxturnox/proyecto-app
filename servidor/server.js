require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const Post = require('./model/post');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/proyecto-app';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// usamos JWT auth para asegurar la api
app.use(jwt());

// rutas api
app.use('/users', require('./users/users.controller'));

// manejo de error global
app.use(errorHandler);

// arrancar el server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Servidor escuchando en el puerto ' + port);
});

app.post('/api/post/createPost', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		const post = new Post({
			title: req.body.title,
			description: req.body.description
		})
		post.save((err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/post/updatePost', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Post.update(
			{_id: req.body.id },
			{ title : req.body.title, description: req.body.description },
			(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/post/getAllPost', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Post.find({},[],{ sort: { _id: -1 } },(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/post/deletePost', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Post.findByIdAndRemove(req.body.id,
			(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})
