const fs = require('fs');
const data = require('../data.json');
const {date} = require('../utils');
const Intl = require('intl')

//index
exports.index = function(req, res){

    return res.render('members/index', {members: data.members})
}

//create
exports.create = function(req, res){
    return res.render('members/create');
}
//create(post)
exports.post = function(req, res){

    const keys = Object.keys(req.body);

    for(key of keys){
        if(req.body[key] == ""){
            return res.send('Preencha todos os campos');
        }
    }


    let {avatar_url, birth, name, email, gender, blood, weigth, heigth} = req.body;

    birth = Date.parse(req.body.birth);

    let id = 1;
    const lastId = data.members[Number(data.members.length - 1)];

    if(lastId){
        id = lastId.id + 1;
    }

    data.members.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        email,
        blood,
        weigth,
        heigth,
    });


    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error');

            return res.redirect(`/members/${id}`);
        
    });

    //return res.send(req.body);
}

//show
exports.show = function(req, res){

    const {id} = req.params;

    const foundMember = data.members.find(function(member){
        return member.id == id;
    });

    if(!foundMember){
        return res.send('Member not found');
    }

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay
    }

    return res.render('members/show', {member});
}

//edit
exports.edit = function(req, res){
    const {id} = req.params;
  
    const foundMember = data.members.find(function(member){
      return member.id == id;
    })
  
    if(!foundMember) return res.send("Not found member");
  
  const member ={
    ...foundMember,
    birth: date(foundMember.birth).iso
  }
  
    return res.render('members/edit', {member});
}

//put
exports.put = function(req, res){
    const {id} = req.body;
    let index = 0;
  
    const foundMember = data.members.find(function(member, foundIndex){
      if(id == member.id){
          index = foundIndex;
          return true;
      }
    })
  
    if(!foundMember) return res.send("Not found member");

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error');

        return res.redirect(`/members/${id}`);
    });

    
}

//delete
exports.delete = function(req, res){
    const {id} = req.body;

    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    });

    data.members = filteredMembers;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error');

        return res.redirect('/members');
    });
}

