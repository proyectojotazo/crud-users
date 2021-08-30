const inquirer = require('inquirer')

const msgSuperior = require('../utils/msgSuperior')

const opcionesUsuario = [
    {
        type:'list',
        name:'option',
        message:'Seleccione una opción:\n',
        choices: [
            {
                name:'Mostrar mi perfil',
                value: '1',
            },
            {
                name:'Modificar mis datos',
                value: '2',
            },
            {
                name:'Cerrar Sesión',
                value: '3',
            }
        ]
    }
]

const menuUsuario = async ( usuario = {} ) => {

    msgSuperior('Página Principal')

    const { option: optSelected } = await inquirer.prompt(opcionesUsuario)

    return optSelected
}

module.exports = {
    menuUsuario
}