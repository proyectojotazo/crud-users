const loaderSprites = ['.', '..', '...', '....']
const { white } = require('./colores')

const loader = async () => {
    let i = 4
    let aux = 0

    return await new Promise(resolve => {
        const ID = 
        setInterval(() => {
            console.clear()
            console.log(white(`Registrando usuario${loaderSprites[i++ % 4]}`))
            aux++
            if (aux > 6) {
                clearInterval(ID)
                console.clear()
                console.log(white('Usuario registrado con exito'))
                resolve(true)
            }
        }, 500)    
    })
    
}

module.exports = loader