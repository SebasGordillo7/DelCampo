const listaProducts = document.querySelector('#lista-comprar tbody')
const carrito = document.getElementById('carrito');
const precioCompra = document.querySelector('#precio');
const pago = document.querySelector('#pago')
const textPago = document.querySelector('#text-pago')

//Inserta en localStorage

cargarEventsListeners();

mostrarTotal();

function cargarEventsListeners() {
    carrito.addEventListener('click', eliminarProducto)
    document.addEventListener('DOMContentLoaded', mostrarPorductos)
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
//Elimina producto en el carrito///
function eliminarProducto(e) {
    e.preventDefault()
    console.log('Eliminado')
    let curso, cursoId;
    if (e.target.classList.contains('borrar-producto')) {
        e.target.parentElement.parentElement.parentElement.remove();
        console.log(e.target.parentElement.parentElement.parentElement + " Eliminado Carrito")
        curso = e.target.parentElement.parentElement.parentElement;
        cursoId = curso.querySelector('button').getAttribute('data-id')
        console.log(cursoId)
    }

    eliminarDeLocalStorage(cursoId);
    window.location.href = "comprar.html"
}

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
//Inserta en localStorage
function mostrarPorductos() {
    let productoLS;
    productoLS = obtenerProductoLocal();
    productoLS.forEach(producto => {
        ///Crea la tabla del carrito desde localStorage
        const row = document.createElement('tr')
        row.innerHTML = `
        <td class="img-table">
            <img src="${producto.imagen}" width="30%">
        </td>
        <td> ${producto.producto}</td>
        <td> ${producto.precio}</td>
         <td>
           <button type="button" class="btn btn-danger" data-id="${producto.id}">
           <i class="fas fa-backspace borrar-producto"></i>
           </button>
         </td>
    `
        listaProducts.appendChild(row);
    });
}

function mostrarTotal() {
    var productoLS, suma;
    precios = [];
    // if (obtenerProductoLocal() === null) {
    //     window.location.href = "compras.html"
    // } else {
    productoLS = obtenerProductoLocal();
    productoLS.forEach(function (precio) {
        console.log(precio.precio)
        var total = precio.precio.replace('$', "")
        var totald = total.replace('.', "")
        console.log(typeof (totald) + " tipo")
        var paseri = parseInt(totald);
        console.log(typeof (paseri) + " tipo2")
        console.log(paseri)
        precios.push(paseri)
        console.log(precios)
    });
    let total = precios.reduce((a, b) => a + b, 0);
    if (total === 0) {
        pago.style.visibility = 'hidden';
        textPago.style.visibility = 'hidden'
    }
    console.log(total)
    ///Crea la tabla del carrito desde localStorage
    const row = document.createElement('div')
    row.innerHTML = `
        <h3>${"$" + total}</h3>`
    console.log(row)
    precioCompra.appendChild(row);
    console.log(precioCompra)
}



// Obtiene de localStorage