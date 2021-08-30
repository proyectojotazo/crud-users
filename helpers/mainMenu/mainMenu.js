const inquirer = require('inquirer')

const msgSuperior = require('../../utils/msgSuperior')

const opcionesMenu = [
    {
        type:'list',
        name:'option',
        message:'Seleccione una opción:\n',
        choices: [
            {
                name:'Iniciar Sesión',
                value: '1',
            },
            {
                name:'Registrarse',
                value: '2',
            },
            {
                name:'Salir',
                value: '3',
            }
        ]
    }
]

const mainMenu = async () => {
    
    msgSuperior('CRUD Usuarios')
      
    const { option: optSelected } = await inquirer.prompt(opcionesMenu)

    return optSelected
}

module.exports = {
    mainMenu
}