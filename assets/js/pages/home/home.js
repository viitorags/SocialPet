// Seleciona elementos do DOM
const form = document.getElementById('formPost');
const textarea = document.getElementById('textarea');
const fileInputImage = document.getElementById('uploadImageInput');
const fileInputGif = document.getElementById('uploadGifInput');
const fileInputVideo = document.getElementById('uploadVideoInput');
const btnUploadImage = document.getElementById('btnUploadImage');
const btnUploadGif = document.getElementById('btnUploadGif');
const btnUploadVideo = document.getElementById('btnUploadVideo');
const ulPost = document.querySelector('section.feed');
const previewContainer = document.getElementById('selectedImagePreview');
let selectedImages = [];
let selectedGifs = [];
let selectedVideos = [];

// Função para adicionar o evento de curtida nos posts
const addLikePost = () => {
    ulPost.addEventListener('click', function (event) {
        const likeButton = event.target.closest('.like');
        if (likeButton) {
            const likeIcon = likeButton.querySelector('.like-icon');
            likeIcon.classList.toggle('liked');
            const likeCountSpan = likeButton.querySelector('span');
            if (likeCountSpan) {
                let likesCount = parseInt(likeCountSpan.textContent.replace('k', ''));
                likesCount = likeIcon.classList.contains('liked') ? likesCount + 1 : likesCount - 1;
                likeCountSpan.textContent = `${likesCount}k`;
            }
        }
    });
};

// Função para validar o campo de texto
const formValidate = (value) => value && value.trim().length >= 3;

// Função para obter a hora atual
const getTime = () => {
    const time = new Date();
    return `${time.getHours()}h ${time.getMinutes()}min`;
};

// Função para gerar números aleatórios em um intervalo
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Função para gerenciar os uploads de imagens, gifs e vídeos
const handleFileSelect = (inputElement, type) => {
    inputElement.addEventListener('change', (event) => {
        const files = event.target.files;
        let selectedFiles = [];
        previewContainer.innerHTML = "";

        Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (type === 'image') {
                    selectedFiles.push(e.target.result);
                    const imgElement = document.createElement('img');
                    imgElement.src = e.target.result;
                    imgElement.style.maxWidth = "100%";
                    imgElement.style.maxHeight = "300px";
                    imgElement.style.objectFit = "contain";
                    imgElement.style.borderRadius = "8px";
                    imgElement.style.marginTop = "10px";
                    previewContainer.appendChild(imgElement);
                } else if (type === 'gif') {
                    selectedFiles.push(e.target.result);
                    const gifElement = document.createElement('img');
                    gifElement.src = e.target.result;
                    gifElement.style.maxWidth = "100%";
                    gifElement.style.maxHeight = "300px";
                    gifElement.style.objectFit = "contain";
                    gifElement.style.borderRadius = "8px";
                    gifElement.style.marginTop = "10px";
                    previewContainer.appendChild(gifElement);
                } else if (type === 'video') {
                    selectedFiles.push(e.target.result);
                    const videoElement = document.createElement('video');
                    videoElement.src = e.target.result;
                    videoElement.style.maxWidth = "100%";
                    videoElement.style.maxHeight = "300px";
                    videoElement.style.objectFit = "contain";
                    videoElement.controls = true; // Adiciona controles de vídeo
                    previewContainer.appendChild(videoElement);
                }
            };
            reader.readAsDataURL(file);
        });

        if (files.length > 0) previewContainer.style.display = 'block';

        // Armazena as imagens, gifs ou vídeos selecionados para o envio posterior
        if (type === 'image') {
            selectedImages = selectedFiles;
        } else if (type === 'gif') {
            selectedGifs = selectedFiles;
        } else if (type === 'video') {
            selectedVideos = selectedFiles;
        }
    });
};

// Função para abrir o seletor de arquivos ao clicar no botão de upload
const addUploadButtonHandler = () => {
    btnUploadImage.addEventListener('click', () => {
        fileInputImage.click();
    });

    btnUploadGif.addEventListener('click', () => {
        fileInputGif.click();
    });

    btnUploadVideo.addEventListener('click', () => {
        fileInputVideo.click();
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
                    <img src="/SocialPet/assets/images/pages/home/77fb45d1b36125547c4c2bf0640252b3.jpg" class="img-user-post" alt="Foto de perfil">
                    <div class="user-info">
                        <h3>rannyara01</h3>
                        <p>${time}</p>
                    </div>
                </div>
                <div class="post-content">
                    <p>${textarea.value}</p>
            `;

            // Adiciona as imagens, gifs ou vídeos selecionados
            selectedImages.forEach((image) => {
                postContent += `<img src="${image}" alt="Imagem da postagem" style="max-width: 100%; max-height: 400px; object-fit: contain; margin-top: 10px;">`;
            });

            selectedGifs.forEach((gif) => {
                postContent += `<img src="${gif}" alt="GIF da postagem" style="max-width: 100%; max-height: 400px; object-fit: contain; margin-top: 10px;">`;
            });

            selectedVideos.forEach((video) => {
                postContent += `<video src="${video}" style="max-width: 100%; max-height: 400px; object-fit: contain; margin-top: 10px;" controls></video>`;
            });

            postContent += `
                </div>
                <div class="post-actions">
                    <button type="button" class="files-post like"><i class="fa fa-paw like-icon"></i><span>${likes}k</span></button>
                    <button type="button" class="files-post direct"><img src="/SocialPet/assets/images/pages/home/icons/direct.svg" alt="Comentar"><span>${comments}</span></button>
                    <button type="button" class="files-post share"><img src="/SocialPet/assets/images/pages/home/icons/share.svg" alt="Compartilhar"><span>${shares}</span></button>
                </div>
            `;

            newPost.innerHTML = postContent;
            ulPost.append(newPost);

            // Limpar os campos após o envio
            textarea.value = "";
            previewContainer.innerHTML = "";
            previewContainer.style.display = 'none';
            selectedImages = [];
            selectedGifs = [];
            selectedVideos = [];
        } else {
            alert('Verifique o campo digitado. O texto deve ter pelo menos 3 caracteres.');
        }
    });
};

// Chama as funções de gerenciamento
handleFileSelect(fileInputImage, 'image');
handleFileSelect(fileInputGif, 'gif');
handleFileSelect(fileInputVideo, 'video');
addUploadButtonHandler();
addSubmitHandler();
addLikePost();

// Seleciona o botão do menu e o menu lateral
const menuToggle = document.getElementById('menuToggle');
const sidebarLeft = document.getElementById('menu');

// Adiciona evento de clique no botão hamburguer
menuToggle.addEventListener('click', () => {
    sidebarLeft.classList.toggle('active');
    menuToggle.classList.toggle('active');
});
