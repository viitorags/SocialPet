export class formPost {
    constructor(idForm, idTextarea, idFileInput) {
        this.form = document.getElementById(idForm);
        this.textarea = document.getElementById(idTextarea);
        this.fileInput = document.getElementById(idFileInput);
        this.ulPost = document.querySelector('section.feed');
        this.selectedImage = null; // Armazena a imagem selecionada
        this.addSubmit();
        this.addFileInputHandler();
    }

    /* Função para gerenciar o upload de imagem */
    addFileInputHandler() {
        this.fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.selectedImage = e.target.result; // Armazena o conteúdo da imagem
                };
                reader.readAsDataURL(file);
            }
        });
    }

    onSubmit(func) {
        this.form.addEventListener('submit', func);
    }

    /* Validação de campo de texto vazio ou menor que 3 */
    formValidate(value) {
        return value && value.length >= 3;
    }

    /* Função para obter a data atual */ 
    getTime() {
        const time = new Date();
        const hour = time.getHours();
        const minutes = time.getMinutes();
        return `${hour}h ${minutes}min`;
    }

    /* Função para o botão publicar (botão submit) */
    addSubmit() {
        const handleSubmit = (event) => {
            event.preventDefault();
            if (this.formValidate(this.textarea.value)) {
                const time = this.getTime();
                const newPost = document.createElement('article');
                newPost.classList.add('post');

                /* Conteúdo da postagem dinâmica */
                let postContent = `
                    <div class="post-header">
                        <img src="./src/img/dog-tyson.jpeg" class="img-user-post" alt="Foto de perfil">
                        <div class="user-info">
                            <h3>Gustavo Lima</h3>
                            <p>${time}</p>
                        </div>
                    </div>
                    <div class="post-content">
                        <p>${this.textarea.value}</p>
                `;

                if (this.selectedImage) {
                    postContent += `<img src="${this.selectedImage}" alt="Imagem da postagem">`;
                }

                postContent += `</div>
                    <div class="post-actions">
                        <button type="button" class="files-post like"><img src="./src/img/paw.svg" alt="Curtir"><span>Curtir</span></button>
                        <button type="button" class="files-post direct"><img src="./src/img/direct.svg" alt="Comentar"><span>Comentar</span></button>
                        <button type="button" class="files-post share"><img src="./src/img/share.svg" alt="Compartilhar"><span>Compartilhar</span></button>
                    </div>
                `;

                newPost.innerHTML = postContent;
                
                this.ulPost.append(newPost);
                this.textarea.value = "";
                this.selectedImage = null; // Resetar a imagem selecionada

            } else {
                alert('Verifique o campo digitado.');
            }
        };

        this.onSubmit(handleSubmit);
    }
}

// Desktop
const postFormDesktop = new formPost('formPost', 'textarea', 'uploadImageInput');
document.getElementById("btnUploadImage").addEventListener("click", () => {
    document.getElementById("uploadImageInput").click();
});

// Mobile
const postFormMobile = new formPost('formPostMobile', 'textareaMobile', 'uploadImageInputMobile');
document.getElementById("btnUploadImageMobile").addEventListener("click", () => {
    document.getElementById("uploadImageInputMobile").click();
});

// Modal Mobile
const openModalButton = document.querySelector(".form-modal");
const modalElement = document.querySelector(".formMobile");
const closeModalButton = document.querySelector(".close-modal");

openModalButton.addEventListener("click", () => {
    if (!modalElement.open) {
        modalElement.showModal();
    }
});

closeModalButton.addEventListener("click", () => {
    modalElement.close();
});
