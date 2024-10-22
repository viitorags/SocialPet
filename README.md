# Estrutura do Projeto

Este projeto é uma aplicação web desenvolvida com HTML, CSS, JavaScript e Node.js. A estrutura do projeto é organizada de maneira a facilitar a manutenção, escalabilidade e entendimento do código. Abaixo, descrevemos a organização das pastas e seus conteúdos.

## Estrutura de Pastas

.
├── assets
│   ├── css
│   │   ├── global
│   │   │   ├── elements.css
│   │   │   ├── fonts.css
│   │   │   ├── global.css
│   │   │   ├── normalize.css
│   │   │   └── variables.css
│   │   └── pages
│   │       ├── cadastro
│   │       │   ├── cadastro.css
│   │       │   └── partials
│   │       ├── home
│   │       │   ├── home.css
│   │       │   └── partials
│   │       └── index
│   │           ├── index.css
│   │           └── partials
│   ├── images
│   │   ├── global
│   │   └── pages
│   │       ├── cadastro
│   │       ├── home
│   │       └── index
│   └── js
│       ├── global
│       │   └── global.js
│       └── pages
│           ├── cadastro
│           │   └── cadastro.js
│           ├── home
│           │   └── home.js
│           └── index
│               └── index.js
├── cadastro.html
├── home.html
├── index.html
├── README.md
├── server.js
└── src
    ├── config
    │   └── db.js
    ├── controllers
    │   └── cadastroController.js
    ├── models
    │   └── cadastro.js
    └── routes
        └── cadastroRoutes.js


## Descrição das Pastas

- **assets/**: Contém todos os arquivos estáticos, incluindo estilos CSS, scripts JavaScript e imagens. É subdividido em **css/**, **images/** e **js/** para melhor organização.

- **src/**: Contém toda a lógica do back-end da aplicação.
  - **config/**: Arquivos de configuração, como a conexão com o banco de dados.
  - **controllers/**: Lógica que manipula as requisições e respostas da aplicação.
  - **models/**: Definições dos modelos de dados que serão armazenados no banco de dados.
  - **routes/**: Definições das rotas da API que conectam as requisições aos seus respectivos controladores.

- **server.js**: Arquivo principal do servidor, onde a aplicação é inicializada e as rotas são configuradas.

- **\*.html**: As páginas HTML que compõem a interface do usuário da aplicação.

## Contribuição

Se você quiser contribuir para este projeto, fique à vontade para abrir uma **issue** ou fazer um **pull request**. Estamos abertos a sugestões e melhorias!
