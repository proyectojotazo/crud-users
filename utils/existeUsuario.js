const { underlineRed, green } = require('./colores')

const compruebaUsuario = (user_name = '', pass = '', listaUsuarios = []) => {

  const msgErrorLog = 'El usuario y/o la contraseña son incorrectas'
  const msgSuccessLog = `Bienvenido a la app ${user_name}`

  let usuarioEncontrado = existeUsuario(user_name, listaUsuarios)

  if (usuarioEncontrado === null) { // Si no se encuentra el usuario
    console.log()
    console.log(underlineRed(msgErrorLog))
  } else { // Si se encuentra el usuario

    if (passCorrecto(pass, usuarioEncontrado)) { // Si el password coincide
      console.log()
      console.log(green(msgSuccessLog))
    } else { // Si el password no coincide
      console.log()
      console.log(underlineRed(msgErrorLog))
      usuarioEncontrado = null
    }
  }
  
  return usuarioEncontrado // Será un objeto con todos los parametros del usuario o []
}

const existeUsuario = (user_name = '', listaUsuarios = []) => {
  // Comprobamos si existe el usuario en la lista de usuarios
  return listaUsuarios.filter(usuario => usuario.nombre_usuario === user_name)[0] || null
}

const passCorrecto = (pass = '', usuarioEncontrado = {}) => {
  // Comprobamos que el password del usuario coincida con el introducido
  return pass === usuarioEncontrado.pass
}

module.exports = {
  compruebaUsuario,
}