const carrito = document.getElementById('carrito');

const listaProducts = document.querySelector('#lista-carrito tbody')


const vaciarCarritoBTN = document.getElementById('vaciar-carrito')



cargarEventsListeners();

function cargarEventsListeners() {


    carrito.addEventListener('click', eliminarProducto)
    //Vaciar Carrito
    vaciarCarritoBTN.addEventListener('click', vaciarCarrito)

    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}

/// Funciones ///

//Elimina producto en el carrito///
function eliminarProducto(e) {
    e.preventDefault()
    console.log('Eliminado')
    let curso, cursoId;
    if (e.target.classList.contains('borrar-producto')) {
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

// Obtiene de localStorage

function obtenerProductoLocal() {
    let productoLS;
    if (localStorage.getItem('productos') === null) {
        productoLS = []
    } else {
        productoLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productoLS;
}

//Inserta en localStorage
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
           <button type="button" class="btn btn-danger btn-block borrar-producto" data-id="${producto.id}">X</button>
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