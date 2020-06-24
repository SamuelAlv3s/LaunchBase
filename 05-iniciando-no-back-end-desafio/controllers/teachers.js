const data = require('../data.json')
const fs = require('fs');
const {age, graduation, date} = require('../utils');
const Intl = require('intl');


//index
exports.index = function(req, res){
    return res.render('teachers/index', {teachers: data.teachers});
}
//Create
exports.post = function(req, res){

    const keys = Object.keys(req.body);

    for(key of keys){
        if(req.body[key] == ''){
            return res.send('Preencha todos os campos');
        }
    }

    let {url_avatar, name, birth, schooling, type_class, acting} = req.body;
    birth = Date.parse(req.body.birth);
    const id = Number(data.teachers.length + 1);
    const created_at = Date.now();

    data.teachers.push({
        id,
        url_avatar,
        name,
        birth,
        schooling,
        type_class,
        acting,
        created_at
    });

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error');

        return res.redirect('/teachers');
    });
}

//Show
exports.show = function(req, res){
    const {id} = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id;
    });

    if(!foundTeacher){
        return res.send('Teachers not Found');
    }

    const teacher = {
        ...foundTeacher,
        birth: age(foundTeacher.birth),
        schooling: graduation(foundTeacher.schooling),
        acting: foundTeacher.acting.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
    }

    return res.render('teachers/show', {teacher});
}

//Edit
exports.edit = function(req, res){
    const {id} = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id;
    });

    if(!foundTeacher){
        return res.send('Teachers not Found');
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render('teachers/edit', {teacher});

}

//put
exports.put = function(req, res){
    const {id} = req.body;
    let index = 0;

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if(id == teacher.id){
            index = foundIndex;
            return true;
        }
    });

    if(!foundTeacher){
        return res.send('Teachers not Found');
    }

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error');

        return res.redirect(`/teachers/${id}/show`);
    });

}

//delete
exports.delete = function(req, res){
    const {id} = req.body;

    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id;
    });

    data.teachers = filteredTeachers;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error');

        return res.redirect('/teachers');
    });
    
}