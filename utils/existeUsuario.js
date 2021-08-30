const { underlineRed, green } = require('./colores')

const compruebaUsuario = (user_name = '', pass = '', listaUsuarios = []) => {
  const usuarioEncontrado = existeUsuario(user_name, listaUsuarios)
  if (usuarioEncontrado.length === 0) { // Si no se encuentra el usuario
    console.log()
    console.log(underlineRed('El usuario y/o la contraseña son incorrectas'))
  } else { // Si se encuentra el usuario
    if (passCorrecto(pass, usuarioEncontrado)) { // Si el password coincide
      console.log()
      console.log(green(`Bienvenido a la app ${user_name}`))
    } else { // Si el password no coincide
      console.log()
      console.log(underlineRed('El usuario y/o la contraseña son incorrectas'))
    }
  }
  return usuarioEncontrado // Será un objeto con todos los parametros o []
}

const existeUsuario = (user_name = '', listaUsuarios = []) => {
  // Comprobamos si existe el usuario en la lista de usuarios
  return listaUsuarios.filter(usuario => usuario.nombre_usuario === user_name)[0] || []
}

const passCorrecto = (pass = '', usuarioEncontrado = {}) => {
  // Comprobamos que el password del usuario coincida con el introducido
  return pass === usuarioEncontrado.pass
}

module.exports = {
  compruebaUsuario,
}