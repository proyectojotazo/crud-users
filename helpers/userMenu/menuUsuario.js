const inquirer = require('inquirer')

const { menuActualizaDatos } = require('../menuActualizarDatos')

const msgSuperior = require('../../utils/msgSuperior')
const { loader } = require('../../utils/loader')
const { templateUsuario } = require('../../utils/muestraUsuario')
const { pause } = require('../../utils/pause')


const opcionesUsuario = [
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
        name: 'Cerrar Sesión',
        value: '3',
      }
    ]
  }
]

const menuUsuario = async (idUsuario = '', usuarios = [], db) => {

  let optSelected = ''

  do {
    const usuarioLogeado = usuarios.devuelveUsuario(idUsuario) // Recuperamos el usuario logeado por su id

    console.clear()
    msgSuperior('Página Principal')
    const { option : selected } = await inquirer.prompt(opcionesUsuario)
    optSelected = selected

    switch (optSelected) {
      case '1':
        // Mostrar datos usuario
        msgSuperior('Mis Datos')
        templateUsuario(usuarioLogeado)
        break;

      case '2':
        // Modificar datos usuario
        const [nuevoDato, tipoDato] = await menuActualizaDatos() //Recuperamos el nuevo dato y el tipo 'nombre'/'apellido'...

        if (nuevoDato !== null && tipoDato !== 'volver') { // Si no presionamos en volver, nos devolverá ambos datos 
          const usuarioActualizado = { ...usuarioLogeado } // Creamos una copia del usuario actual logeado
          usuarioActualizado[tipoDato] = nuevoDato // Cambiamos el campo a actualizar
          usuarios.modificaUsuario(usuarioLogeado, usuarioActualizado) // Modificamos en el listado el usuario a actualizar
          db.guardarDB(usuarios.listado) // Guardamos en la db el nuevo listado con el usuario actualizado
          await loader('actualizar')
        }

        break;
    }
    if (optSelected !== '3') await pause()

  } while (optSelected !== '3')

  await loader('cerrar') // Cerramos sesión
}

module.exports = {
  menuUsuario
}