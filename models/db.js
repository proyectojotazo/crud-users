const fs = require('fs')
const archivo = './db/data.json'

class DB {

    constructor(){
        this.db = this.cargaDB()
    }

    cargaDB(){

        if (!fs.existsSync(archivo)){
            fs.writeFileSync(archivo, JSON.stringify([]))
        }

        const info = fs.readFileSync(archivo)
        const data = JSON.parse(info)
    
        return data || []

    }

    guardarDB( data ) {
        fs.writeFileSync(archivo, JSON.stringify(data))
    }
}

module.exports = DB