

function addIngredient(){
    const ingredients = document.querySelector('#ingredients');
    const container = document.querySelectorAll('#ingredient');

    const newField = container[container.length - 1].cloneNode(true);

    if(newField.children[0].value == '') return false;

    newField.children[0].value = '';
    ingredients.appendChild(newField);
}

document.querySelector('fieldset .btn-add-ingredient')
    .addEventListener('click', addIngredient);

    function addStap(){
        const staps = document.querySelector('#staps');
        const container = document.querySelectorAll('#stap');
    
        const newField = container[container.length - 1].cloneNode(true);
    
        if(newField.children[0].value == '') return false;
    
        newField.children[0].value = '';
        staps.appendChild(newField);
    }
    
    document.querySelector('fieldset .btn-add-stap')
        .addEventListener('click', addStap);