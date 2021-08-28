require('colors')
//TODO: Cambiar de 'colors' a 'chalk'

const templateUsuario = ( usuario = {} ) => {
    const { nombre, apellidos, nombre_usuario, email, privilegios_usuario } = usuario
    const arrDataUsuario = [nombre, apellidos, nombre_usuario, email, privilegios_usuario]
    const arrTitulos = ['Nombre', 'Apellido(s)', 'Nombre Usuario', 'Email', 'Tipo Usuario']

    console.log()
    arrDataUsuario.forEach((value, i) => {
        console.log(`- ${arrTitulos[i].white}: ${value.green}`)
    }) 
}

module.exports = {
    templateUsuario
}