export class formPost {
    constructor(idForm, idTextarea, idFileInput, previewContainerId) {
        this.form = document.getElementById(idForm);
        this.textarea = document.getElementById(idTextarea);
        this.fileInput = document.getElementById(idFileInput);
        this.ulPost = document.querySelector('section.feed');
        this.selectedImages = []; // Armazena múltiplas imagens
        this.previewContainer = document.getElementById(previewContainerId); // Elemento para pré-visualização
        this.addSubmit();
        this.addFileInputHandler();
    }

    /* Função para gerenciar a inserção de várias imagens */
    addFileInputHandler() {
        this.fileInput.addEventListener("change", (event) => {
            const files = event.target.files; // Múltiplos arquivos
            this.selectedImages = []; // Limpa as imagens selecionadas anteriormente
            this.previewContainer.innerHTML = ""; // Limpa o preview anterior

            Array.from(files).forEach(file => {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.selectedImages.push(e.target.result); // Armazenar cada imagem
                        
                        // Criar elemento de imagem para o preview
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

            // Mostrar o container de preview se houver imagens
            if (files.length > 0) {
                this.previewContainer.style.display = 'block';
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
                        <img src="/SocialPet/src/images/assets/dog-tyson.jpeg" class="img-user-post" alt="Foto de perfil">
                        <div class="user-info">
                            <h3>Gustavo Lima</h3>
                            <p>${time}</p>
                        </div>
                    </div>
                    <div class="post-content">
                        <p>${this.textarea.value}</p>
                `;

                // Adicionar cada imagem selecionada ao conteúdo do post
                if (this.selectedImages.length > 0) {
                    this.selectedImages.forEach(image => {
                        postContent += `<img src="${image}" alt="Imagem da postagem" style="max-width: 100%; max-height: 300px; object-fit: contain; margin-top: 10px;">`;
                    });
                }

                postContent += `</div>
                    <div class="post-actions">
                        <button type="button" class="files-post like"><img src="/SocialPet/src/assets/images/paw.svg" alt="Curtir"><span>Curtir</span></button>
                        <button type="button" class="files-post direct"><img src="/SocialPet/src/assets/images/direct.svg" alt="Comentar"><span>Comentar</span></button>
                        <button type="button" class="files-post share"><img src="/SocialPet/src/assets/images/share.svg" alt="Compartilhar"><span>Compartilhar</span></button>
                    </div>
                `;

                newPost.innerHTML = postContent;

                this.ulPost.append(newPost);
                this.textarea.value = "";
                this.previewContainer.innerHTML = ""; // Limpa o preview após o post
                this.previewContainer.style.display = 'none'; // Esconder o container de preview
                this.selectedImages = []; // Resetar as imagens selecionadas

            } else {
                alert('Verifique o campo digitado.');
            }
        };

        this.onSubmit(handleSubmit);
    }
}

// Desktop
const postFormDesktop = new formPost('formPost', 'textarea', 'uploadImageInput', 'selectedImagePreview');
document.getElementById("btnUploadImage").addEventListener("click", () => {
    document.getElementById("uploadImageInput").click();
});

// Mobile
const postFormMobile = new formPost('formPostMobile', 'textareaMobile', 'uploadImageInputMobile', 'selectedImagePreviewMobile');
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