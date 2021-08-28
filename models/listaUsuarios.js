const Usuario = require('./usuario')

const { templateUsuario } = require('../utils/muestraUsuario')

const msgSuperior = require('../utils/msgSuperior')

class ListaUsuarios {

    constructor(){
        this.listado = []
    }

    cargarUsuarios( usuarios = []){
        usuarios.forEach(usuario => {
            this.listado.push(usuario)
        })
    }

    agregarUsuario(usuario = {}){
        const { nombre, apellidos, user_name, email, privilegios, pass } = usuario
        const nuevoUsuario = new Usuario(nombre, apellidos, user_name, email, privilegios[0], pass)
        this.listado.push(nuevoUsuario)
    }

    muestraUsuarios(){
        msgSuperior('Listado de Usuarios')

        if (this.listado.length === 0){ // Si no hay ningún registro
            console.log()
            console.log('No hay registros')
            console.log()

        } else { // Si hay registros
            this.listado.forEach( usuario => {
                // console.log(usuario)
                templateUsuario(usuario)
            })
        }
        
    }
}

module.exports = ListaUsuarios