let conteoCantidad = 1;

let suma = document.getElementById('suma');
let resta = document.getElementById('resta');
let cantidadProd = document.getElementById('cantidad-productos');


function adicionar() {
    cantidadProd.textContent = conteoCantidad = conteoCantidad + 1;
}

function sustraer() {

    if (conteoCantidad <= 1) {

    } else {

        cantidadProd.textContent = conteoCantidad = conteoCantidad - 1;
    }
}

suma.addEventListener('click', adicionar);
resta.addEventListener('click', sustraer)

