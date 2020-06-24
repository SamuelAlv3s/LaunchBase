const Student = require('../models/Student');
const { age, schoolyear, date } = require('../../lib/utils');
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
            callback(students){

                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }

                return res.render('students/index', {students, pagination, filter});
            }
        }

        Student.paginate(params);
    },
    create(req, res){

        Student.teacherSelectOptions(function(options){
            return res.render('students/create', {options});
        });
    },
    show(req, res) {
        Student.find(req.params.id, function(student){
            if(!student) return res.send('Student not Found');

            student.birth = date(student.birth).birthDay;
            student.schoolyear = schoolyear(student.schoolyear);

            return res.render(`students/show`, {student});
        });
        
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Preencha todos os campos');
            }
        }

        Student.post(req.body, function(student){
            return res.redirect(`/students`);
        })
    },
    edit(req, res){
        Student.find(req.params.id, function(student){
            if(!student) return res.send('Student not Found');

            student.birth = date(student.birth).iso;

            Student.teacherSelectOptions(function(options){
                return res.render(`students/edit`, {student, options});
            });

        });
    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Preencha todos os campos');
            }
        }
        
        Student.put(req.body, function(){
            return res.redirect(`students/`);
        });
    },
    delete(req, res) {
        Student.delete(req.body.id, function(){
            return res.redirect('students/');
        });
    }
}




