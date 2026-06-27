//Variable que guarda los productos para las cards
let productos = [];

//Variable que guarda la lista de favoritos
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

//Llamar a los elementos del DOM
const contenedorCatalogo = document.querySelector('.catalogo');

//Construir la lista de favoritos
const listaFavoritos = document.querySelector('.lista-favoritos');

//Contador de favoritos
const favCount = document.querySelector('.fav-count');

//Cargar los productos desde el JSON
async function cargarProductos() {
    try {
        const response = await fetch('data/productos.json');
        productos = await response.json(); // Es similar a parse .
        renderizarCatalogo();
        renderizarFavoritos();
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}


//Función para renderizar las cards de los productos
function renderizarCatalogo() {
contenedorCatalogo.innerHTML = ''; // Limpiar el contenedor antes de renderizar
    const catalogo = productos.map( p => {
        const esFavorito = favoritos.includes(p.id);
        return `
        <article class="card">
            <img src="${p.img}" alt="${p.alt}">
            <h2>${p.titulo}</h2>
            <p>Precio: $${p.precio}</p>
            <button class="btn btn-fav ${esFavorito ? 'active' : ''}" data-id="${p.id}">
            ${esFavorito ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}</button>
            <button class="btn btn-cart">Añadir al Carrito</button>
        </article>
        `}).join('');
    contenedorCatalogo.innerHTML = catalogo;

    document.querySelectorAll('.btn-fav').forEach(btn => {
        btn.addEventListener('click', toggleFavorito);
    });
}

//Toggle favoritos nos ayuda a cambiar el estado al boton de fav
function toggleFavorito(e) {
    const id = Number(e.target.dataset.id);
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(favId => favId !== id);
        e.target.classList.remove('active');
        e.target.textContent = 'Añadir a Favoritos';
    } else {
        favoritos.push(id);
        e.target.classList.add('active');
        e.target.textContent = 'Quitar de Favoritos';
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    renderizarFavoritos();
};



//Renderizar lista favoritos
function renderizarFavoritos() {
    listaFavoritos.innerHTML = '';
    if (favoritos.length === 0) {
        listaFavoritos.innerHTML = `<p>No tienes favoritos agregados</p>`;
        favCount.textContent = 0;
        favCount.classList.remove('active')
        return
    }

    favoritos.forEach(id => {
        const producto = productos.find(p => p.id === id);
        if (!producto) return; // Si el producto no se encuentra, salir de la función

        const li = document.createElement('li');
        li.className = 'item-fav';
        li.innerHTML = `
            <img src="${producto.img}" alt="Portada del libro ${producto.alt}">
            <span>${producto.titulo}</span>
            <button class="btn-fav-remove" data-id="${id}"></button>
            <span class="sr-only">Eliminar de favoritos</span>
        `;
        listaFavoritos.appendChild(li);
    });

    //Actualizar el contador de favoritos
    favCount.textContent = favoritos.length;
    favCount.classList.add('active');
};


listaFavoritos.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-fav-remove');

    if (btn) {
        const id = Number(btn.dataset.id);

        favoritos = favoritos.filter(favId => favId !== id);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));

        renderizarFavoritos();
        renderizarCatalogo();
    }
});




document.addEventListener('DOMContentLoaded', async () => {
    await cargarProductos();
});




