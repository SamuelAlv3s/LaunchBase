const photosUpload = {
    input: "",
    preview: document.querySelector('.photos-preview'),
    uploadLimit: 5,
    preview: document.querySelector('.photos-preview'),
    files: [],
    handleFileInput(event){
        const {files: filelist} = event.target;
        photosUpload.input = event.target;

        if(this.hasLimit(event)) return;

        Array.from(filelist).forEach(file => {

            photosUpload.files.push(file);

            const reader = new FileReader();

            reader.onload = () => {
                const image = new Image();
                image.src = String(reader.result);

                photosUpload.preview.appendChild(this.getContainer(image));
            }

            reader.readAsDataURL(file)
        });

        photosUpload.input.files = photosUpload.getAllFiles();
    },
    getContainer(image){
        const div = document.createElement('div');
                div.classList.add('photo');

                div.appendChild(image);
                div.appendChild(photosUpload.getRemoveButton());

                div.onclick = photosUpload.removePhoto;

                return div;
    },
    getRemoveButton(){
        const button = document.createElement('i');
        button.classList.add('material-icons');
        button.innerHTML = "close";

        return button;
    },
    hasLimit(event){
        //no minimo uma imagem e no máximo 5
        const { uploadLimit, input, preview } = photosUpload;
        const {files: fileList} = input;

        if(fileList.length > uploadLimit){
            alert(`Envie no máximo ${uploadLimit} arquivos`);
            event.preventDefault();
            return true;
        }

        const photosDiv = [];
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo")
                photosDiv.push(item);
        });

        const totalPhotos = fileList.length + photosDiv.length;

        if(totalPhotos > uploadLimit){
            alert("Você Atingiu o limite máximo de fotos");
            event.preventDefault();
            return true;
        }

        return false;
    },
    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        photosUpload.files.forEach(file => dataTransfer.items.add(file));

        return dataTransfer.files;
    },
    removePhoto(event){
        const photoDiv = event.target.parentNode;
        const photosArray = Array.from(photosUpload.preview.children);
        const index = photosArray.indexOf(photoDiv);

        photosUpload.files.splice(index, 1);
        photosUpload.input.files = photosUpload.getAllFiles();
        photoDiv.remove();
    }
}