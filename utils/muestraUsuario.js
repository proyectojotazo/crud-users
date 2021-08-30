const { white, green } = require('./colores')

const templateUsuario = ( usuario = {} ) => {
    const { nombre, apellidos, nombre_usuario, email, privilegios_usuario } = usuario
    const arrDataUsuario = [nombre, apellidos, nombre_usuario, email, privilegios_usuario]
    const arrTitulos = ['Nombre', 'Apellido(s)', 'Nombre Usuario', 'Email', 'Tipo Usuario']

    console.log()
    arrDataUsuario.forEach((value, i) => {
        console.log(`- ${white(arrTitulos[i])}: ${green(value)}`)
    }) 
}

module.exports = {
    templateUsuario
}