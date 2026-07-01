//Variable que guarda los productos para las cards
let productos = [];

//Variable que guarda la lista de favoritos
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

//Variable que guarda la lista del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//Llamar a los elementos del DOM
const contenedorCatalogo = document.querySelector('.catalogo');

//Construir la lista de favoritos
const listaFavoritos = document.querySelector('.lista-favoritos');

//Contador de favoritos
const favCount = document.querySelector('.fav-count');

//Render del carrito
const listaCarrito = document.querySelector('.lista-carrito')

//Contador de carrito
const cartCount = document.querySelector('.cart-count');


const cartTotal = document.querySelector('.cart-total')




//Cargar los productos desde API
const baseID = 'appuYVd304ULbfO2H';
const path = 'patBjBMOLGWDttOWR.bae50dba1f2ac71649f181dbd10ba3acf5fee96d2849a1664d87b8fc0335f581';

async function cargarProductos() {
    try {
        const response = await fetch(`https://api.airtable.com/v0/${baseID}/Productos`, {
            headers: {
                'Authorization': `Bearer ${path}`
            }
        });
        const data = await response.json();


console.log(data);
console.log(data.records);
console.log(data.records[0]);
console.log(data.records[0].fields);
        productos = data.records.map(r => r.fields);

        renderizarCatalogo();
        renderizarFavoritos();
        renderizarCarrito();
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
};

//Función para renderizar las cards de los productos
function renderizarCatalogo() {
    if(!contenedorCatalogo) return; // Verificar si el contenedor existe antes de continuar
contenedorCatalogo.innerHTML = ''; // Limpiar el contenedor antes de renderizar
    const catalogo = productos.map( p => {
        const esFavorito = favoritos.includes(p.id);
        const enCarrito = carrito.some(item => item.id === p.id);
        return `
        <article class="card" data-id="${p.id}">
            <img src="${p.img}" alt="${p.alt}">
            <h2>${p.titulo}</h2>
            <p>Precio: $${p.precio}</p>
            <button class="btn btn-fav ${esFavorito ? 'active' : ''}" data-id="${p.id}">
            ${esFavorito ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}</button>
            <button class="btn btn-cart ${enCarrito ? 'active' : ''}" data-id="${p.id}">
            ${enCarrito ? 'Agregado' : 'Comprar'}
            </button>
            <a class="sr-only" href="producto.html?id=${p.id}">Ver más sobre ${p.titulo}</a>
        </article>
        `}).join('');
    contenedorCatalogo.innerHTML = catalogo;

    document.querySelectorAll('.btn-fav').forEach(btn => {
        btn.addEventListener('click', toggleFavorito);
    });

    document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', agregarAlCarrito);
    });

}

if(contenedorCatalogo){
    contenedorCatalogo.addEventListener('click', (e) => {
        const article = e.target.closest('article');
        if (!article) return;
        if (e.target.closest('.btn')) return;

        window.location.href = `producto.html?id=${article.dataset.id}`;
    });
};


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
        renderizarDetalle();
    }
});

//Carrito

//Añadir al carrito
function agregarAlCarrito(e){
    const id = Number(e.target.dataset.id);
    const existe = carrito.find(item => item.id === id);

    if (existe) {
        return;
    } else {
        carrito.push({id,cantidad: 1});
    }

    localStorage.setItem('carrito',JSON.stringify(carrito));
    renderizarCatalogo();
    renderizarCarrito();
    renderizarDetalle();
};

//Renderizar carrito
function renderizarCarrito(){
    listaCarrito.innerHTML = '';
    let total = 0;

    if (carrito.length ===0) {
        listaCarrito.innerHTML = `
        <p>No tienes productos agregados</p>
        `
        cartCount.textContent = 0;
        cartCount.classList.remove('active');
        cartTotal.innerHTML = 'Total de mi compra: $0';
        return;
    }

    
    cartCount.classList.add('active');
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;


    carrito.forEach(item => {
        const prod = productos.find(p => p.id === item.id);
        if(!prod) return;

        const subtotal = prod.precio * item.cantidad;
        total += subtotal;

        const li = document.createElement('li');

        li.className = 'item-cart';
        li.innerHTML= `
            <img src="${prod.img}" alt="Portada del libro ${prod.titulo}">
            <div>
                <h2>${prod.titulo}</h2>
                <h3>Precio: $${prod.precio.toLocaleString('es-AR')} x ${item.cantidad} = $${subtotal.toLocaleString('es-AR')}</h3>  
            </div>

            <div class="cart-controles">
                <button class="menos" data-id="${item.id}">
                    <span class="sr-only"> Restar cantidad</span>
                </button>
                <span>${item.cantidad}</span>
                <button class="mas" data-id="${item.id}">
                    <span class="sr-only"> Sumar cantidad</span>
                </button> 
                <button class="eliminar" data-id="${item.id}">
                    <span class="sr-only"> Eliminar elemento</span>
                </button>                               

            
            </div>


        `;
        listaCarrito.appendChild(li);
    });


    cartTotal.innerHTML = 'Total de mi compra: ' + ' $' + total.toLocaleString('es-AR');


    //suma
    listaCarrito.querySelectorAll('.mas').forEach(btn => {
    btn.addEventListener('click', () => actualizarCantidad(Number(btn.dataset.id), 1));
    });
    //resta
    listaCarrito.querySelectorAll('.menos').forEach(btn => {
    btn.addEventListener('click', () => actualizarCantidad(Number(btn.dataset.id), -1));
    });
    //eliminar
    listaCarrito.querySelectorAll('.eliminar').forEach(btn => {
    btn.addEventListener('click', () => eliminardDelCarrito(Number(btn.dataset.id), ));
    });

}; 

function actualizarCantidad(id, delta) {
    const item = carrito.find(item => item.id === id);
    if (item) {
        item.cantidad = Math.max(1, item.cantidad + delta);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
    };
}

function eliminardDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCatalogo();
    renderizarCarrito();
     renderizarDetalle();
}

//Ver detalle

function renderizarDetalle() {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const esFavorito = favoritos.includes(producto.id);
    const enCarrito = carrito.some(item => item.id === producto.id);

    const contenedorDetalle = document.querySelector(".detalle-producto");
    const descripcionProducto = document.querySelector(".descripcion_producto");
    const especificacionesProducto = document.querySelector(".especificaciones_producto");

    if (!contenedorDetalle) return;


    contenedorDetalle.innerHTML = `
        <article class="producto detalle-producto">
        <img src="${producto.img}" alt="${producto.alt}">
        <div class="producto-info">
            <h2>${producto.titulo}</h2>
            <p>Precio: $${producto.precio.toLocaleString("es-AR")}</p>

            <button class="btn btn-cart ${enCarrito ? "active" : ""}" data-id="${producto.id}">
                ${enCarrito ? "Agregado" : "Comprar"}
            </button>

            <button class="btn btn-fav ${esFavorito ? "active" : ""}" data-id="${producto.id}">
                ${esFavorito ? "Quitar de Favoritos" : "Añadir a Favoritos"}
            </button>
        </div>
        </article>
    `;

    descripcionProducto.innerHTML = `
        <h2>Descripción del libro ${producto.titulo}</h2>
        <p>${producto.descripcion}</p>
    `;

    especificacionesProducto.innerHTML = `
        <h2>Especificaciones del libro ${producto.titulo}</h2>

        <ul>
            <li><strong>Autor:</strong> ${producto.autor}</li>
            <li><strong>Editorial:</strong> ${producto.editorial}</li>
        </ul>
    `;

    // Eventos de los botones
    contenedorDetalle
        .querySelector(".btn-cart")
        .addEventListener("click", agregarAlCarrito);

    contenedorDetalle
        .querySelector(".btn-fav")
        .addEventListener("click", toggleFavorito);
}


document.addEventListener('DOMContentLoaded', async () => {
    await cargarProductos();
    if (document.querySelector('.detalle-producto')) {
        renderizarDetalle();
    }
});




