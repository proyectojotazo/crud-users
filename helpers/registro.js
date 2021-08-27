const inquirer = require('inquirer')
const loader = require('../utils/loaderUsuario')
require('colors')

const { validaNombreApellido, validaEmail, validaUsuario, validaPassword } = require('../utils/validators')

const opcionesRegistro = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Introduzca su nombre',
        validate(value) {
            return validaNombreApellido(value)
        }
    },
    {
        type: 'input',
        name: 'apellidos',
        message: 'Introduzca su(s) apellido(s)',
        validate(value) {
            return validaNombreApellido(value)
        }
    },
    {
        type: 'input',
        name: 'user_name',
        message: 'Introduzca el nombre de usuario:',
        validate(value) {
            return validaUsuario(value)
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Introduzca su email:',
        validate(value) {
            return validaEmail(value)
        }
    },
    {
        type: 'checkbox',
        name: 'privilegios',
        message: 'Seleccione una opción',
        choices: [
            {
                name: 'Administrador'
            },
            {
                name: 'Usuario'
            }
        ],
        validate(value) {
            if (value.length < 1) {
                return 'Debe seleccionar 1 opción'
            } else if (value.length > 1) {
                return 'Solo puede seleccionar 1 opción'
            }
            return true
        }
    },
    {
        type: 'password',
        name: 'pass',
        message: 'Enter your password',
        mask: '*',
        validate( value ){
            return validaPassword(value)
        }
    },
]

const opcionesConfirm = [
    {
        type: 'confirm',
        name: 'confirmData',
        message: '¿Está de acuerdo con los datos introducidos?',
    }
]

const register = async () => {
    // Muestra los inputs del registro
    const data = await inquirer.prompt(opcionesRegistro) // recogemos todas las respuestas
    await confirmPass(data.pass) // Confirmamos que las contraseñas coincidan comparando la primera con la segunda contraseña
    muestraDatosCodificados(data) // Mostramos los datos introducidos por consola
    const confirmed = await confirmData() // Esperamos la confirmación de los datos por parte del usuario

    if (confirmed.confirmData) {
        await loader() // Falso loader con un setInterval
    }

    return [data, confirmed] // Devolvemos un objeto con todos los parametros y el confirmed para saber si hemos confirmado los datos
}

const confirmPass = async (pass) => {
    // Muestra el input de la confirmación de la contraseña
    // Comprobamos que ambas contraseñas coincidan
    let samePass = false
    while (!samePass) {
        await inquirer.prompt([
            {
                type: 'password',
                name: 'pass',
                message: 'Confirm your password',
                mask: '*',
                validate(value) {
                    if (value !== pass) {
                        return 'Las contraseñas no coinciden'
                    }
                    return true
                }
            },
        ]).then(() => samePass = true)
    }
}

const confirmData = async () => {
    // Muestra el input de confirmación de datos correctos
    const confirmed = await inquirer.prompt(opcionesConfirm)
    return confirmed
}

const muestraDatosCodificados = (data = {}) => {
    const dataArr = Object.keys(data)
    const paramsArr = ['Nombre', 'Apellidos', 'Nombre Usuario', 'Email', 'Permisos Usuario', 'Contraseña']
    console.clear()
    console.log('\n--- Datos Introducidos ---\n'.green)

    dataArr.forEach((key, i) => {
        if (i === 4) {
            console.log(`${'- '.blue + paramsArr[i].blue + ':'.blue} ${data[key][0].green}`)// Los permisos vienen en {permisos:['XXX']}    
        } else {
            console.log(`${'- '.blue + paramsArr[i].blue + ':'.blue} ${data[key].green}`)
        }

    })

    console.log()
}

module.exports = {
    register
}