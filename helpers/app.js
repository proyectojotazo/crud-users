const { white } = require('../utils/colores')
//TODO: Cambiar de 'colors' a 'chalk'

const { mainMenu } = require("./mainMenu/mainMenu")
const { iniciarSesion } = require('./mainMenu/inicioSesion')
const { register } = require("./mainMenu/registro")
const { pause } = require("./pause")

const ListaUsuarios = require('../models/listaUsuarios')
const DB = require('../models/db')

const { compruebaUsuario } = require('../utils/existeUsuario')


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
        const dataInicioSesion = await iniciarSesion()
        const { user_name, pass } = dataInicioSesion
        const usuarioEncontrado = compruebaUsuario(user_name, pass, usuarios.listado)
        

        // usuarios.muestraUsuarios()
        break;
      case '2':
        
        // Registro usuarios
        const dataRegistro = await register()
        usuarios.agregarUsuario(dataRegistro)
        db.guardarDB(usuarios.listado) // Guardamos en el .json los usuarios que hay actualmente

        break
    }
    if (optSelected !== '3') await pause() // El 'pause' solo se aplica si no salimos de la app

  } while (optSelected !== '3')

  console.log(white('\nGracias por usar ésta aplicación!\n'))

}

module.exports = app