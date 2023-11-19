const { default: inquirer } = require('inquirer');

require('colors');

const mostrarMenu = () => {

    return new Promise( resolve => {
        console.clear()
        console.log('=========================='.green)
        console.log('  Seleccione una opcion'.green)
        console.log('==========================]\n'.green)


        console.log(`${'1.'.green} Crear tarea`)
        console.log(`${'2.'.green} listar tareas`)
        console.log(`${'3.'.green} listar tareas completadas`)
        console.log(`${'4.'.green} listar tareas pendientes`)
        console.log(`${'5.'.green} completar tarea(s)`)
        console.log(`${'6.'.green} borrar tarea`)
        console.log(`${'0.'.green} salir`)

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('\nSeleccione una opción:\n', (opt) => {
            readline.close();
            resolve(opt)
        })

    })

}

const pausa = () => {

    return new Promise( resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
            readline.close();
            resolve()
        })

    })

}


module.exports = {
    mostrarMenu,
    pausa
}