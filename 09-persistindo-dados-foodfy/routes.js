const express = require('express');
const routes = express.Router();
const home = require('./src/app/controllers/home');
const admin = require('./src/app/controllers/admin');
const chef = require('./src/app/controllers/chef');

routes.get('/', home.index);
routes.get('/sobre', home.sobre);
routes.get('/receitas', home.receitas);
routes.get('/receita/:id', home.receita);
routes.get('/chefs', home.chefs);

routes.get('/admin-recipes', admin.index);
routes.get('/admin-recipes/create', admin.pageCreateRecipe);
routes.get('/admin-recipes/edit/:id', admin.pageEditRecipe);
routes.get('/admin-recipes/recipe/:id', admin.recipe);
routes.post('/admin-recipes', admin.createRecipe);
routes.put('/admin-recipes', admin.editRecipe);
routes.delete('/admin-recipes', admin.deleteRecipe);

routes.get('/admin-chefs', chef.index);
routes.get('/admin-chefs/chef/:id', chef.getChef);
routes.get('/admin-chefs/create', chef.pageCreateChef);
routes.get('/admin-chefs/edit/:id', chef.pageEditChef);
routes.post('/admin-chefs', chef.createChef);
routes.put('/admin-chefs', chef.editChef);
routes.delete('/admin-chefs', chef.deleteChef);

module.exports = routes;