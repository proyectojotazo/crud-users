const validaNombreApellido = (value = '') => {
    if (value.length === 0) {
        return 'No se puede dejar el campo vacío'
    } else if (value.length < 3) {
        return 'Este campo debe contener un mínimo de 3 carácteres'
    }

    return true
}

const validaUsuario = (value = '') => {
    if (value.length === 0) {
        return 'No se puede dejar el campo vacío'
    } else if (value.length > 18) {
        return 'El usuario no puede contener más de 18 carácteres'
    }

    return true
}

const validaEmail = (value = '') => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isValid = regex.test(value)

    if (!isValid) {
        return 'Debe de ser un email válido'
    }

    return true
}

const validaPassword = (value = '') => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const isValid = regex.test(value)

    if(!isValid) {
        return 'Debe contener un mínimo de 8 carácteres, una mayúscula, una minúscula y un dígito'
    } 

    return true
}

module.exports = {
    validaNombreApellido,
    validaUsuario,
    validaEmail,
    validaPassword
}