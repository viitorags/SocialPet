//Itens do catálogo
const items = [
    {
        id: 0,
        nome: 'racao-cao-20kg',
        img: 'assets/images/pages/marketplace/premier_formula_racas_grandes_para_caes_adultos_20kg_frango.webp',
        
        quantidade: 0,

    },
    {
        id: 1,
        nome: 'racao-gato-10kg',
        img: 'assets/images/pages/marketplace/racao gato 10kg.jpg',
        quantidade: 0,
        
    },
    {
        id: 2,
        nome: 'racao-gato-premium',
        img: 'assets/images/pages/marketplace/racao-gato-premium-10kg.jpg',
        quantidade: 0,
        
    },
    {
        id: 3,
        nome: 'racao-cao-20kg',
        img: 'assets/images/pages/marketplace/premier_formula_racas_grandes_para_caes_adultos_20kg_frango.webp',
        
        quantidade: 0,

    },
    {
        id: 4,
        nome: 'racao-gato-10kg',
        img: 'assets/images/pages/marketplace/racao gato 10kg.jpg',
        quantidade: 0,
        
    },
    {
        id: 5,
        nome: 'racao-gato-premium',
        img: 'assets/images/pages/marketplace/racao-gato-premium-10kg.jpg',
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
            <a class="carrinho-btn" key="`+val.id+`" href="#">Adicionar ao carrinho!</a>
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

function atualizarCarrinho() {
    console.log(items);
}

var links = document.getElementsByClassName('cart');

for(var i = 0; i < links.length; i++) {
    links[i].addEventListener("click",function(){
        let key = this.getAttribute('key');
        items[key].quantidade++;
        atualizarCarrinho();
    })
}