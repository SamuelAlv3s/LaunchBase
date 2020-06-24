const card = document.querySelectorAll('.card');
const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');

for(let cards of card){
    cards.addEventListener('click', function(){
        const paginas = cards.getAttribute('id');
        window.location.href = `/cursos?id=${paginas}`;
    });
}





