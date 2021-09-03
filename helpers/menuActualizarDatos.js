const inquirer = require('inquirer')
const separator = new inquirer.Separator()

const msgSuperior = require('../utils/msgSuperior')

const { validaNombreApellido, validaUsuario, validaEmail, validaPassword } = require('../utils/validators')

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
                name: 'Contraseña',
                value: 'pass',
            },
            separator,
            {
                name: 'Atrás',
                value: 'volver'
            },


        ]
    }
]

const devuelvePregunta = (tipo = '') => {
    /**
     * Funcion que nos devolverá la pregunta a realizar para actualizar
     * un campo. El tipo vendrá definido en función de la selección:
     * - nombre
     * - apellidos
     * - user_name
     * - email
     * - pass
    */

    const mensajes = {
        nombre: 'Introduzca el nuevo nombre: ',
        apellidos: 'Introduzca el/los nuevo(s) apellido(s): ',
        nombre_usuario: 'Introduzca el nuevo nombre de usuario: ',
        email: 'Introduzca el nuevo email: ',
        pass: 'Introduzca la nueva contraseña: '
    }

    const validadores = {
        nombre: validaNombreApellido,
        apellidos: validaNombreApellido,
        nombre_usuario: validaUsuario,
        email: validaEmail,
        pass: validaPassword,
    }

    const pregunta = [{
        type: 'input',
        name: tipo,
        message: mensajes[tipo],
        validate(value) {
            return validadores[tipo](value)
        }
    }]

    return pregunta
}

const actualizaDato = async (dato = '') => {

    if (dato !== 'volver') { // Si seleccionamos cualquier opción que no sea volver...
        const pregunta = devuelvePregunta(dato)
        const nuevoDato = await inquirer.prompt(pregunta)
        return nuevoDato[dato]
    }

    return null

}

const menuActualizaDatos = async () => {

    console.log()

    msgSuperior('Actualizar datos')

    const { option: campoSeleccionado } = await inquirer.prompt(opcionesActualizar) // Tendremos el campo seleccionado 'nombre', 'apellidos'...

    const nuevoDato = await actualizaDato(campoSeleccionado) // Tendremos el valor del nuevo campo a actualizar

    const data = {
        nuevoDato, // Será el nuevo dato a introducir en el usuario
        campoSeleccionado, 
        volver: campoSeleccionado === 'volver' ? true : false
    }

    return data
}

module.exports = {
    menuActualizaDatos
}