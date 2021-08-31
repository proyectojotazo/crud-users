const inquirer = require('inquirer')

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
        name: 'Modificar usuarios',
        value: '3'
      },
      {
        name: 'Cerrar Sesión',
        value: '4',
      }
    ]
  }
]

const menuAdmin = async (idAdmin = '', usuarios = [], db) => {
  let optSelected = ''

  do {
    const adminLogeado = usuarios.devuelveUsuario(idAdmin)

    console.clear()
    msgSuperior('Menú Administrador')
    const selected = await inquirer.prompt(opcionesAdmin)
    optSelected = selected.option

    switch (optSelected) {
      case '1':
        // Mostrar datos usuario
        msgSuperior('Mis Datos')
        templateUsuario(adminLogeado)
        break;
      case '2':
        // Modificar datos usuario
        const [nuevoDato, tipoDato] = await menuActualizaDatos() //Recuperamos el nuevo dato y el tipo 'nombre'/'apellido'...

        if (nuevoDato !== null && tipoDato !== 'volver') { // Si no presionamos en volver, nos devolverá ambos datos 
          const usuarioActualizado = { ...adminLogeado } // Creamos una copia del usuario actual logeado
          usuarioActualizado[tipoDato] = nuevoDato // Cambiamos el campo a actualizar
          usuarios.modificaUsuario(adminLogeado, usuarioActualizado) // Modificamos en el listado el usuario a actualizar
          db.guardarDB(usuarios.listado) // Guardamos en la db el nuevo listado con el usuario actualizado
          await loader('actualizar')
        }
        break;
      case '3':

        break;
    }

    if (optSelected !== '4') await pause()
    
  } while (optSelected !== '4');

  await loader('cerrar') // cerramos sesion
}

module.exports = {
  menuAdmin
}