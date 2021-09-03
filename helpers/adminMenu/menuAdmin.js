const inquirer = require('inquirer')

const { menuActualizaDatos } = require('../menuActualizarDatos')
const { muestraUsuarios } = require('./menuMuestraUsuarios')

const msgSuperior = require('../../utils/msgSuperior')
const { loader } = require('../../utils/loader')
const { templateUsuario } = require('../../utils/muestraUsuario')
const { pause } = require('../../utils/pause')
const { green } = require('../../utils/colores')

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

    //Obtener el administrador logeado
    const adminLogeado = usuarios.devuelveUsuario(idAdmin)

    //Obtener el listado de todos los usuarios
    const listadoUsuarios = usuarios.devuelveTipoUsuarios()

    console.clear()
    msgSuperior('Menú Administrador')

    await inquirer.prompt(opcionesAdmin).then(({ option }) => optSelected = option)

    switch (optSelected) {
      
      case '1':
        // Mostrar datos propios
        msgSuperior('Mis Datos')
        templateUsuario(adminLogeado)

        break;

      case '2':
        // Modificar datos propios

        await menuActualizaDatos().then(async ({ nuevoDato, campoSeleccionado, volver }) => {

          if (!volver) {
            const adminActualizado = { ...adminLogeado }
            adminActualizado[campoSeleccionado] = nuevoDato

            usuarios.modificaUsuario(adminLogeado, adminActualizado)
            db.guardarDB(usuarios.listado)

            await loader('actualizar')
          }

        })

        break;

      case '3':
        // Modificar usuario
        if (listadoUsuarios.length === 0) {
          console.log()
          console.log(green('No hay usuarios resgistrados'))
          break
        }

        const userID = await muestraUsuarios(listadoUsuarios, 'Modificar')

        if (!userID) break

        const usuarioAmodificar = usuarios.devuelveUsuario(userID)
        
        await menuActualizaDatos().then(async ({ nuevoDato, campoSeleccionado, volver }) => {
          if (!volver) {

            const usuarioActualizado = { ...usuarioAmodificar }
            usuarioActualizado[campoSeleccionado] = nuevoDato

            usuarios.modificaUsuario(usuarioAmodificar, usuarioActualizado) // Modificamos en el listado el usuario a actualizar
            db.guardarDB(usuarios.listado) // Guardamos en la db el nuevo listado con el usuario actualizado

            await loader('actualizar')
          }
        })
       
        break;

      case '4':
        // Eliminar usuarios

        if (listadoUsuarios.length === 0) {
          console.log()
          console.log(green('No hay usuarios resgistrados'))
          break
        }

        await muestraUsuarios(listadoUsuarios, 'Borrar').then( async ( data ) => {
          if(data){
            usuarios.borraUsuario(data)
            db.guardarDB(usuarios.listado)
            await loader('borrar')
          }
        })

        break;
    }

    if (optSelected !== '5') await pause()

  } while (optSelected !== '5');

  await loader('cerrar') // cerramos sesion
}

module.exports = {
  menuAdmin
}