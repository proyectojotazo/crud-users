const chalk = require('chalk')

const compruebaUsuario = (user_name = '', pass = '', listaUsuarios = []) => {
    const usuarioEncontrado = existeUsuario(user_name, listaUsuarios)
    if (usuarioEncontrado.length === 0){
        console.log()
        console.log(chalk.red('El usuario y/o la contraseña son incorrectas'))
      } else {
        if(passCorrecto(pass, usuarioEncontrado)){
          console.log()
          console.log(chalk.green(`Bienvenido a la app ${user_name}`))
        } else {
          console.log()
          console.log(chalk.red('El usuario y/o la contraseña son incorrectas'))
        }
      }
    return usuarioEncontrado
}

const existeUsuario = ( user_name = '', listaUsuarios = [] ) => {
    return listaUsuarios.filter(usuario => usuario.nombre_usuario === user_name)[0] || []
}

const passCorrecto = ( pass = '', usuarioEncontrado = {} ) => {
    return pass === usuarioEncontrado.pass
}

module.exports = {
    compruebaUsuario,
}