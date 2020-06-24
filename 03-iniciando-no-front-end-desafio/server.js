const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const cursos = require('./data');

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    noCache: true
});

server.get('/', function(req, res){
    return res.render('index');
});

server.get('/conteudos', function(req, res){
    return res.render('conteudos', {items: cursos});
});

server.get('/sobre', function(req, res){
    return res.render('sobre');
});

server.get('/cursos', function(req, res){
    const id = req.query.id;
    // req.params esta dando erro//
    const curso = cursos.find(function(curso){
        return curso.id == id;

    });

    if(!curso){
        return res.send('Course not found');
    }
    
    return res.render('cursos', {item: curso});
});

server.use(function(req, res){
    res.status(404).render("error404");
});

server.listen(5000, function(){
    console.log('server is running');
});