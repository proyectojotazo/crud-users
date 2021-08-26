const inquirer = require('inquirer')

const { validaNombreApellido, validaEmail, validaUsuario } = require('../utils/validators')

const opcionesRegistro = [
    {
        type:'input',
        name:'nombre',
        message:'Introduzca su nombre',
        validate( value ){
            return validaNombreApellido(value)
        }
    },
    {
        type:'input',
        name:'apellidos',
        message:'Introduzca su(s) apellido(s)',
        validate( value ){
            return validaNombreApellido(value)
        }
    },
    {
        type:'input',
        name:'user_name',
        message:'Introduzca el nombre de usuario:',
        validate( value ){
            return validaUsuario( value )
        }
    },
    {
        type:'input',
        name:'email',
        message:'Introduzca su email:',
        validate( value ){
            return validaEmail( value )
        }
    },
    {
        type:'password',
        name:'pass',
        message:'Enter your password',
        mask: '*'
    },
    {
        type:'password',
        name:'pass_confirm',
        message:'Confirm your password',
        mask: '*'
    },
]

const opcionesConfirm = [
    {
        type:'confirm',
        name:'confirmData',
        message:'¿Está de acuerdo con los datos introducidos?',
    }
]

const register = async () => {
    const data = await inquirer.prompt(opcionesRegistro)
    return data
}

const confirmData = async () => {
    const confirmed = await inquirer.prompt(opcionesConfirm)
    return confirmed
}

module.exports = {
    register,
    confirmData
}