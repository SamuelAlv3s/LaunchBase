const db = require('../../config/db');
const {date} = require('../../lib/utils');

module.exports = {
    all(callback){
        db.query(
            `SELECT recipes.*, chefs.name AS chef_name 
                FROM recipes 
                LEFT JOIN chefs 
                ON (recipes.chef_id = chefs.id)`, function(err, results){
                    if(err) throw `Erro ao acessar lista de receitas`

                    callback(results.rows);
                });
    },
    selectChef(callback){
        db.query(
            `SELECT name, id FROM chefs ORDER BY name ASC`, function(err, results){
                if(err) throw `Erro ao listar chefs`;

                callback(results.rows);
            });
    },
    recipeById(id, callback){
        db.query(
            `SELECT recipes.*, chefs.name AS chef_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.id =$1`, [id], function(err, results){
                    if(err) throw `Erro ao listar receita`

                    callback(results.rows[0]);
                });
    },
    post(data, callback){

        const query = `INSERT INTO recipes (
            chef_id,
            image,
            title,
            information,
            ingredients,
            preparation,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`

        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.information,
            data.ingredients,
            data.preparation,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Erro ao cadastrar receita`

            callback();
        });
    },
    put(data, callback){
        const query = `UPDATE recipes SET
            chef_id = ($1),
            image = ($2),
            title = ($3),
            information = ($4),
            ingredients = ($5),
            preparation = ($6)
        WHERE id = $7
        `

        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.information,
            data.ingredients,
            data.preparation,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Erro ao atualizar receita`
            
            callback();
        });
    },
    delete(id, callback){
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results){
            if(err) throw `Erro ao deletar receita`;

            callback();
        });
    }
}