const inquirer = require('inquirer')
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
                value: 'pass'
            },
            {
                name: 'Atrás',
                value: 'volver'
            },


        ]
    }
]

const menuActualizaDatos = async () => {

    console.log()

    msgSuperior('Actualizar datos')

    const campoSeleccionado = await inquirer.prompt(opcionesActualizar) // Tendremos el campo seleccionado 'nombre', 'apellidos'...

    const nuevoDato = await actualizaDato(campoSeleccionado.option) // Tendremos el valor del nuevo campo a actualizar

    return [ nuevoDato, campoSeleccionado.option ]
}

const actualizaDato = async (dato = '') => {

    if (dato !== 'volver') {
        const pregunta = devuelvePregunta(dato)
        const nuevoDato = await inquirer.prompt(pregunta)
        return nuevoDato[dato]
    }

    return null

}

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
        user_name: 'Introduzca el nuevo nombre de usuario: ',
        email: 'Introduzca el nuevo email: ',
        pass: 'Introduzca la nueva contraseña: '
    }

    const validadores = {
        nombre: validaNombreApellido,
        apellidos: validaNombreApellido,
        user_name: validaUsuario,
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


module.exports = {
    menuActualizaDatos
}