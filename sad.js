
const primaryNav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.menu-btn');
const closeMenu = document.querySelector('.fantasma');

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




closeMenu.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute('data-visible');
    if (visibility === "true") {
        primaryNav.setAttribute('data-visible', "false");
        navToggle.setAttribute('aria-expanded', "false");
    }
});



//Función para renderizar las cards de los productos
function renderizarCatalogo() {
contenedorCatalogo.innerHTML = ''; // Limpiar el contenedor antes de renderizar
    const catalogo = productos.map( p => `
        <article class="card">
            <img src="${p.img}" alt="${p.alt}">
            <h2>${p.titulo}</h2>
            <p>Precio: $${p.precio}</p>
            <button class="btn">Añadir al Carrito</button>
            <button class="btn">Añadir a Favoritos</button>
        </article>
        ` ).join('');
    contenedorCatalogo.innerHTML = catalogo;
}



// toggle de menu 

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

