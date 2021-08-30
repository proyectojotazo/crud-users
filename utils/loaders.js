const loaderSprites = ['.', '..', '...', '....']
const { white } = require('./colores')

let i = 4
let aux = 0

const loaderRegistro = async () => {
    
    return await new Promise(resolve => {
        const ID = 
        setInterval(() => {
            console.clear()
            console.log(white(`Registrando usuario${loaderSprites[i++ % 4]}`))
            aux++
            if (aux > 6) {
                clearInterval(ID)

                // Reiniciamos las variables
                i = 4
                aux = 0

                console.clear()
                console.log(white('Usuario registrado con exito'))
                resolve(true)
            }
        }, 500)    
    })   
}

const loaderCierreSesion = async () => {
    return await new Promise(resolve => {
        const ID = 
        setInterval(() => {
            console.clear()
            console.log(white(`Cerrando Sesión${loaderSprites[i++ % 4]}`))
            aux++
            if (aux > 6) {
                clearInterval(ID)

                // Reiniciamos las variables
                i = 4
                aux = 0

                console.clear()
                console.log(white('Sesión cerrada correctamente. Vuelva pronto!'))
                resolve(true)
            }
        }, 500)    
    })
}

module.exports = {
    loaderRegistro,
    loaderCierreSesion
}