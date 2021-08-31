const { underlineRed, white, green } = require('./colores')

const msgValidators = {
    nombreApellidos: ` ${underlineRed('El campo no cumple con alguno de estos criterios:')}
    ${white('- No puede estar vacío')}
    ${white('- Debe contener un mínimo de 3 carácteres')}
    ${white('- No puede contener espacios adicionales')}
    ${white('- No acepta carácteres especiales ni números. Ej: ')}${green('+*_-')}    
    `,
    usuario: ` ${underlineRed('El campo no cumple con alguno de estos criterios:')}
    ${white('- No puede estar vacío')}
    ${white('- Debe contener un mínimo de 3 carácteres')}
    ${white('- No puede contener espacios adicionales')}
    ${white('- Solo acepta guiones y guión bajo como caracter especial')}    
    `,
    email: `${underlineRed('Debe de ser un email válido')}`,
    password: ` ${underlineRed('El campo no cumple con alguno de estos criterios:')}
    ${white('- Debe contener un mínimo de 8 carácteres')}
    ${white('- Debe contener una mayúscula')}
    ${white('- Debe contener una minúscula')}
    ${white('- Debe contener un dígito')}    
    `

}

const validaNombreApellido = (value = '') => {
    const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+([\s]{1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,})?$/

    return regex.test(value) || msgValidators.nombreApellidos
}

const validaUsuario = (value = '') => {

    const regex = /^[a-zA-Z0-9À-ÿ\u00f1\u00d1_-]{3,16}$/
       
    return regex.test(value) || msgValidators.usuario
}

const validaEmail = (value = '') => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    return regex.test(value) || msgValidators.email
}

const validaPassword = (value = '') => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    
    return regex.test(value) || msgValidators.password
}

module.exports = {
    validaNombreApellido,
    validaUsuario,
    validaEmail,
    validaPassword
}