const Teacher = require('../models/Teacher');
const { age, graduation, date } = require('../../lib/utils');
const Intl = require('intl');

module.exports = {
    index(req, res) {

        let {filter, page, limit} = req.query;

        page = page || 1;
        limit = limit || 2;
        let offset = limit *(page-1);

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers){

                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    page
                }

                return res.render('teachers/index', {teachers, pagination, filter});
            }
        }

        Teacher.paginate(params);
        
    },
    show(req, res) {
        Teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send('Teacher not Found');

            teacher.birth = age(teacher.birth);
            teacher.schooling =  graduation(teacher.schooling);
            teacher.acting = teacher.acting.split(',');
            teacher.created_at = new Intl.DateTimeFormat('pt-BR').format(teacher.created_at);

            return res.render(`teachers/show`, {teacher});
        });
        
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Preencha todos os campos');
            }
        }

        Teacher.post(req.body, function(teacher){
            return res.redirect(`/teachers`);
        })
    },
    edit(req, res){
        Teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send('Teacher not Found');

            teacher.birth = date(teacher.birth).iso;
            teacher.acting = teacher.acting.split(',');

            return res.render(`teachers/edit`, {teacher});
        });
    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Preencha todos os campos');
            }
        }
        
        Teacher.put(req.body, function(){
            return res.redirect(`teachers/`);
        });
    },
    delete(req, res) {
        Teacher.delete(req.body.id, function(){
            return res.redirect('teachers/');
        });
    }
}




