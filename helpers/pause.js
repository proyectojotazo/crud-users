const inquirer = require('inquirer')

const opcionPausa = [{
    type: 'input',
    name: 'enter',
    message: `Presione ${ 'ENTER' } para continuar`
}]

const pause = async () => {
    console.log('\n')
    await inquirer.prompt(opcionPausa)
}

module.exports = {
    pause
}