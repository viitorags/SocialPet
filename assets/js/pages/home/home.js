// Seleciona elementos do DOM
const form = document.getElementById('formPost');
const textarea = document.getElementById('textarea');
const fileInput = document.getElementById('uploadImageInput');
const btnUploadImage = document.getElementById('btnUploadImage'); // Seleciona o botão de upload
const ulPost = document.querySelector('section.feed');
const previewContainer = document.getElementById('selectedImagePreview');
const like = document.querySelector('.like-icon');
let selectedImages = [];

const addLikePost = () => {
    // Adiciona o evento no botão de curtida
    ulPost.addEventListener('click', function (event) {
        // Verifica se o clique foi no botão de curtida, não só no ícone
        const likeButton = event.target.closest('.like');  // Pega o botão que contém o ícone de curtida

        if (likeButton) {
            const likeIcon = likeButton.querySelector('.like-icon');  // Pega o ícone dentro do botão
            likeIcon.classList.toggle('liked');  // Alterna a classe 'liked' no ícone
            
            const likeCountSpan = likeButton.querySelector('span');  // Pega o contador de curtidas dentro do botão
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
                    <button type="button" class="files-post like"><svg width="18" height="20" viewBox="0 0 150 141" xmlns="http://www.w3.org/2000/svg" class="like-icon">
                        <path d="M118.418 81.3768C113.253 78.5243 109.433 73.7467 107.796 68.0914C105.733 61.0136 101.42 54.7945 95.5063 50.3689C89.5925 45.9434 82.3973 43.5505 75.0021 43.55C67.6068 43.5495 60.4113 45.9414 54.4969 50.3661C48.5826 54.7908 44.269 61.0093 42.2046 68.0869C40.5688 73.744 36.7485 78.5234 31.5816 81.3768C24.525 85.2048 19.2148 91.5897 16.7492 99.2106C14.2836 106.831 14.8515 115.105 18.3352 122.321C21.8189 129.536 27.952 135.141 35.4657 137.976C42.9795 140.81 51.299 140.658 58.7034 137.551C69.1428 133.267 80.8572 133.267 91.2966 137.551C98.7014 140.661 107.022 140.815 114.538 137.98C122.053 135.146 128.188 129.541 131.672 122.324C135.157 115.108 135.724 106.832 133.257 99.2103C130.79 91.5885 125.477 85.2035 118.418 81.3768ZM103.462 122.977C101.555 122.981 99.6666 122.601 97.911 121.859C97.8797 121.846 97.8478 121.833 97.8158 121.819C83.2035 115.807 66.7966 115.807 52.1842 121.819C52.1523 121.833 52.1203 121.846 52.089 121.859C48.7205 123.279 44.9327 123.353 41.5113 122.064C38.0899 120.776 35.2974 118.224 33.7129 114.938C32.1284 111.653 31.8735 107.886 33.0011 104.418C34.1287 100.95 36.5523 98.048 39.7691 96.3133C39.7941 96.2994 39.8199 96.2856 39.8449 96.2714C44.3631 93.7847 48.3454 90.435 51.5642 86.4137C54.783 82.3924 57.1752 77.7784 58.604 72.8353C59.6367 69.2972 61.7937 66.1887 64.7507 63.9769C67.7077 61.7652 71.3051 60.5696 75.0022 60.57C78.6993 60.5703 82.2965 61.7666 85.2531 63.9789C88.2096 66.1912 90.366 69.3001 91.398 72.8384C92.8267 77.7809 95.2187 82.3944 98.4371 86.4151C101.656 90.4359 105.637 93.7851 110.155 96.2714C110.18 96.2856 110.206 96.2995 110.231 96.3133C113.016 97.815 115.22 100.2 116.492 103.09C117.765 105.98 118.034 109.211 117.257 112.271C116.481 115.33 114.702 118.045 112.203 119.984C109.705 121.923 106.628 122.976 103.462 122.977ZM149 52.06C149 55.4262 147.998 58.7169 146.122 61.5158C144.246 64.3147 141.579 66.4962 138.458 67.7844C135.338 69.0726 131.904 69.4097 128.592 68.7529C125.279 68.0962 122.236 66.4752 119.848 64.0949C117.46 61.7147 115.833 58.682 115.174 55.3804C114.515 52.0789 114.854 48.6567 116.146 45.5467C117.439 42.4367 119.627 39.7786 122.436 37.9084C125.244 36.0382 128.546 35.04 131.923 35.04C134.166 35.04 136.386 35.4802 138.458 36.3356C140.53 37.1909 142.413 38.4446 143.998 40.025C145.584 41.6055 146.842 43.4817 147.7 45.5467C148.558 47.6117 149 49.8249 149 52.06ZM18.0769 69.08C14.6994 69.08 11.3978 68.0818 8.5895 66.2116C5.78121 64.3414 3.59242 61.6833 2.29991 58.5733C1.0074 55.4633 0.669219 52.0411 1.32814 48.7396C1.98705 45.438 3.61347 42.4053 6.00172 40.025C8.38997 37.6447 11.4328 36.0237 14.7454 35.367C18.058 34.7103 21.4916 35.0474 24.612 36.3356C27.7324 37.6238 30.3994 39.8053 32.2759 42.6042C34.1523 45.4031 35.1539 48.6937 35.1539 52.06C35.1539 54.2951 34.7122 56.5083 33.854 58.5733C32.9958 60.6382 31.7379 62.5145 30.1522 64.095C28.5664 65.6754 26.6839 66.9291 24.612 67.7844C22.5401 68.6398 20.3195 69.08 18.0769 69.08ZM35.1539 18.02C35.1539 14.6538 36.1554 11.3631 38.0318 8.5642C39.9083 5.76527 42.5753 3.58378 45.6957 2.29558C48.8161 1.00737 52.2497 0.670322 55.5623 1.32704C58.8749 1.98376 61.9177 3.60476 64.306 5.98505C66.6942 8.36534 68.3207 11.398 68.9796 14.6996C69.6385 18.0011 69.3003 21.4233 68.0078 24.5333C66.7153 27.6433 64.5265 30.3014 61.7182 32.1716C58.9099 34.0418 55.6083 35.04 52.2308 35.04C49.9882 35.04 47.7676 34.5998 45.6957 33.7444C43.6238 32.8891 41.7413 31.6354 40.1556 30.055C38.5698 28.4745 37.3119 26.5982 36.4537 24.5333C35.5956 22.4683 35.1539 20.2551 35.1539 18.02ZM80.6923 18.02C80.6923 14.6538 81.6939 11.3631 83.5703 8.5642C85.4467 5.76527 88.1138 3.58378 91.2342 2.29558C94.3546 1.00737 97.7882 0.670322 101.101 1.32704C104.413 1.98376 107.456 3.60476 109.844 5.98505C112.233 8.36534 113.859 11.398 114.518 14.6996C115.177 18.0011 114.839 21.4233 113.546 24.5333C112.254 27.6433 110.065 30.3014 107.257 32.1716C104.448 34.0418 101.147 35.04 97.7692 35.04C95.5267 35.04 93.306 34.5998 91.2342 33.7444C89.1623 32.8891 87.2798 31.6354 85.694 30.055C84.1083 28.4745 82.8504 26.5982 81.9922 24.5333C81.134 22.4683 80.6923 20.2551 80.6923 18.02Z"/>
                        </svg><span>${likes}k</span></button>
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
addLikePost();