const Chef = require('../models/Chef');

module.exports = {
    index(req, res) {

        Chef.all(function (chefs) {
            return res.render('admin/chefs/index', { chefs });
        });

    },
    getChef(req, res) {

        Chef.find(req.params.id, function (chef) {
            Chef.findRecipe(req.params.id, function(recipes){

                return res.render('admin/chefs/chef', {chef, recipes})
                
            });
            
        });
    },
    pageCreateChef(req, res) {
        return res.render('admin/chefs/cadastrar-chef');
    },
    createChef(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Preencha todos os campos');
            }
        }

        Chef.post(req.body, function () {
            return res.redirect('/admin-chefs');
        });
    },
    pageEditChef(req, res) {
        Chef.find(req.params.id, function(chef){
            if(!chef) {return res.send('Chefe não encontrado')}
            return res.render('admin/chefs/editar-chef', {chef});
        });
    },
    editChef(req, res) {
        Chef.put(req.body, function () {

            const keys = Object.keys(req.body);

            for (key of keys) {
                if (req.body[key] == '') {
                    return res.send('Preencha todos os campos');
                }
            }

            return res.redirect('/admin-chefs')
        });
    },
    deleteChef(req, res){
        Chef.delete(req.body.id, function(){
            return res.redirect('/admin-chefs');
        });
    }
}
