const { date, graduation } = require('../../lib/utils');

const db = require('../../config/db');

module.exports = {
    all(callback){
        db.query(`SELECT teachers.*, count(students) AS total_students 
                    FROM teachers 
                    LEFT JOIN students ON (teachers.id = students.teacher_id)
                    GROUP BY teachers.id
                    ORDER BY total_students DESC`, function(err, results){
            if(err) throw `Error ${err}`

            callback(results.rows);
        });
    },
    find(id, callback){
        db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function(err, results){
            if(err) throw `Error ${err}`

            callback(results.rows[0]);
        });
    },
    findBy(filter, callback){
        db.query(`SELECT teachers.*, count(students) AS total_students 
                    FROM teachers 
                    LEFT JOIN students ON (teachers.id = students.teacher_id)
                    WHERE teachers.name ILIKE '%${filter}%'
                    OR teachers.acting ILIKE '%${filter}%'
                    GROUP BY teachers.id
                    ORDER BY total_students DESC`, function(err, results){
            if(err) throw `Error ${err}`

            callback(results.rows);
        });
    },
    post(data, callback){
        const query = `
            INSERT INTO teachers (
                url_avatar,
                name,
                birth,
                schooling,
                type_class,
                acting,
                created_at
            ) VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.url_avatar,
            data.name,
            date(data.birth).iso,
            graduation(data.schooling),
            data.type_class,
            data.acting,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Error ${err}`

            callback(results.rows[0]);
        });
    },
    put(data, callback){

        const query = `
            UPDATE teachers SET
                url_avatar = ($1),
                name = ($2),
                birth = ($3),
                schooling = ($4),
                type_class = ($5),
                acting = ($6)
            WHERE id = $7
        `

        const values = [
            data.url_avatar,
            data.name,
            date(data.birth).iso,
            data.schooling,
            data.type_class,
            data.acting,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Error ${err}`;

            callback();
        });
    },
    delete(id, callback){
        db.query(`DELETE  FROM teachers WHERE id = $1`, [id], function(err, results){
            if(err) throw `Error ${err}`;

            callback();
        })
    },
    paginate(params){
        const {filter, limit, offset, callback} = params


        let query = ``,
            filterQuery = ``,
            totalQuery = `(SELECT COUNT(*) FROM teachers) AS total`;


        if(filter){

            filterQuery = ` 
                WHERE teachers.name ILIKE '%${filter}%'
                OR teachers.acting ILIKE '%${filter}%'
            `
            totalQuery = `
                (SELECT COUNT(*) FROM teachers ${filterQuery}) AS total
            `
        }

        query = `
            SELECT teachers.*, ${totalQuery}, COUNT(students) AS total_students
            FROM teachers
            LEFT JOIN students ON (teachers.id = students.teacher_id)
            ${filterQuery}
            GROUP BY teachers.id LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `Error ${err}`;

            callback(results.rows);
        });
    }
    }
