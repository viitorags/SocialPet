// Seleciona elementos do DOM
const form = document.getElementById('formPost');
const textarea = document.getElementById('textarea');
const fileInput = document.getElementById('uploadMediaInput');
const btnUpload = document.getElementById('btnUploadImage');
const ulPost = document.querySelector('section.feed');
const previewContainer = document.getElementById('selectedImagePreview');
let selectedMedia = [];

// Função para adicionar o evento de curtida nos posts
const addLikePost = () => {
    ulPost.addEventListener('click', function (event) {
        const likeButton = event.target.closest('.like');
        if (likeButton) {
            const likeIcon = likeButton.querySelector('.like-icon');
            likeIcon.classList.toggle('liked');
            const likeCountSpan = likeButton.querySelector('span');
            if (likeCountSpan) {
                let likesCount = parseInt(likeCountSpan.textContent.replace('', ''));
                likesCount = likeIcon.classList.contains('liked') ? likesCount + 1 : likesCount - 1;
                likeCountSpan.textContent = `${likesCount}`;
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

// Função para gerenciar os uploads de mídia (imagens, GIFs, vídeos)
const handleFileSelect = () => {
    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        selectedMedia = [];
        previewContainer.innerHTML = "";

        Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                selectedMedia.push({ type: file.type, src: e.target.result });
                let mediaElement;

                if (file.type.startsWith('image/')) {
                    mediaElement = document.createElement('img');
                } else if (file.type.startsWith('video/')) {
                    mediaElement = document.createElement('video');
                    mediaElement.controls = true; // Adiciona controles para vídeos
                } else {
                    return; // Ignora tipos não suportados
                }

                mediaElement.src = e.target.result;
                mediaElement.style.maxWidth = "100%";
                mediaElement.style.maxHeight = "300px";
                mediaElement.style.objectFit = "contain";
                mediaElement.style.borderRadius = "8px";
                mediaElement.style.marginTop = "10px";
                previewContainer.appendChild(mediaElement);
            };
            reader.readAsDataURL(file);
        });

        if (files.length > 0) previewContainer.style.display = 'block';
    });
};

// Função para abrir o seletor de arquivos ao clicar no botão de upload
const addUploadButtonHandler = () => {
    btnUpload.addEventListener('click', () => {
        fileInput.click();
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

            // Adiciona a mídia selecionada (imagens e vídeos)
            selectedMedia.forEach((media) => {
                if (media.type.startsWith('image/')) {
                    postContent += `<img src="${media.src}" alt="Imagem da postagem" style="max-width: 100%; max-height: 400px; object-fit: contain; margin-top: 10px;">`;
                } else if (media.type.startsWith('video/')) {
                    postContent += `<video src="${media.src}" style="max-width: 100%; max-height: 400px; object-fit: contain; margin-top: 10px;" controls></video>`;
                }
            });

            postContent += `
                </div>
                <div class="post-actions">
                    <button type="button" class="files-post like"><i class="fa fa-paw like-icon"></i><span>${likes}k</span></button>
                    <button type="button" class="files-post direct"><img src="/SocialPet/assets/images/pages/home/icons/chat.svg" alt="Comentar"><span>${comments}</span></button>
                    <button type="button" class="files-post share"><img src="/SocialPet/assets/images/pages/home/icons/share.svg" alt="Compartilhar"><span>${shares}</span></button>
                </div>
            `;

            newPost.innerHTML = postContent;
            ulPost.append(newPost);

            // Limpar os campos após o envio
            textarea.value = "";
            previewContainer.innerHTML = "";
            previewContainer.style.display = 'none';
            selectedMedia = [];
        } else {
            alert('Verifique o campo digitado. O texto deve ter pelo menos 3 caracteres.');
        }
    });
};

// Chama as funções de gerenciamento
handleFileSelect();
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
