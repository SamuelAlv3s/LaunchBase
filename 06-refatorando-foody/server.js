const express = require('express');
const nunjucks = require('nunjucks');
const receitas = require('./data');

const server = express();

server.use(express.static('public'));

nunjucks.configure('views',{
    express: server,
    noCache: true,
    autoescape: false
})

server.set('view engine', 'njk');

server.get('/', function(req, res){
    return res.render('inicial', {receitas: receitas});
});

server.get('/sobre', function(req, res){
    return res.render('sobre');
});

server.get('/receitas', function(req, res){
    return res.render('receitas', {receitas: receitas})
});

server.get('/receita/:index', function(req, res){
    const receitaIndex = req.params.index;

    return res.render('receita', {receita: receitas[receitaIndex]});
});

server.listen(5000, function(){
    console.log('server is running');
});