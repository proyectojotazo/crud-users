const { underlineRed, white, green } = require('./colores')
// TODO: Crear en chalk todos los colores relacionados a éste archivo

const validaNombreApellido = (value = '') => {

    const regex = /^[a-zA-Z]{3,}([\s]{1}[a-zA-Z]{1,}){0,}?$/i

    const errorMsg = 
    ` ${underlineRed('El campo no cumple con alguno de estos criterios:')}
    ${white('- No puede estar vacío')}
    ${white('- Debe contener un mínimo de 3 carácteres')}
    ${white('- No puede contener espacios adicionales')}
    ${white('- No acepta carácteres especiales. Ej: ')}${green('+*_-')}    
    `

    return regex.test(value) || errorMsg
}

const validaUsuario = (value = '') => {
    // TODO: Crear una regex
    if (value.length === 0) {
        return 'No se puede dejar el campo vacío'
    } else if (value.length > 18) {
        return 'El usuario no puede contener más de 18 carácteres'
    }
    
    return true
}

const validaEmail = (value = '') => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    const errorMsg = `${underlineRed('Debe de ser un email válido')}`
    
    return regex.test(value) || errorMsg
}

const validaPassword = (value = '') => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    
    const errorMsg = 
    ` ${underlineRed('El campo no cumple con alguno de estos criterios:')}
    ${white('- Debe contener un mínimo de 8 carácteres')}
    ${white('- Debe contener una mayúscula')}
    ${white('- Debe contener una minúscula')}
    ${white('- Debe contener un dígito')}    
    `

    return regex.test(value) || errorMsg
}

module.exports = {
    validaNombreApellido,
    validaUsuario,
    validaEmail,
    validaPassword
}