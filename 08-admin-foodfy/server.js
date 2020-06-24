const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');

const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.static('public'));
server.use(methodOverride('_method'));
server.use(routes);

nunjucks.configure('views',{
    express: server,
    noCache: true,
    autoescape: false
})

server.set('view engine', 'njk');


server.listen(5000, function(){
    console.log('server is running');
});