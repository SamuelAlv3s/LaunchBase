const cards = document.querySelectorAll('.card');
const blocks = document.querySelectorAll('.block');

for(let card of cards){
    card.addEventListener('click', function(){
        const tipoLanche = card.getAttribute('id');
        window.location.href = `/receita/${tipoLanche}`;
    });
}

for(let block of blocks){
    const btn = block.querySelector('.btn-close');
    const info = block.querySelector('.info');

    btn.addEventListener('click', function(){
        if(info.classList.contains('hidden')){
            info.classList.remove('hidden');
            btn.innerHTML = 'Esconder';
        }
        else{
            info.classList.add('hidden');
            btn.innerHTML = 'Mostrar';
        }
    });
}





