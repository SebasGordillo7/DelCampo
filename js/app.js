const carrito = document.getElementById('carrito');

const products = document.getElementById('lista-productos')

const listaProducts = document.querySelector('#lista-carrito tbody')

const boton = document.querySelector('agregar-carrito')

/// Listeners ///

//cargarEventsListeners();

function cargarEventsListeners() {
    products.addEventListener('click', comprarProductos);
}

/// Funciones ///
//Obtiene los datos del Producto
function comprarProductos(e) {
    /* Funcion que añade al carrito*/
    e.preventDefault();
    //console.log(e.target.classList)
    if (e.target.classList.contains('agregar-carrito')) {
        console.log("SI")
        //Obtiene los datos del Producto
        const imagen = e.target.parentElement.parentElement;
        const product = e.target.parentElement;
        //Pasa el curso seleccionado
        console.log(imagen + product + " test")
        leerProduct(imagen, product)
    }

}

function leerProduct(imagen, product) {
    const infoProduct = {
        imagen: imagen.querySelector('img').src,
        producto: product.querySelector('h4').textContent,
        precio: product.querySelector('h5').textContent,
        id: product.querySelector('button').getAttribute('data-id')
    }
    console.log(infoProduct)
    insertarCarrito(infoProduct)
}

function insertarCarrito(product) {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>
            <img src = "${product.imagen}"
            class="card-img-top">
        </td>
         <td>${product.producto}</td>
         <td>${product.precio}</td>
         <td>
           <button type="button" class="btn btn-danger btn-block" data-id="${product.id}"> X </button>
         </td>

    `
    listaProducts.appendChild(row)

}