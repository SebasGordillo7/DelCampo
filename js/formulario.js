function cancelarEvento(event) {
    event.preventDefault();
}

const registro = document.getElementById('registro')

registro.addEventListener('submit', cancelarEvento);
registro.addEventListener('submit', function () {
    let validado = true;
    let mensajeError = '';

    let identificacion = registro['identificacion'].value
    let nombre = registro['nombre'].value
    let tipoDocumento = registro['tipoDocumento'].value
    //let empresa = registro['empresa'].value
    //let cargo = registro['cargo'].value
    let email = registro['email'].value
    let telefono = registro['telefono'].value
    let contrasena = registro['contrasena'].value



    let alerta = document.getElementById('mensaje-formulario')
    registro.classList.remove('form-validation')
    if (validado == false) {
        registro.classList.add('form-validation')

        alerta.innerHTML = mensajeError
        alerta.hidden = false
    } else {
        let datos = {
            identificacion,
            nombre,
            tipoDocumento,
            //empresa,
            //cargo,
            email,
            telefono,
            contrasena

        }
        localStorage.setItem('usuario', JSON.stringify(datos))
        window.location = registro.action
    }

})




let inputTipoDocumento = registro['tipoDocumento']
inputTipoDocumento.addEventListener('change', function () {
    let passportInfo = document.getElementById('passport-info')
    if (inputTipoDocumento.value == 'pasaporte') {
        passportInfo.hidden = false
    } else {
        passportInfo.hidden = true
    }
})