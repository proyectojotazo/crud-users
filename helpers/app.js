const { white } = require('../utils/colores')

const { mainMenu } = require("./mainMenu/mainMenu")
const { iniciarSesion } = require('./mainMenu/inicioSesion')
const { register } = require("./mainMenu/registro")

const { menuUsuario } = require('./userMenu/menuUsuario')
const { menuAdmin } = require('./adminMenu/menuAdmin')

const ListaUsuarios = require('../models/listaUsuarios')
const DB = require('../models/db')

const { compruebaUsuario } = require('../utils/existeUsuario')
const { pause } = require("../utils/pause")


const app = async () => {
  let optSelected = ''

  const db = new DB()
  const usuarios = new ListaUsuarios()

  if (db.db) {
    usuarios.cargarUsuarios(db.db)
  }

  do {
    optSelected = await mainMenu()

    switch (optSelected) {
      case '1':
        // Inicio sesion
        const { user_name, pass } = await iniciarSesion() // Lanzamos el menu de iniciar sesion y obtenemos el nombre de usuario y la contraseña
        const usuarioLogeado = compruebaUsuario(user_name, pass, usuarios.listado) // Comprobamos que el nombre de usuario y la contraseña existan en nuestra base de datos y nos devuelve el usuario

        if (usuarioLogeado !== null) { // En caso de que pase la comprobación pasaremos a logear al usuario

          const { privilegios_usuario, id } = usuarioLogeado // Obtenemos los privilegios para mostrar un menu en funcion de 'Administrador' o 'Usuario'
          
          if (privilegios_usuario === 'Administrador') {
            await menuAdmin(id, usuarios, db)
          } else {
            await menuUsuario(id, usuarios, db)
          }
        }

        break;
      case '2':

        // Registro usuarios
        const dataRegistro = await register()

        usuarios.agregarUsuario(dataRegistro) // Agregamos al listado el nuevo usuario

        db.guardarDB(usuarios.listado) // Guardamos en el .json los usuarios que hay actualmente

        break
    }
    if (optSelected !== '3') await pause() // El 'pause' solo se aplica si no salimos de la app

  } while (optSelected !== '3')

  console.log(white('\nGracias por usar ésta aplicación!\n'))

}

module.exports = app