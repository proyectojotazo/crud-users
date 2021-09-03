const Usuario = require('./usuario')

const { templateUsuario } = require('../utils/muestraUsuario')

const msgSuperior = require('../utils/msgSuperior')

class ListaUsuarios {

    constructor(){
        this.listado = []
    }

    cargarUsuarios( usuarios = [] ){
        usuarios.forEach(usuario => {
            this.listado.push(usuario)
        })
    }

    agregarUsuario( usuario = {} ){
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

    devuelveUsuario(id = ''){
        return this.listado.find(usuario => usuario.id === id)
    }

    devuelveNombresUsuarios(){
        return this.listado.map(usuario => usuario.nombre_usuario)
    }

    devuelveTipoUsuarios(){
        return this.listado.filter(usuario => usuario.privilegios_usuario === 'Usuario')
    }

    modificaUsuario(antiguoUsuario = {}, nuevoUsuario = {}){

        const indexUsuarioActualizar = this.listado.findIndex( usuario => usuario.nombre === antiguoUsuario.nombre)
        this.listado.splice(indexUsuarioActualizar, 1, nuevoUsuario)

    }

    borraUsuario(idUsuario = ''){
        this.listado = this.listado.filter( usuario => usuario.id !== idUsuario)
    }
}

module.exports = ListaUsuarios