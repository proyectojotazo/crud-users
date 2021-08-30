const inquirer = require('inquirer')
const msgSuperior = require('../../utils/msgSuperior')

const opcionesInicioSesion = [
    {
        type: 'input',
        name: 'user_name',
        message: 'Nombre de Usuario:',
    },
    {
        type: 'password',
        name: 'pass',
        message: 'Contraseña:',
        mask: '*'
    }
]

const iniciarSesion = async () => {
    msgSuperior('Inicio Sesion')
    const data = await inquirer.prompt(opcionesInicioSesion)
    return data
}

module.exports = {
    iniciarSesion
}