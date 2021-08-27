require('colors')

const { mainMenu } = require("./mainMenu")
const { pause } = require("./pause")
const { register } = require("./registro")

const msgSuperior = require('../utils/msgSuperior')

const Db = require('../models/db')


const app = async () => {
    let optSelected = ''
    const db = new Db()
    
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
                    const [ data, confirmed ] = await register()
                    confirm = confirmed.confirmData
                }
                break    
        }
        if (optSelected !== '3') await pause()

    }while (optSelected !== '3')
    
    console.log('\nGracias por usar ésta aplicación!\n'.green)
    
}

module.exports = app