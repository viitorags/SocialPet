const getTime = () => {
    const time = new Date();
    return `${time.getHours()}h ${time.getMinutes()}min`;
};

// Função para gerar números aleatórios em um intervalo
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const postagens = [
    {
        usuario: '@gustavolima',
        nome: 'Gustavo Lima',
        perfil: '',
        texto: 'Texto do post 1',
        img: '/assets/images/pages/home/postEstaticos/pexels-chevanon-1108099.jpg',
        horario: getRandomNumber(1,24),
        likes: getRandomNumber(1,13),
        comments: getRandomNumber(50,150),
        shares: getRandomNumber(50,100)
    },
    {
        usuario: '@rannyara01',
        nome: 'Rannyara',
        perfil: '',
        texto: 'Texto do post 2',
        img: '/assets/images/pages/home/postEstaticos/pexels-ezz7-979503.jpg',
        horario: getRandomNumber(1,24),
        likes: getRandomNumber(1,13),
        comments: getRandomNumber(50,150),
        shares: getRandomNumber(50,100)
    },
    {
        usuario: '@rannyara01',
        nome: 'Rannyara',
        perfil: '',
        texto: 'Texto do post 2',
        img: '/assets/images/pages/home/postEstaticos/pexels-fotios-photos-1367002.jpg',
        horario: getRandomNumber(1,24),
        likes: getRandomNumber(1,13),
        comments: getRandomNumber(50,150),
        shares: getRandomNumber(50,100)
    },
    {
        usuario: '@rannyara01',
        nome: 'Rannyara',
        perfil: '',
        texto: 'Texto do post 2',
        img: '/assets/images/pages/home/postEstaticos/pexels-fox-58267-1265618.jpg',
        horario: getRandomNumber(1,24),
        likes: getRandomNumber(1,13),
        comments: getRandomNumber(50,150),
        shares: getRandomNumber(50,100)
    },
    {
        usuario: '@rannyara01',
        nome: 'Rannyara',
        perfil: '',
        texto: 'Texto do post 2',
        img: '/assets/images/pages/home/postEstaticos/pexels-francesco-ungaro-96428.jpg',
        horario: getRandomNumber(1,24),
        likes: getRandomNumber(1,13),
        comments: getRandomNumber(50,150),
        shares: getRandomNumber(50,100)
    },
    {
        usuario: '@rannyara01',
        nome: 'Rannyara',
        perfil: '',
        texto: 'Texto do post 2',
        img: '/assets/images/pages/home/postEstaticos/pexels-hilaryh-1084165.jpg',
        horario: getRandomNumber(1,24),
        likes: getRandomNumber(1,13),
        comments: getRandomNumber(50,150),
        shares: getRandomNumber(50,100)
    },
    {
        usuario: '@rannyara01',
        nome: 'Rannyara',
        perfil: '',
        texto: 'Texto do post 2',
        img: '/assets/images/pages/home/postEstaticos/pexels-ilargian-faus-763704-1629781.jpg',
        horario: getRandomNumber(1,24),
        likes: getRandomNumber(1,13),
        comments: getRandomNumber(50,150),
        shares: getRandomNumber(50,100)
    },
    {
        usuario: '@rannyara01',
        nome: 'Rannyara',
        perfil: '',
        texto: 'Texto do post 2',
        img: '/assets/images/pages/home/postEstaticos/pexels-katarzyna-modrzejewska-495044-1314550.jpg',
        horario: getRandomNumber(1,24),
        likes: getRandomNumber(1,13),
        comments: getRandomNumber(50,150),
        shares: getRandomNumber(50,100)
    },
    {
        usuario: '@rannyara01',
        nome: 'Rannyara',
        perfil: '',
        texto: 'Texto do post 2',
        img: '/assets/images/pages/home/postEstaticos/pexels-mccutcheon-1909802.jpg',
        horario: getRandomNumber(1,24),
        likes: getRandomNumber(1,13),
        comments: getRandomNumber(50,150),
        shares: getRandomNumber(50,100)
    },
    {
        usuario: '@rannyara01',
        nome: 'Rannyara',
        perfil: '',
        texto: 'Texto do post 2',
        img: '/assets/images/pages/home/postEstaticos/pexels-pixabay-160846.jpg',
        horario: getRandomNumber(1,24),
        likes: getRandomNumber(1,13),
        comments: getRandomNumber(50,150),
        shares: getRandomNumber(50,100)
    },
    {
        usuario: '@rannyara01',
        nome: 'Rannyara',
        perfil: '',
        texto: 'Texto do post 2',
        img: '/assets/images/pages/home/postEstaticos/pexels-scottwebb-1093126.jpg',
        horario: getRandomNumber(1,24),
        likes: getRandomNumber(1,13),
        comments: getRandomNumber(50,150),
        shares: getRandomNumber(50,100)
    },
    {
        usuario: '@rannyara01',
        nome: 'Rannyara',
        perfil: '',
        texto: 'Texto do post 2',
        img: '/assets/images/pages/home/postEstaticos/pexels-simonakidric-2607544.jpg',
        horario: getRandomNumber(1,24),
        likes: getRandomNumber(1,13),
        comments: getRandomNumber(50,150),
        shares: getRandomNumber(50,100)
    },
];

const CHUNK_SIZE = 5;  // Número de postagens carregadas de cada vez

// Função para carregar postagens
function carregarPost() {
    const ulPost = document.querySelector('section.feed');
    let currentIndex = 0;
    
    function renderizarPostagens() {
        const chunk = postagens.slice(currentIndex, currentIndex + CHUNK_SIZE);
        ulPost.innerHTML += chunk.map(post => `
            <article class="post">
                <div class="post-header">
                    <img src="${post.img}" class="img-user-post" alt="Foto de perfil">
                    <div class="user-info">
                        <h3>${post.usuario}</h3>
                        <p>${post.horario}h</p>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.texto}</p>
                    <img src="${post.img}" alt="Imagem da postagem">
                </div>
                <div class="post-actions">
                    <button type="button" class="files-post like"><i class="fa fa-paw like-icon"></i>
                        <span>${post.likes}k</span></button>
                    <button type="button" class="files-post direct"><img
                            src="./assets/images/pages/home/icons/direct.svg" alt="Comentar"><span>${post.comments}</span></button>
                    <button type="button" class="files-post share"><img src="./assets/images/pages/home/icons/share.svg"
                            alt="Compartilhar"><span>${post.shares}</span></button>
                </div>
            </article>
        `).join('');

        currentIndex += CHUNK_SIZE;

        if (currentIndex < postagens.length) {
            setTimeout(renderizarPostagens, 0);  // Chama a função novamente para renderizar o próximo lote
        }
    }

    renderizarPostagens();  // Inicia a renderização das postagens
}

carregarPost();