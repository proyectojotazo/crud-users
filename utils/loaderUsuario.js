const loaderSprites = ['.', '..', '...', '....']
//TODO: Colorear con chalk

const loader = async () => {
    let i = 4
    let aux = 0

    return await new Promise(resolve => {
        const ID = 
        setInterval(() => {
            console.clear()
            console.log(`Registrando usuario${loaderSprites[i++ % 4]}`)
            aux++
            if (aux > 6) {
                clearInterval(ID)
                console.clear()
                console.log('Usuario registrado con exito')
                resolve(true)
            }
        }, 500)    
    })
    
}

module.exports = loader