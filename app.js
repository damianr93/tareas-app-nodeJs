import colors from 'colors';
import { confirmar, inquirerMenu, leerInput, listadoDeTareasBorrar, mostrarListadoCheckList, pausa } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';

console.clear()

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasleerDB = leerDB();

    if (tareasleerDB) {
        tareas.cargarTareasFromArray(tareasleerDB);
    };

    do {

        opt = await inquirerMenu()
        
        switch( opt ) {
            case '1':
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea(desc)
            break
            case '2':
                tareas.listadoCompleto()
            break
            case '3':
                tareas.listarPendientesCompletadas(true)
            break
            case '4':
                tareas.listarPendientesCompletadas(false)
            break

            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                console.log(ids)
                tareas.toggleCompletadas(ids)
            break

            case '6':
                const id = await listadoDeTareasBorrar(tareas.listadoArr)

                if( id !== '0' ) {
                    const ok = await confirmar(`¿Esta seguro que desea borrar?`)
                    if( ok ) {
    
                        tareas.borrarTarea(id)
                        console.log(id)
                        console.log('tarea borrada')
                    }
                } else continue
        
            break
        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') await pausa()

    } while ( opt !== '0' )  
    

}

main()
