const { v4: uuidv4 } = require('uuid')

class Usuario {

    constructor(nombre, apellidos, nombre_usuario, email, privilegios_usuario, pass){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.nombre_usuario = nombre_usuario;
        this.email = email
        this.pass = pass
        this.privilegios_usuario = privilegios_usuario 
        this.id = uuidv4()
    }

}

module.exports = Usuario