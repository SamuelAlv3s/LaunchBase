const blocks = document.querySelectorAll('.blocks');

for (let block of blocks) {

    const span = block.querySelector('span');
    const content = block.querySelector('.content');

    span.addEventListener('click', function () {

        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            span.innerHTML = 'Esconder';
        } else {
            content.classList.add('hidden');
            span.innerHTML = 'Exibir';
        }

    });
}
