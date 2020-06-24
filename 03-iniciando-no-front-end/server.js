const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require('./data');

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', function(req, res){
    const about = {
        avatar: 'https://avatars0.githubusercontent.com/u/49680351?s=400&v=4" alt="Samuel Alves',
        name: 'Samuel Alves',
        role: 'Aluno - Rocketseat',
        description: 'Estudante de Sistemas de Informação em IFBA, e aluno da - <a href="http://rocketseat.com.br" target="_blank">Rocketseat',
        links: [
            {name: 'Github' , url: '/'},
            {name: 'Twitter' , url: '/'},
            {name: 'LinkedIn' , url: '/'}
        ]
    }
    return res.render('about', {about});
});

server.get('/aulas', function(req, res){

    return res.render('aulas', {items: videos});
});

server.get('/video', function(req, res){

    const id = req.query.id;

    const video = videos.find(function(video){
        return video.id == id;
    });
    
        if(!video){
            return res.send('Video not found');
        }

        return res.render('video', {item: video});
    
});

server.listen(5000, function(){
    console.log('server is running');
});