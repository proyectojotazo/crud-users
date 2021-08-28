require('colors')
//TODO: Cambiar de 'colors' a 'chalk'

const cabeceraSeccion = ( msg = '' ) => {
    let parentesis = ''
    const numParentesis = msg.length + 4

    for (let i = 0; i < numParentesis; i++){
        parentesis += '='
    }

    console.clear()
    console.log(parentesis.blue)
    console.log(`  ${msg.green}  `)
    console.log(parentesis.blue)
    console.log()

}

module.exports = cabeceraSeccion