const Home = require('../models/Home');

module.exports = {
    
    index(req, res){

        let {filter, page, limit} = req.query;

        page = page || 1;
        limit = limit || 3;
        let offset = limit * (page - 1);

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes){

                const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                }

                return res.render('home/index', {filter, pagination, recipes});
            }
        }

        Home.paginate(params)
       
    },
    sobre(req, res){
        return res.render('home/sobre');
    },
    receitas(req, res){
        let {filter, page, limit} = req.query;

        page = page || 1;
        limit = limit || 6;
        let offset = limit * (page - 1);

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes){

                const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                }

                return res.render('home/receitas', {filter, pagination, recipes});
            }
        }

        Home.paginate(params)
        
    },
    receita(req, res){
        Home.find(req.params.id, function(recipe){
            return res.render('home/receita', {recipe});
        });
        
    },
    chefs(req, res){
        Home.chefs(function(chefs){
            return res.render('home/chefs', {chefs});
        });
        
    }
}
