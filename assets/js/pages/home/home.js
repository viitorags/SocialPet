// Seleciona elementos do DOM
const form = document.getElementById('formPost');
const textarea = document.getElementById('textarea');
const fileInput = document.getElementById('uploadImageInput');
const btnUploadImage = document.getElementById('btnUploadImage'); // Seleciona o botão de upload
const ulPost = document.querySelector('section.feed');
const previewContainer = document.getElementById('selectedImagePreview');
let selectedImages = [];

// Função para validar o campo de texto
const formValidate = (value) => value && value.trim().length >= 3;

// Função para obter a hora atual
const getTime = () => {
    const time = new Date();
    return `${time.getHours()}h ${time.getMinutes()}min`;
};

// Função para gerar números aleatórios em um intervalo
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Função para gerenciar a inserção de várias imagens
const addFileInputHandler = () => {
    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        selectedImages = [];
        previewContainer.innerHTML = "";

        Array.from(files).forEach((file) => {
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    selectedImages.push(e.target.result);
                    const imgElement = document.createElement('img');
                    imgElement.src = e.target.result;
                    imgElement.style.maxWidth = "100%";
                    imgElement.style.maxHeight = "300px";
                    imgElement.style.objectFit = "contain";
                    imgElement.style.borderRadius = "8px";
                    imgElement.style.marginTop = "10px";
                    previewContainer.appendChild(imgElement);
                };
                reader.readAsDataURL(file);
            }
        });

        if (files.length > 0) previewContainer.style.display = 'block';
    });
};

// Função para abrir o seletor de arquivos ao clicar no botão de upload
const addUploadButtonHandler = () => {
    btnUploadImage.addEventListener('click', () => {
        fileInput.click(); // Aciona o seletor de arquivos
    });
};

// Função para gerenciar o envio do formulário
const addSubmitHandler = () => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (formValidate(textarea.value)) {
            const time = getTime();
            const newPost = document.createElement('article');
            newPost.classList.add('post');

            // Gera números aleatórios para Curtir, Comentar e Compartilhar
            const likes = getRandomNumber(1, 10);
            const comments = getRandomNumber(100, 525);
            const shares = getRandomNumber(50, 150);

            let postContent = `
                <div class="post-header">
                    <img src="/assets/images/pages/home/77fb45d1b36125547c4c2bf0640252b3.jpg" class="img-user-post" alt="Foto de perfil">
                    <div class="user-info">
                        <h3>Gustavo Lima</h3>
                        <p>${time}</p>
                    </div>
                </div>
                <div class="post-content">
                    <p>${textarea.value}</p>
            `;

            if (selectedImages.length >= 0) {
                selectedImages.forEach((image) => {
                    postContent += `<img src="${image}" alt="Imagem da postagem" style="max-width: 100%; max-height: 400px; object-fit: contain; margin-top: 10px;">`;
                });
            }

            postContent += `
                </div>
                <div class="post-actions">
                    <button type="button" class="files-post like"><img src="/assets/images/pages/home/icons/paw.svg" alt="Curtir"><span>${likes}k</span></button>
                    <button type="button" class="files-post direct"><img src="/assets/images/pages/home/icons/direct.svg" alt="Comentar"><span>${comments}</span></button>
                    <button type="button" class="files-post share"><img src="/assets/images/pages/home/icons/share.svg" alt="Compartilhar"><span>${shares}</span></button>
                </div>
            `;

            newPost.innerHTML = postContent;
            ulPost.append(newPost);
            textarea.value = "";
            previewContainer.innerHTML = "";
            previewContainer.style.display = 'none';
            selectedImages = [];

        } else {
            alert('Verifique o campo digitado. O texto deve ter pelo menos 3 caracteres.');
        }
    });
};

// Chama as funções de gerenciamento
addFileInputHandler();
addUploadButtonHandler(); // Adiciona o manipulador de clique no botão de upload
addSubmitHandler();
