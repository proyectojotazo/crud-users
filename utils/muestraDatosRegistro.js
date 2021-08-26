require('colors')

const muestraDatosCodificados = ( data = {} ) => {
    const dataArr = Object.keys(data)
    const x = ['Nombre', 'Apellidos', 'Nombre Usuario', 'Email', 'Contraseña', 'Contraseña Confirmada']
    console.log('\n--- Datos Introducidos ---\n'.green)

    dataArr.forEach( (key, i) => {
        console.log(`${'- '.blue + x[i].blue + ':'.blue} ${data[key].green}`)
    })

    console.log()
}

module.exports = muestraDatosCodificados