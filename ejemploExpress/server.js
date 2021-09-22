const express = require('express')

console.log(__dirname)

let contadorVisitas = 0
const alumnxs = [
    { id: 1, nombre: 'Jacinto', apellido: 'del Campo', curso: '3B'},
    { id: 2, nombre: 'Inés', apellido: 'Portal', curso: '5B'},
    { id: 3, nombre: 'Malva', apellido: 'Copi', curso: '9A'},
    { id: 4, nombre: 'Juan', apellido: 'del Valle', curso: '3C'}
]

// generar instancia de servidor. factory que devuelve objeto.
const app = express()

// método para parsear paquetes que viene en el body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/* --------- RUTAS GET ----------- */
app.get('/', (req, res) => {
    res.send('Soy una ruta GET')
})

// parametros por ruta
app.get('/persona/:nombre/:apellido?/:edad?', (req, res) => {
    let { nombre, apellido, edad } = req.params
    console.log({ nombre, apellido, edad })
    res.json({ tipo: 'params', nombre, apellido, edad })
})

// query params
app.get('/persona', (req, res) => {
    let { nombre, apellido, edad } = req.query
    console.log({ nombre, apellido, edad })
    res.json({ tipo: 'query', nombre, apellido, edad })
})


// ':' sirve para parámetros de ruta

// buscando por id con findIndex
app.get('/alumnxs-id-a/:id?', (req, res) => {
    let { id } = req.params
    let idx = alumnxs.findIndex(a => a.id == id)
    console.log(id, idx)
    res.json(idx !== -1 ? alumnxs[idx] : alumnxs)
})

// buscando por id con find
app.get('/alumnxs-id-b/:id?', (req, res) => {
    let { id } = req.params
    let alumnx = alumnxs.find(a => a.id == id)
    console.log(id, alumnx)
    res.json(alumnx ? alumnx : alumnxs)
})

// buscando por index
app.get('/alumnxs/:idx?', (req, res) => {
    let { idx } = req.params
    //res.send(alumnxs)
    res.json(idx ? alumnxs[idx] : alumnxs)
})

app.get('/page', (req, res) => { 
    res.sendFile(`${__dirname}/public/index.html`)
})

app.get('/vistas', (req, res) => {
    res.send(`<h1>Hola, sos el visitante número <b>${++contadorVisitas}</b></h1>`)
})

app.get('/reset', function (req, res) {
    contadorVisitas = 0
    res.send('Ok, reset!')
})

// para todas las capas no implementadas:
app.get('*', (req, res) => {
    let {url} = req
    res.send(`<h1>ERROR :(</h1>
              <h2>La ruta ${url} no está implementada</h2>`)
})


/* --------- RUTAS POST ----------- */
app.post('/', (req, res) => {
    res.send('Soy una ruta POST')
})

app.post('/persona', (req, res) => {
    console.log('req.body', req.body)

    let { nombre, apellido, edad } = req.body
    // res.json( { nombre, apellido, edad } )
    res.redirect('/page')
})

app.post('*', (req, res) => {
    let {url} = req
    res.send(`<h1>ERROR :(</h1>
              <h2>La ruta ${url} no está implementada</h2>`)
})


/* --------- RUTAS PUT ----------- */
app.put('/', (req, res) => {
    res.send('Soy una ruta PUT')
})

app.put('*', (req, res) => {
    let {url} = req
    res.send(`<h1>ERROR :(</h1>
              <h2>La ruta ${url} no está implementada</h2>`)
})


/* --------- RUTAS DELETE    ----------- */
app.delete('/', (req, res) => {
    res.send('Soy una ruta DELETE')
})

app.delete('*', (req, res) => {
    let {url} = req
    res.send(`<h1>ERROR :(</h1>
              <h2>La ruta ${url} no está implementada</h2>`)
})


const PORT = 8080
app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})