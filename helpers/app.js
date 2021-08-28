require('colors')
//TODO: Cambiar de 'colors' a 'chalk'

const { mainMenu } = require("./mainMenu")
const { iniciarSesion } = require('./inicioSesion')
const { register } = require("./registro")
const { pause } = require("./pause")



const { cargaDB, guardarDB } = require('./getDatos')

const ListaUsuarios = require('../models/listaUsuarios')
const { existeUsuario, passCorrecto, compruebaUsuario } = require('../utils/existeUsuario')


const app = async () => {
  let optSelected = ''

  const db = cargaDB()
  const usuarios = new ListaUsuarios()

  if (db) {
    usuarios.cargarUsuarios(db)
  }

  do {
    optSelected = await mainMenu()
    
    switch (optSelected) {
      case '1':
        // Inicio sesion
        const dataInicioSesion = await iniciarSesion()
        const { user_name, pass } = dataInicioSesion
        const usuarioEncontrado = compruebaUsuario(user_name, pass, usuarios.listado)
        

        // dataInicioSesion = { user_name: 'XXX', pass: 'XXX}
        // TODO: Comprobar que el usuario existe en la base de datos
        // TODO: Si el usuario existe, comprobar que la contraseña es la de éste
        // TODO: Si la contraseña no es la del usuario, devolverlo al menú principal
        // TODO: Si la contraseña es correcta, mostrar menú de usuario
        /* TODO: 
          Mostrar error si:
          - El usuario no existe 
          - La contraseña introducida no es correcta
        */

        // usuarios.muestraUsuarios()
        break;
      case '2':
        // Registro usuarios
        const dataRegistro = await register()
        usuarios.agregarUsuario(dataRegistro)
        guardarDB(usuarios.listado) // Guardamos en el .json los usuarios que hay actualmente

        break
    }
    if (optSelected !== '3') await pause() // El 'pause' solo se aplica si no salimos de la app

  } while (optSelected !== '3')

  console.log('\nGracias por usar ésta aplicación!\n'.green)

}

module.exports = app