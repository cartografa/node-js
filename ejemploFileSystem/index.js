console.log('Inicio del programa')

const fs = require('fs')

// /**********************************************************************/
// /* Lectura / escritura de un archivo en forma sincrónica (bloqueante) */
// /**********************************************************************/

// // datos -> formato buffer sin el 'utf-8'
// try {
//     // leo archivo
//     let datos = fs.readFileSync('../datos.txt', 'utf-8')
//     console.log('RD 1 ok', datos, datos.length)

//     // escribo archivo
//     fs.writeFileSync('../datos.txt', new Date().toLocaleString())
//     console.log('WR ok')

//     // leo archivo
//     datos = fs.readFileSync('../datos.txt', 'utf-8')
//     console.log('RD 2 ok', datos, datos.length)
// }
// catch (error) {
//     console.log('Error en operación sincrónica de fs:', error.message)
// }

// console.log('Otras tareas...')

// /************************************************************************/
// /*Lectura / escritura de un archivo en forma asincrónica (no bloqueante)*/
// /************************************************************************/
// // CON CALLBACKS

// // leo archivo
// fs.readFile('../datos.txt', 'utf-8', (error, datos) => {
//     if (error) {
//         throw new Error(`Error en lectura de archivo: ${error.message}`)
//     }
//     console.log('RD 1 ok', datos, datos.length)

//     // escribo archivo
//     fs.writeFile('../datos.txt', new Date().toLocaleString(), error => {
//         if (error) {
//             throw new Error(`Error en escritura de archivo: ${error.message}`)
//         }
//         console.log('WR ok')

//         // leo archivo
//         fs.readFile('../datos.txt', 'utf-8', (error, datos) => {
//             if (error) {
//                 throw new Error(`Error en lectura de archivo: ${error.message}`)
//             }
//             console.log('RD 2 ok', datos, datos.length)
//         })

//     })
// })

// console.log('Otras tareas...(segunda vez)')

/************************************************************************/
/*Lectura / escritura de un archivo en forma asincrónica (no bloqueante)*/
/************************************************************************/
// CON PROMESAS ---- THEN / CATCH -----

// leo archivo
fs.promises.readFile('../datos.txt', 'utf-8')
.then (datos => {
    console.log('RD 1 ok', datos, datos.length)
    // retorno promesa de escritura
    return fs.promises.writeFile('../datos.txt', new Date().toLocaleString())
})
.then (() => {
    console.log('WR ok')
    // retorno promesa de lectura
    return fs.promises.readFile('../datos.txt', 'utf-8')
})
.then (datos => {
    console.log('RD 2 ok', datos, datos.length)
})
.catch (error => console.log(`Error en operación async: ${error.message}`))

console.log('Otras tareas...(tercera vez)')

// --------- ASYNC / AWAIT ----------
;(async () => {
    try {
        // leo archivo
        let datos = await fs.promises.readFile('../datos.txt', 'utf-8')
        console.log('RD 1 ok', datos, datos.length)
        // escritura
        await fs.promises.writeFile('../datos.txt', new Date().toLocaleString())
        console.log('WR ok')
        // leo
        datos = await fs.promises.readFile('../datos.txt', 'utf-8')
        console.log('RD 2 ok', datos, datos.length)
    }
    catch (error) {
        console.log(`Error en operación async: ${error.message}`)
    }
})()
console.log('Otras tareas...(tercera vez)')

