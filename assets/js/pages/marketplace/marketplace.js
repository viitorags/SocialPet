//Itens do catálogo
const items = [
    {
        id: 0,
        nome: 'Ração cão 20kg',
        img: 'assets/images/pages/marketplace/premier_formula_racas_grandes_para_caes_adultos_20kg_frango.webp',
        preco: 20.97,
        quantidade: 0,

    },
    {
        id: 1,
        nome: 'Ração gato 10kg',
        img: 'assets/images/pages/marketplace/racao gato 10kg.jpg',
        preco: 25.78,
        quantidade: 0,
        
    },
    {
        id: 2,
        nome: 'Ração gato premium',
        img: 'assets/images/pages/marketplace/racao-gato-premium-10kg.jpg',
        preco: 87.99,
        quantidade: 0,
        
    },
    {
        id: 3,
        nome: 'Ração cão 20kg',
        img: 'assets/images/pages/marketplace/premier_formula_racas_grandes_para_caes_adultos_20kg_frango.webp',
        preco: 50.99,
        quantidade: 0,

    },
    {
        id: 4,
        nome: 'Ração gato 10kg',
        img: 'assets/images/pages/marketplace/racao gato 10kg.jpg',
        preco: 20.99,
        quantidade: 0,
        
    },
    {
        id: 5,
        nome: 'Ração gato premium',
        img: 'assets/images/pages/marketplace/racao-gato-premium-10kg.jpg',
        preco: 87.99,
        quantidade: 0,
        
    },
]

// Forma antiga de criar função (inicializarLoja)
function inicializarLoja(){
    var containerProdutos = document.getElementById('produtos');
    items.map((val)=>{
        containerProdutos.innerHTML+= `
        <div class="produto-single">
            
            <p class="produto-nome">`+val.nome+`</p>
            <img class="produto-img" src="`+val.img+`" />
            <div class="produto-footer">
                <p class="produto-preco">R$ `+val.preco+`</p>
                <a class="carrinho-btn" key="`+val.id+`" href="#">Adicionar ao carrinho!</a>
            </div>
        </div>
        `;
    })
}

/* forma moderna (não funcionou)
inicializarLoja = () => {
    var containerProdutos = document.getElementById('produtos');
    items.map((val)=>{
        console.log(val.nome);
    })
}
*/
//Trigger na função inicializarLoja
inicializarLoja();

// Função de adicionar produto ao carrinho
function atualizarCarrinho() {
    var containerCarrinho = document.getElementById('carrinho');
    containerCarrinho.innerHTML = "";
    items.map((val)=>{
        if(val.quantidade > 0){
        containerCarrinho.innerHTML+= `
        <p>`+val.nome+` | quantidade: `+val.quantidade+`</p>
        <hr>
        `;
        }
    })
}
/* Ao clicar no "carrinho-btn" é incrementado na propiedade "quantidade" do produto
*/
var links = document.getElementsByClassName('carrinho-btn');

for(var i = 0; i < links.length; i++) {
    links[i].addEventListener("click",function(){
        let key = this.getAttribute('key');
        items[key].quantidade++;
        atualizarCarrinho();
        /*return false;*/
    })
}

const menuToggle = document.getElementById('menuToggle');
const sidebarLeft = document.getElementById('menu');

// Adiciona evento de clique no botão hamburguer
menuToggle.addEventListener('click', () => {
    sidebarLeft.classList.toggle('active'); // Alterna visibilidade do menu
    menuToggle.classList.toggle('active'); // Alterna ícones no botão
});
