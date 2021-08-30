const loaderSprites = ['.', '..', '...', '....']

const { white } = require('./colores')

const msgLoader = {
    registrar: {
        wait: 'Registrando usuario',
        finished: 'Usuario registrado con exito'
    },
    cerrar: {
        wait: 'Cerrando Sesión',
        finished: 'Sesión cerrada correctamente. Vuelva pronto!'
    },
    actualizar: {
        wait: 'Actualizando Usuario',
        finished: 'Usuario actualizado correctamente!'
    }
}

const loader = async (tipoLoader = '') => {

    let i = 4
    let aux = 0
    
    return await new Promise(resolve => {
        const ID = 
        setInterval(() => {
            console.clear()
            console.log(white(`${msgLoader[tipoLoader].wait}${loaderSprites[i++ % 4]}`))
            aux++
            if (aux > 6) {
                clearInterval(ID)
                console.clear()
                console.log(white(msgLoader[tipoLoader].finished))
                resolve(true)
            }
        }, 500)    
    })   
}

module.exports = {
    loader       
}