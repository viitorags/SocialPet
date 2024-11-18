const menuToggle = document.getElementById('menuToggle');
const columnLeft = document.getElementById('menu');

// Adiciona evento de clique no botão hamburguer
menuToggle.addEventListener('click', () => {
    columnLeft.classList.toggle('active'); // Alterna visibilidade do menu
    menuToggle.classList.toggle('active'); // Alterna ícones no botão
});
