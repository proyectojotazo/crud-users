const fs = require('fs')
const archivo = './db/data.json'
// TODO: Usar 'lowdb'

const cargaDB = () => {

    if (!fs.existsSync(archivo)) {
        // Si no existe creamos el archivo vacío
        fs.writeFileSync(archivo, JSON.stringify([]))
    }

    const info = fs.readFileSync(archivo)
    const data = JSON.parse(info)

    return data || []
}

const guardarDB = ( data ) => {
    fs.writeFileSync(archivo, JSON.stringify(data))
}

module.exports = {
    cargaDB,
    guardarDB
}