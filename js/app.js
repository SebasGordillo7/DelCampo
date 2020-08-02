const carrito = document.getElementById('carrito');

const products = document.getElementById('lista-productos')

const listaProducts = document.querySelector('#lista-carrito tbody')

const boton = document.querySelector('agregar-carrito')

const vaciarCarritoBTN = document.getElementById('vaciar-carrito')

/// Listeners ///

cargarEventsListeners();

function cargarEventsListeners() {
    products.addEventListener('click', comprarProductos);

    carrito.addEventListener('click', eliminarProducto)
    //Vaciar Carrito
    vaciarCarritoBTN.addEventListener('click', vaciarCarrito)

    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}

/// Funciones ///
//Obtiene los datos del Producto
function comprarProductos(e) {
    /* Funcion que añade al carrito*/
    e.preventDefault();
    //console.log(e.target.classList)
    if (e.target.classList.contains('agregar-carrito')) {
        //Obtiene los datos del Producto
        const imagen = e.target.parentElement.parentElement;
        const producto = e.target.parentElement;
        //Pasa el curso seleccionado
        leerProduct(imagen, producto)
    }

}

function leerProduct(imagen, producto) {
    const infoProduct = {
        imagen: imagen.querySelector('img').src,
        producto: producto.querySelector('h4').textContent,
        precio: producto.querySelector('h5').textContent,
        id: producto.querySelector('button').getAttribute('data-id')
    }
    insertarCarrito(infoProduct)
}

function insertarCarrito(producto) {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>
            <img src = "${producto.imagen}"
            class="card-img-top">
        </td>
         <td>${producto.producto}</td>
         <td>${producto.precio}</td>
         <td>
           <button type="button" class="btn btn-danger btn-block borrar-curso" data-id="${producto.id}">x</button>
         </td>
    `
    listaProducts.appendChild(row);
    gurdarLocalStaorage(producto);
}
//Elimina producto en el carrito///
function eliminarProducto(e) {
    e.preventDefault()
    console.log('Eliminado')
    let curso, cursoId;
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('button').getAttribute('data-id')
        console.log(cursoId)
    }

    eliminarDeLocalStorage(cursoId);
}

function vaciarCarrito() {

    while (listaProducts.firstChild) {
        listaProducts.removeChild(listaProducts.firstChild)
    }
    vaciarCarritoLocalstorage();
    return false;

}

///Almacena en LocalStorage

function gurdarLocalStaorage(producto) {
    console.log(producto)
    let productos;
    //Obtiene los Productos
    productos = obtenerProductoLocal();

    productos.push(producto);
    //Inserta los productos en localstorage
    localStorage.setItem('productos', JSON.stringify(productos));
}

function obtenerProductoLocal() {
    let productoLS;
    if (localStorage.getItem('productos') === null) {
        productoLS = []
    } else {
        productoLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productoLS;
}

function leerLocalStorage() {
    let productoLS;
    productoLS = obtenerProductoLocal();
    productoLS.forEach(producto => {
        ///Crea la tabla del carrito desde localStorage
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src = "${producto.imagen}"
            class="card-img-top">
        </td>
         <td>${producto.producto}</td>
         <td>${producto.precio}</td>
         <td>
           <button type="button" class="btn btn-danger btn-block borrar-curso" data-id="${producto.id}">x</button>
         </td>
    `
        listaProducts.appendChild(row);
    });
}

//Elimina productos por Id

function eliminarDeLocalStorage(producto) {
    let productosLS;
    //Obtiene el arreglo de localStorage
    productosLS = obtenerProductoLocal();
    productosLS.forEach((productoLS, index) => {
        if (productoLS.id === producto)
            productosLS.splice(index, 1)
    });
    localStorage.setItem('productos', JSON.stringify(productosLS));
}

//Elimina todos los productos de localStorage
function vaciarCarritoLocalstorage() {
    localStorage.clear();
}