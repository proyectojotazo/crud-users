const inquirer = require('inquirer')

const msgSuperior = require('../../utils/msgSuperior')
const { loaderCierreSesion } = require('../../utils/loaders')

const { pause } = require('../pause')
const { templateUsuario } = require('../../utils/muestraUsuario')


const opcionesUsuario = [
    {
        type:'list',
        name:'option',
        message:'Seleccione una opción:\n',
        choices: [
            {
                name:'Mostrar mis datos',
                value: '1',
            },
            {
                name:'Modificar mis datos',
                value: '2',
            },
            {
                name:'Cerrar Sesión',
                value: '3',
            }
        ]
    }
]

const menuUsuario = async ( usuario = {} ) => {

    let optSelected = ''

    do{
        console.clear()
        msgSuperior('Página Principal')
        const selected = await inquirer.prompt(opcionesUsuario)
        optSelected = selected.option

        switch (optSelected) {
            case '1':
                
                templateUsuario(usuario)
                break;

            case '2':
                // modificar datos
                console.log('Modificar mis datos')
                break;
        }
        if (optSelected !== '3') await pause()

    } while (optSelected !== '3')


    await loaderCierreSesion()



    
}

module.exports = {
    menuUsuario
}