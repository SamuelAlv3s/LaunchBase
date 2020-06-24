const data = require('../data.json')
const fs = require('fs');
const {schoolyear, date} = require('../utils');
const Intl = require('intl');


//index
exports.index = function(req, res){
    return res.render('students/index', {students: data.students});
}
//Create
exports.post = function(req, res){

    const keys = Object.keys(req.body);

    for(key of keys){
        if(req.body[key] == ''){
            return res.send('Preencha todos os campos');
        }
    }

    let {url_avatar, name, birth, email, schoolyear, workload} = req.body;
    birth = Date.parse(req.body.birth);

    const id = 1;
    let lastId = data.students[Number(data.students.length -1)];

    if(lastId){
        id = lastId.id + 1;
    }
    

    data.students.push({
        id,
        url_avatar,
        name,
        birth,
        email,
        schoolyear,
        workload
    });

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error');

        return res.redirect('/students');
    });
}

//Show
exports.show = function(req, res){
    const {id} = req.params;

    const foundStudent = data.students.find(function(student){
        return student.id == id;
    });

    if(!foundStudent){
        return res.send('Students not Found');
    }

    const student = {
        ...foundStudent,
        schoolyear: schoolyear(foundStudent.schoolyear),
        birth: date(foundStudent.birth).birthDay

    }

    return res.render('students/show', {student});
}

//Edit
exports.edit = function(req, res){
    const {id} = req.params;

    const foundStudent = data.students.find(function(student){
        return student.id == id;
    });

    if(!foundStudent){
        return res.send('Students not Found');
    }

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render('students/edit', {student});

}

//put
exports.put = function(req, res){
    const {id} = req.body;
    let index = 0;

    const foundStudent = data.students.find(function(student, foundIndex){
        if(id == student.id){
            index = foundIndex;
            return true;
        }
    });

    if(!foundStudent){
        return res.send('Students not Found');
    }

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error');

        return res.redirect(`/students/${id}/show`);
    });

}

//delete
exports.delete = function(req, res){
    const {id} = req.body;

    const filteredStudents = data.students.filter(function(student){
        return student.id != id;
    });

    data.students = filteredStudents;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error');

        return res.redirect('/students');
    });
    
}