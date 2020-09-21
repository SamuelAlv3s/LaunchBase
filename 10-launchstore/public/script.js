const Mask = {
    apply(input, func){
        setTimeout(function(){
            input.value = Mask[func](input.value);
        }, 1);
    },
    formatBRL(value){
        value = value.replace(/\D/g, '');

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100);

    }
}

const photosUpload = {
    input: "",
    uploadLimit: 6,
    preview: document.querySelector('#photos-preview'),
    files: [],
    handleFileInput(event){
        const {files: fileList} = event.target;
        photosUpload.input = event.target;
        
        if(photosUpload.hasLimit(event)) return


        Array.from(fileList).forEach(file =>{

            photosUpload.files.push(file);

             const reader = new FileReader();

             reader.onload = () =>{
                const image = new Image();
                image.src = String(reader.result);

                const div = photosUpload.getContainer(image);

                photosUpload.preview.appendChild(div);
                
             }

             reader.readAsDataURL(file)
        });

        photosUpload.input.files = photosUpload.getAllFiles();
    },
    getContainer(image){
        const div = document.createElement('div');
                div.classList.add('photo');

                div.onclick = photosUpload.removePhoto;

                div.appendChild(image);

                div.appendChild(photosUpload.getRemoveButton());

                return div;
    },
    hasLimit(event){
        const {uploadLimit, input, preview} = photosUpload;
        const {files: fileList} = input;
        if(fileList.length > uploadLimit){
            alert(`Envie no máximo ${uploadLimit} fotos`);
            event.preventDefault();
            return true;
        }

        const photosDiv = [];
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo"){
                photosDiv.push(item);
            }
        });

        const totalPhotos = fileList.length + photosDiv.length;
        if(totalPhotos > uploadLimit){
            alert('Você atingiu o limite máximo de fotos');
            preventDefault();
            return true;
        }
        return false;
    },
    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData ||new DataTransfer();

        photosUpload.files.forEach(files => dataTransfer.items.add(files));

        return dataTransfer.files;
    },
    getRemoveButton(){
        const button = document.createElement('i');
        button.classList.add('material-icons');
        button.innerHTML = "close";
        return button;
    },
    removePhoto(event){
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(photosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv);

        photosUpload.files.splice(index, 1);
        photosUpload.input.files = photosUpload.getAllFiles();

        photoDiv.remove();
    },
    removeOldPhoto(event){
        const photoDiv = event.target.parentNode;

        if(photoDiv.id){
            const removedFiles = document.querySelector('input[name="removed_files"]');
            if(removedFiles){
                removedFiles.value += `${photoDiv.id},`
            }
        }
        photoDiv.remove()
    }
}

const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(event){
        const { target } = event;

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'));
        target.classList.add('active');

        ImageGallery.highlight.src = target.src;
        LightBox.image.src = target.src;
    }
}

const LightBox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
    open(){
        LightBox.target.style.opacity = 1;
        LightBox.target.style.top = 0;
        LightBox.target.style.bottom = 0;
        LightBox.closeButton.style.top = 0;
    },
    close(){
        LightBox.target.style.opacity = 1;
        LightBox.target.style.top = "-100%";
        LightBox.target.style.bottom = "initial";
        LightBox.closeButton.style.top = "-80px";
    }
}