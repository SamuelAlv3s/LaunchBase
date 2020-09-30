const Admin = require('../models/Admin');

module.exports = {
    index(req, res){

        Admin.all(function(recipes){

            return res.render('admin/admin', {recipes});
        });
        
    },
    pageCreateRecipe(req, res){

        Admin.selectChef(function(chefs){
            return res.render('admin/criar-receita', {chefs});
        });
        
    },
    pageEditRecipe(req, res){

        Admin.recipeById(req.params.id, function(recipe){

            if(!recipe){
                return res.send('Receita não encontrada');
            }

            Admin.selectChef(function(chefs){
                return res.render('admin/editar-receita', {recipe, chefs});
            });
            
        });
        
    },
    recipe(req, res){
        Admin.recipeById(req.params.id, function(recipe){

            if(!recipe){
                return res.send('Receita não encontrada');
            }

            Admin.selectChef(function(chefs){
                return res.render('admin/receita', {recipe, chefs});
            });
            
        });
    },
    createRecipe(req, res){

        const keys = Object.keys(req.body);

        for(key of keys){
            if(req.body[key] == ''){
                return res.send('Preencha todos os campoes');
            }
        }

        Admin.post(req.body, function(){
            return res.redirect('/admin-recipes');
        });
    },
    editRecipe(req, res){

        const keys = Object.keys(req.body);

        for(key in keys){
            if(req.body[key] == ''){
                return res.send('Preencha todos os campos');
            }
        }

        Admin.put(req.body, function(){
            return res.redirect('/admin-recipes');
        });
    },
    deleteRecipe(req, res){

        Admin.delete(req.body.id, function(){
            return res.redirect('/admin-recipes');
        });
    }
    
}