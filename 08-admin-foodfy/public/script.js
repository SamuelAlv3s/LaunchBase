const cards = document.querySelectorAll('.card');
const blocks = document.querySelectorAll('.block');

for (let card of cards) {
    card.addEventListener('click', function () {
        const tipoLanche = card.getAttribute('id');
        window.location.href = `/receita/${tipoLanche}`;
    });
}

for (let block of blocks) {
    const btn = block.querySelector('.btn-close');
    const info = block.querySelector('.info');

    btn.addEventListener('click', function () {
        if (info.classList.contains('hidden')) {
            info.classList.remove('hidden');
            btn.innerHTML = 'Esconder';
        }
        else {
            info.classList.add('hidden');
            btn.innerHTML = 'Mostrar';
        }
    });
}

function addIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");

    // realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    // não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;

    // Deixa o valor do input vazio
    newField.children[0].value = ""
    ingredients.appendChild(newField);
}

document
    .querySelector('.add-ingredient')
    .addEventListener('click', addIngredient);


    function addStap() {
        const staps = document.querySelector("#staps");
        const fieldContainer = document.querySelectorAll(".preparation");
    
        // realiza um clone do último ingrediente adicionado
        const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
    
        // não adiciona um novo input se o último tem um valor vazio
        if (newField.children[0].value == "") return false;
    
        // Deixa o valor do input vazio
        newField.children[0].value = ""
        staps.appendChild(newField);
    }
    
    document
        .querySelector('.add-stap')
        .addEventListener('click', addStap);
    


