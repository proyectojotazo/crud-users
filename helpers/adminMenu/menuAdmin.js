const inquirer = require('inquirer')

const { menuActualizaDatos } = require('../menuActualizarDatos')
const { muestraUsuariosModif } = require('./menuMuestraUsuariosModif')

const msgSuperior = require('../../utils/msgSuperior')
const { loader } = require('../../utils/loader')
const { templateUsuario } = require('../../utils/muestraUsuario')
const { pause } = require('../../utils/pause')

const opcionesAdmin = [
  {
    type: 'list',
    name: 'option',
    message: 'Seleccione una opción:\n',
    choices: [
      {
        name: 'Mostrar mis datos',
        value: '1',
      },
      {
        name: 'Modificar mis datos',
        value: '2',
      },
      {
        name: 'Modificar usuario',
        value: '3'
      },
      {
        name: 'Eliminar usuario(s)',
        value: '4',
      },
      {
        name: 'Cerrar sesión',
        value: '5'
      }
    ]
  }
]

const menuAdmin = async (idAdmin = '', usuarios = [], db) => {
  let optSelected = ''


  do {
    const adminLogeado = usuarios.devuelveUsuario(idAdmin)

    // Conseguir el listado de todos los usuarios
    const listadoUsuarios = usuarios.devuelveTipoUsuarios()

    console.clear()
    msgSuperior('Menú Administrador')
    const { option : selected } = await inquirer.prompt(opcionesAdmin)
    optSelected = selected

    switch (optSelected) {
      case '1':
        // Mostrar datos usuario
        msgSuperior('Mis Datos')
        templateUsuario(adminLogeado)
        break;
        
      case '2':
        // Modificar datos Administrador
        const [nuevoDato, tipoDato] = await menuActualizaDatos() //Recuperamos el nuevo dato y el tipo 'nombre'/'apellido'...

        if (nuevoDato !== null && tipoDato !== 'volver') { // Si no presionamos en volver, nos devolverá ambos datos 
          const usuarioActualizado = { ...adminLogeado } // Creamos una copia del administrador actual logeado
          usuarioActualizado[tipoDato] = nuevoDato // Cambiamos el campo a actualizar
          usuarios.modificaUsuario(adminLogeado, usuarioActualizado) // Modificamos en el listado el administrador a actualizar
          db.guardarDB(usuarios.listado) // Guardamos en la db el nuevo listado con el administrador actualizado
          await loader('actualizar')
        }
        break;
      case '3':
        // Modificar usuario

        // Mostramos usuarios y obtenemos el id del usuario a modificar
        const idUserSelected = await muestraUsuariosModif(listadoUsuarios)
        // Importante! idUserSelected puede ser un id o 'null'
        
        if (!idUserSelected) break 
        // Obtenemos el usuario a modificar
        const usuarioAmodificar = usuarios.devuelveUsuario(idUserSelected)
        
        // Mostramos si queremos actualizar algún campo del mismo o queremos eliminarlo o volver a la selección de usuario
        const [nuevoDatoUsuario, tipoDatoUsuario] = await menuActualizaDatos() //Recuperamos el nuevo dato y el tipo 'nombre'/'apellido'...

        if (nuevoDatoUsuario !== null && tipoDatoUsuario !== 'volver') { // Si no presionamos en volver, nos devolverá ambos datos 
          const usuarioActualizado = { ...usuarioAmodificar } // Creamos una copia del usuario actual logeado
          usuarioActualizado[tipoDatoUsuario] = nuevoDatoUsuario // Cambiamos el campo a actualizar
          usuarios.modificaUsuario(usuarioAmodificar, usuarioActualizado) // Modificamos en el listado el usuario a actualizar
          db.guardarDB(usuarios.listado) // Guardamos en la db el nuevo listado con el usuario actualizado
          await loader('actualizar')
        }
        break;
      case '4':
        // Eliminar usuarios


        break;
    }

    if (optSelected !== '5') await pause()

  } while (optSelected !== '5');

  await loader('cerrar') // cerramos sesion
}

module.exports = {
  menuAdmin
}