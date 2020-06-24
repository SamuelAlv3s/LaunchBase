module.exports = {
    age: function(timestamp){

        const today = new Date();
        const birth = new Date(timestamp);

        let age = today.getFullYear() - birth.getFullYear();
        const month = today.getMonth() - birth.getMonth();

        if(month < 0 || today.getDate() < birth.getDate()){
            age = age -1;
        }

        return age;
    },

    graduation: function(select){
        if(select == 'EM'){
            return 'Ensino médio';
        }
        else if(select == 'ES'){
            return 'Ensino Superior';
        }
        else if(select == 'M&D'){
            return 'Mestrado e/ou Doutorado';
        }
    },

    date: function(timestamp){

        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        
        return {
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        };
    },

    schoolyear: function(select){
        if(select == '5EF'){
            return '5º ano do Ensino Fundamental'
        }
        else if(select == '6EF'){
            return '6º ano do Ensino Fundamental'
        }
        else if(select == '7EF'){
            return '7º ano do Ensino Fundamental'
        }
        else if(select == '8EF'){
            return '8º ano do Ensino Fundamental'
        }
        else if(select == '9EF'){
            return '9º ano do Ensino Fundamental'
        }
        else if(select == '1EM'){
            return '1º ano do Ensino Médio'
        }
        else if(select == '2EM'){
            return '2º ano do Ensino Médio'
        }
        else if(select == '2EM'){
            return '3º ano do Ensino Médio'
        }
    }
}