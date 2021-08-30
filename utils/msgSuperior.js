const { blue, green } = require('./colores') 

const cabeceraSeccion = ( msg = '' ) => {
    let parentesis = ''
    const numParentesis = msg.length + 4

    for (let i = 0; i < numParentesis; i++){
        parentesis += '='
    }

    console.clear()
    console.log(blue(parentesis))
    console.log(`  ${green(msg)}  `)
    console.log(blue(parentesis))
    console.log()

}

module.exports = cabeceraSeccion