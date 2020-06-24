const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const close = document.querySelector('.modal-close');
const modal = document.querySelector('.modal');


for(let card of cards){
    card.addEventListener('click', function(){
        const tipoLanche = card.getAttribute('id');
        modal.querySelector('img').src = `${tipoLanche}`;
        modal.querySelector('h1').innerText = card.querySelector('h2').innerText;
        modal.querySelector('p').innerText = card.querySelector('p').innerText;
        modalOverlay.classList.add('active');
    });
}

close.addEventListener('click', function(){
    modalOverlay.classList.remove('active');
});
