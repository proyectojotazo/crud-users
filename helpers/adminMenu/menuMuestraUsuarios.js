const inquirer = require('inquirer')
const separator = new inquirer.Separator()

const msgSuperior = require('../../utils/msgSuperior')

const muestraUsuarios = async (listadousuarios = [], tipo = '') => {

    /**
     * Menú donde se mostrarán los usuarios existentes y donde se podrá seleccionar uno de ellos para modificar
     * En caso de que no queramos modificar tenemos la opcion de 'volver' la cual será la que nos devuelva 'null'
     * para, simplemente, volver al menú principal de admin 
     */ 

    const nombresIdUsuarios = listadousuarios.map(usuario => {
        return {
            name: usuario.nombre_usuario,
            value: usuario.id
        }
    })

    nombresIdUsuarios.push(separator)

    nombresIdUsuarios.push({
        name: 'Volver',
        value: 'volver'
    })

    const opcionesUsuarios = [
        {
            type: 'list',
            name: 'user',
            message: `Seleccione el usuario a ${tipo.toLowerCase()}:\n`,
            choices: nombresIdUsuarios
        }
    ]

    console.clear()

    msgSuperior(`${tipo} Usuarios`)

    const { user: userID } = await inquirer.prompt(opcionesUsuarios)

    return userID === 'volver' ? null : userID
}

module.exports = {
    muestraUsuarios
}