const { date } = require('../../lib/utils');

const db = require('../../config/db');

module.exports = {
    all(callback){
        db.query('SELECT * FROM students ORDER BY name ASC', function(err, results){
            if(err) throw `Error ${err}`

            callback(results.rows);
        });
    },
    find(id, callback){
        db.query(`SELECT students.*, teachers.name AS teacher_name  
                    FROM students
                    LEFT JOIN teachers ON (students.teacher_id = teachers.id)
                    WHERE students.id = $1`, [id], function(err, results){
            if(err) throw `Error ${err}`

            callback(results.rows[0]);
        });
    },
    post(data, callback){
        const query = `
            INSERT INTO students (
                url_avatar,
                name,
                birth,
                email,
                schoolyear,
                workload,
                teacher_id
            ) VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.url_avatar,
            data.name,
            date(data.birth).iso,
            data.email,
            data.schoolyear,
            data.workload,
            data.teacher
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Error ${err}`;

            callback(results.rows[0]);
        });
    },
    put(data, callback){

        const query = `
            UPDATE students SET
                url_avatar = ($1),
                name = ($2),
                birth = ($3),
                email = ($4),
                schoolyear = ($5),
                workload = ($6),
                teacher_id = ($7)
            WHERE id = $8
        `

        const values = [
            data.url_avatar,
            data.name,
            date(data.birth).iso,
            data.email,
            data.schoolyear,
            data.workload,
            data.teacher,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Error ${err}`;

            callback();
        });
    },
    delete(id, callback){
        db.query(`DELETE  FROM students WHERE id = $1`, [id], function(err, results){
            if(err) throw `Error ${err}`;

            callback();
        })
    },
    teacherSelectOptions(callback){
        db.query(`SELECT name, id FROM teachers`, function(err, results){
            if(err) throw `Error ${err}`;

            callback(results.rows);
        })
    },
    paginate(params){
        const {filter, limit, offset, callback} = params


        let query = ``,
            filterQuery = ``,
            totalQuery = `(SELECT COUNT(*) FROM students) AS total`;


        if(filter){

            filterQuery = ` 
                WHERE students.name ILIKE '%${filter}%'
                OR students.email ILIKE '%${filter}%'
            `
            totalQuery = `
                (SELECT COUNT(*) FROM students ${filterQuery}) AS total
            `
        }

        query = `
            SELECT students.*, ${totalQuery}
            FROM students
            ${filterQuery}
            LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `Error ${err}`;

            callback(results.rows);
        });
    }
}