const card = document.querySelectorAll('.card');
const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
for(let cards of card){
    cards.addEventListener('click', function(){
        const paginas = cards.getAttribute('id');
        modalOverlay.classList.add('active');
        modalOverlay.querySelector('iframe').src = `https://rocketseat.com.br/${paginas}`
    });
}
document.querySelector('.modal-close').addEventListener('click',function(){
    modalOverlay.classList.remove('active');
    modal.classList.remove('maximize');
});

document.querySelector('.modal-full').addEventListener('click', function () {
    if(modal.classList.contains('maximize')){
        modal.classList.remove('maximize');
    }
    else{
        modal.classList.add('maximize');
    }
});


