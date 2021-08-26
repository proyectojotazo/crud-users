require('colors')

const { mainMenu } = require("./mainMenu")
const { pause } = require("./pause")
const { register, confirmData } = require("./registro")

const msgSuperior = require('../utils/msgSuperior')

const muestraDatosCodificados = require('../utils/muestraDatosRegistro')
const loader = require('../utils/loaderUsuario')


const app = async () => {
    let optSelected = ''

    do{
        optSelected = await mainMenu()
        switch (optSelected) {
            case '1':
                // Inicio sesion
                break;
            case '2':
                // Registro
                let confirm = false
                
                while(!confirm){
                    msgSuperior('Registro nuevo usuario')
                    const data = await register()
                    muestraDatosCodificados(data)
                    const resp = await confirmData()
                    confirm = resp.confirmData
                    if (confirm){
                        // Registrar usuario en BBDD

                        await loader()
                        
                    }
                }
                break    
        }
        if (optSelected !== '3') await pause()

    }while (optSelected !== '3')
    
    console.log('\nGracias por usar ésta aplicación!\n'.green)
    
}

module.exports = app