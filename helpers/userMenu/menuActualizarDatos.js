const inquirer = require('inquirer')
const msgSuperior = require('../../utils/msgSuperior')
const { validaNombreApellido, validaUsuario, validaEmail } = require('../../utils/validators')

const opcionesActualizar = [
    {
        type: 'list',
        name: 'option',
        message: 'Seleccione el dato a actualizar:\n',
        choices: [
            {
                name: 'Nombre',
                value: 'nombre'
            },
            {
                name: 'Apellidos',
                value: 'apellidos'
            },
            {
                name: 'Nombre de Usuario',
                value: 'nombre_usuario'
            },
            {
                name: 'Email',
                value: 'email'
            },
            {
                name: 'Atrás',
                value: 'volver'
            },

            
        ]
    }
]

const menuActualizaDatos = async ( ) => {

    console.log()

    msgSuperior('Actualizar datos')

    const campoSeleccionado = await inquirer.prompt(opcionesActualizar) // Tendremos el campo seleccionado 'nombre', 'apellidos'...
    
    const nuevoDato = await actualizaDato(campoSeleccionado.option) // Tendremos el valor del nuevo campo a actualizar

    return [ nuevoDato, campoSeleccionado.option ]
}

const actualizaDato = async ( dato = '' ) => {
    switch (dato) {
        case 'nombre':
            // Cambiar nombre
            return await actualizaNombre()
        case 'apellidos':
            // Cambiar apellidos
            return await actualizaApellidos()
        case 'nombre_usuario':
            // Cambiar nombre usuario
            return await actualizaUsuario() 
        case 'email':
            // Cambiar email
            return await actualizaEmail()            
        case 'volver':
            return null
    }

}

const actualizaNombre = async () => {
    const inpNombre = [
        {
            type: 'input',
            name: 'nombre',
            message: 'Introduzca el nuevo nombre',
            validate(value) {
                return validaNombreApellido(value)
            }
        }
    ]

    const nuevoNombre = await inquirer.prompt(inpNombre)
    return nuevoNombre.nombre
}

const actualizaApellidos = async () => {
    const inpApellidos = [
        {
            type: 'input',
            name: 'apellidos',
            message: 'Introduzca el/los nuevo(s) apellido(s)',
            validate(value) {
                return validaNombreApellido(value)
            }
        }
    ]

    const nuevoApellido = await inquirer.prompt(inpApellidos)
    return nuevoApellido.apellidos
}

const actualizaUsuario = async () => {
    const inpUsuario = [
        {
            type: 'input',
            name: 'user_name',
            message: 'Introduzca el nuevo nombre de usuario',
            validate(value) {
                return validaUsuario(value)
            }
        }
    ]

    const nuevoUsuario = await inquirer.prompt(inpUsuario)
    return nuevoUsuario.user_name
}

const actualizaEmail = async () => {
    const inpEmail = [
        {
            type: 'input',
            name: 'email',
            message: 'Introduzca el nuevo email',
            validate(value) {
                return validaEmail(value)
            }
        }
    ]

    const nuevoEmail = await inquirer.prompt(inpEmail)
    return nuevoEmail.email
}

module.exports = {
    menuActualizaDatos
}