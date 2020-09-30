const db = require('../../config/db');
const {date} = require('../../lib/utils');

module.exports = {
    all(callback){
        db.query(`SELECT chefs.* FROM chefs ORDER BY chefs.id DESC`, function(err, results){
            if(err) throw 'Erro ao carregar chefs';

            callback(results.rows);
        });
    },
    find(id, callback){
        db.query(`
            SELECT chefs.*, COUNT(recipes) AS total
            FROM chefs 
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id) WHERE chefs.id = $1
            GROUP BY chefs.id
            `, [id], function(err, results){
            if(err) throw `${err}`

            callback(results.rows[0]);
        });
    },
    post(data, callback){
        const query = 
            `INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3) RETURNING id`

        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) throw `${err}`;

            callback();
        });
    },
    put(data, callback){

        const query = `
            UPDATE chefs SET
                name = ($1),
                avatar_url = ($2)
            WHERE id = $3
        `

        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw 'Erro ao atualizar dados do chef'

            callback();
        });
    },
    delete(id, callback){
        db.query(`DELETE FROM chefs WHERE chefs.id = $1`, [id], function(err, results){
            if(err) throw 'Erro ao deletar chef'

            callback();
        });
    },
    findRecipe(id, callback){
        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes LEFT JOIN chefs
            ON (recipes.chef_id = chefs.id)
            WHERE recipes.chef_id = $1`, [id],function(err, results){
            if(err) throw `Erro ao listar receitas ${err}`

            callback(results.rows);
        });
    }
}
