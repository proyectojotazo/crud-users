const inquirer = require('inquirer')

const msgSuperior = require('../../utils/msgSuperior')

const muestraUsuariosModif = async (listadousuarios = []) => {

    const nombresIdUsuarios = listadousuarios.map(usuario => {
        return {
            name: usuario.nombre,
            value: usuario.id
        }
    })

    nombresIdUsuarios.push({
        name: 'Volver',
        value: 'volver'
    })

    const opcionesModificaUsuario = [
        {
            type: 'list',
            name: 'user',
            message: 'Seleccione el usuario a modificar:\n',
            choices: nombresIdUsuarios
        }
    ]

    console.clear()

    msgSuperior('Modificar Usuarios')

    const usuarioSeleccionado = await inquirer.prompt(opcionesModificaUsuario)

    return usuarioSeleccionado
}

module.exports = {
    muestraUsuariosModif
}