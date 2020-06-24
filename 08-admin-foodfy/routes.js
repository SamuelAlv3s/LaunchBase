const express = require('express');
const routes = express.Router();
const recipes = require('./recipes');

//users
routes.get('/', recipes.index); // Página inicial
routes.get('/sobre', recipes.sobre); // Página sobre
routes.get('/receitas', recipes.receita); // Página com todas as receitas
routes.get('/receita/:index', recipes.receitaIndex); // Página detalhada de cada receita

//admin
routes.get('/admin', recipes.indexAdm); // Página inicial ADM
routes.get('/admin/create', recipes.create); // Página de criação de receitas
routes.get('/admin/:id', recipes.show); // Página para exibir detalhes de uma receita
routes.get('/admin/:id/edit', recipes.edit); // Página para editar uma receita

routes.post('/admin', recipes.post); // Cadastrar uma receita
routes.put('/admin', recipes.put); // Editar uma receita
routes.delete('/admin', recipes.delete); // Deletar uma receita

module.exports  = routes;