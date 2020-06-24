const db = require('../../config/db');

module.exports = {

    all(callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        `, function (err, results) {
            if (err) throw `Error Database ${err}`

            callback(results.rows);
        });
    },
    chefs(callback) {
        db.query(`SELECT chefs.*, count(recipes) AS total
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        GROUP BY chefs.id`, function (err, results) {
            if (err) throw `Erro ao listar chefs`

            callback(results.rows);
        });
    },
    find(id, callback) {

        db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.id = $1
    `,[id], function (err, results) {
            if (err) throw `Error Database ${err}`

            callback(results.rows[0]);
        });
    },
    paginate(params){

        const {filter, limit, offset, callback} = params;


        let query = ``,
            filterQuery = ``,
            totalQuery = `(SELECT count(*) FROM recipes) AS total`

        

        if(filter){
            filterQuery = `WHERE recipes.title ILIKE '%${filter}%'`

            totalQuery = `
            (SELECT count(*) FROM recipes
            ${filterQuery}) AS total
            `
        }

            query = `
            SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ${filterQuery}
            ORDER BY recipes.id DESC
            LIMIT $1 OFFSET $2
            
        `;

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `${err}`

            callback(results.rows);
        });
    }
}