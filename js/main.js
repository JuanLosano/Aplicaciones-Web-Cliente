//Variable que guarda los productos para las cards
let productos = [];


//Llamar a los elementos del DOM
const contenedorCatalogo = document.querySelector('.catalogo');


//Cargar los productos desde el JSON
async function cargarProductos() {
    try {
        const response = await fetch('data/productos.json');
        productos = await response.json(); // Es similar a parse .
        renderizarCatalogo();
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}


//Función para renderizar las cards de los productos
function renderizarCatalogo() {
contenedorCatalogo.innerHTML = ''; // Limpiar el contenedor antes de renderizar
    const catalogo = productos.map( p => `
        <article class="card">
            <img src="${p.img}" alt="${p.alt}">
            <h2>${p.titulo}</h2>
            <p>Precio: $${p.precio}</p>
            <button>Añadir al Carrito</button>
        </article>
        ` ).join('');
    contenedorCatalogo.innerHTML = catalogo;
}

document.addEventListener('DOMContentLoaded', async () => {
    await cargarProductos();
});






const primaryNav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.menu-btn');

navToggle.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute('data-visible');
    if (visibility === "false") {
        primaryNav.setAttribute('data-visible', "true");
        navToggle.setAttribute('aria-expanded', "true");
    } else {
        primaryNav.setAttribute('data-visible', "false");
        navToggle.setAttribute('aria-expanded', "false");
    }
});

