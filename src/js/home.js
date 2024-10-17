export class FormPost {
    constructor(idForm, idTextarea, idFileInput, previewContainerId) {
        this.form = document.getElementById(idForm);
        this.textarea = document.getElementById(idTextarea);
        this.fileInput = document.getElementById(idFileInput);
        this.ulPost = document.querySelector('section.feed');
        this.selectedImages = [];
        this.previewContainer = document.getElementById(previewContainerId);

        this.addSubmit();
        this.addFileInputHandler();
    }

    /* Função para gerenciar a inserção de várias imagens */
    addFileInputHandler = () => {
        this.fileInput.addEventListener("change", (event) => {
            const files = event.target.files;
            this.selectedImages = [];
            this.previewContainer.innerHTML = "";

            Array.from(files).forEach(file => {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.selectedImages.push(e.target.result);
                        const imgElement = document.createElement('img');
                        imgElement.src = e.target.result;
                        imgElement.style.maxWidth = "100%";
                        imgElement.style.maxHeight = "300px";
                        imgElement.style.objectFit = "contain";
                        imgElement.style.borderRadius = "8px";
                        imgElement.style.marginTop = "10px";
                        this.previewContainer.appendChild(imgElement);
                    };
                    reader.readAsDataURL(file);
                }
            });

            if (files.length > 0) this.previewContainer.style.display = 'block';
        });
    };

    onSubmit = (func) => {
        this.form.addEventListener('submit', func);
    };

    formValidate = (value) => value && value.length >= 3;

    getTime = () => {
        const time = new Date();
        return `${time.getHours()}h ${time.getMinutes()}min`;
    };

    addSubmit = () => {
        this.onSubmit((event) => {
            event.preventDefault();

            if (this.formValidate(this.textarea.value)) {
                const time = this.getTime();
                const newPost = document.createElement('article');
                newPost.classList.add('post');

                let postContent = `
                    <div class="post-header">
                        <img src="/SocialPet/src/assets/images/77fb45d1b36125547c4c2bf0640252b3" class="img-user-post" alt="Foto de perfil">
                        <div class="user-info">
                            <h3>Gustavo Lima</h3>
                            <p>${time}</p>
                        </div>
                    </div>
                    <div class="post-content">
                        <p>${this.textarea.value}</p>
                `;

                if (this.selectedImages.length > 0) {
                    this.selectedImages.forEach(image => {
                        postContent += `<img src="${image}" alt="Imagem da postagem" style="max-width: 100%; max-height: 400px; object-fit: contain; margin-top: 10px;">`;
                    });
                }

                postContent += `
                    </div>
                    <div class="post-actions">
                        <button type="button" class="files-post like"><img src="/SocialPet/src/assets/icons/paw.svg" alt="Curtir"><span>Curtir</span></button>
                        <button type="button" class="files-post direct"><img src="/SocialPet/src/assets/icons/direct.svg" alt="Comentar"><span>Comentar</span></button>
                        <button type="button" class="files-post share"><img src="/SocialPet/src/assets/icons/share.svg" alt="Compartilhar"><span>Compartilhar</span></button>
                    </div>
                `;

                newPost.innerHTML = postContent;
                this.ulPost.append(newPost);
                this.textarea.value = "";
                this.previewContainer.innerHTML = "";
                this.previewContainer.style.display = 'none';
                this.selectedImages = [];
            } else {
                alert('Verifique o campo digitado.');
            }
        });
    };
}

// Desktop
const postFormDesktop = new FormPost('formPost', 'textarea', 'uploadImageInput', 'selectedImagePreview');
document.getElementById("btnUploadImage").addEventListener("click", () => {
    document.getElementById("uploadImageInput").click();
});

// Mobile
const postFormMobile = new FormPost('formPostMobile', 'textareaMobile', 'uploadImageInputMobile', 'selectedImagePreviewMobile');
document.getElementById("btnUploadImageMobile").addEventListener("click", () => {
    document.getElementById("uploadImageInputMobile").click();
});

// Modal Mobile
document.querySelector(".form-modal").addEventListener("click", () => {
    const modalElement = document.querySelector(".formMobile");
    if (!modalElement.open) modalElement.showModal();
});

document.querySelector(".close-modal").addEventListener("click", () => {
    document.querySelector(".formMobile").close();
});
