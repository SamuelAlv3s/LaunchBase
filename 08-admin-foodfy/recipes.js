const data = require('./data.json');
const fs = require('fs');


//index
exports.index = function(req, res){
    return res.render('users/index', {receitas: data.recipes});
}

//sobre
exports.sobre = function(req, res){
    return res.render('users/sobre');
}

//receitas
exports.receita = function(req, res){
    return res.render('users/receitas', {receitas: data.recipes})
}

//receitas/index
exports.receitaIndex = function(req, res){
    const Index = req.params.index;
    const receita = data.recipes[Index];

    return res.render('users/receita', {receita});
}

//------------ADM----------------//
exports.indexAdm = function(req, res){

    return res.render('admin/index', {receitas: data.recipes});
}

exports.create = function(req, res){

    return res.render('admin/create');
}

exports.show = function(req, res){

    const {id} = req.params;

    const foundId = data.recipes.find(function(recipe){
        return recipe.id == id;
    });

    if(!foundId){
        return res.send('Recipe not found');
    }

    const recipe = {
        ...foundId
    }

    return res.render('admin/receita', {receita: recipe});
}

exports.edit = function(req, res){

    const {id} = req.params;

    const foundId = data.recipes.find(function(recipe){
        return recipe.id == id;
    });

    if(!foundId){
        return res.send('Recipe not found');
    }

    const recipe = {
        ...foundId
    }

    return res.render('admin/edit', {recipe});
}

exports.post = function(req, res){

    const keys = Object.keys(req.body);

    for(key of keys){
        if(req.body[key] == ''){
            return res.send('Error: Preencha todos os campos');
        }
    }

    let {image, title, author, ingredients, preparation, information} = req.body;
    let id = 1;
    let lastId = data.recipes[Number(data.recipes.length - 1)];

    if(lastId){
        id = lastId.id + 1;
    }

    data.recipes.push({
        id,
        image,
        title,
        author,
        ingredients,
        preparation,
        information
    });

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error');

        return res.redirect('/admin');
    });
}

exports.put = function(req, res){
    const {id} = req.body;
    let index = 0;

    const foundId = data.recipes.find(function(recipe, foundIndex){
        if(id == recipe.id){
            index = foundIndex;
            return true;
        }
    });

    if(!foundId){
        return res.send('Recipe not Found');
    }

    const recipes = {
        ...foundId,
        ...req.body,
        id: Number(req.body.id)
    }

    data.recipes[index] = recipes;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error');

        return res.redirect(`/admin/${id}`);
    });
}

exports.delete = function(req, res){

    const {id} = req.body;
    let index = 0;

    const filteredId = data.recipes.filter(function(recipe, foundIndex){
        if(recipe.id != id){
            index = foundIndex;
            return true
        }
    });

    data.recipes = filteredId;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error');

        return res.redirect('/admin');
    });
}