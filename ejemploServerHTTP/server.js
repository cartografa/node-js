const http = require('http') 

let contadorVisitas = 0
const server = http.createServer((req, res) => {
    // console.log(req)

    let url = req.url
    let method = req.method

    if (method == 'GET') {
        console.log(method, url)

        if (url == '/') {
            res.writeHead(200, {'content-type': 'text/html'})

            res.write('<h2>Hola, soy un server HTTP en Node.js! <3 </h2>')
            res.write(`<h3>Contador de visitas: ${++contadorVisitas} </h3>`)
            res.write(`<p style="color: olive;">La fecha y hora actual es ${new Date().toLocaleString()}</p>`)
            res.end()
        }
        else if (url == '/reset') {
            contadorVisitas = 0

            res.writeHead(200, {'content-type': 'text/html'})
            res.end('Reset: <b>OK!</b>')
        }
        else {
            res.writeHead(404, {'content-type': 'text/html'})
            res.end(`<h2 style="color: light-blue;">ERROR 404! <br> ${url} no fue encontrada :(</h2>`)
        }
    }
    else {
        res.writeHead(500, {'content-type': 'text/html'})
        res.end(`<h2 style="color: light-blue;">ERROR 500! <br> ${method} no implementado :(</h2>`)
    }

})

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${PORT}`)
})