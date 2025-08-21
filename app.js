/**
 * Objetivo: API responsável pelas requisições do projeto de controle de músicas
 * Data: 13/02/2025
 * Dev: giovanna
 * Versões: 1.0      
 */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//importando o arquivo de controller
const controllerClientes = require('./controller/controllerClientes.js')

//criando formato de dados que será recebido no body da requisição (POST/PUT)
const bodyParserJSON = bodyParser.json()

//criando o objeto app para criar a API
const app = express()

//configuração do CORS
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

//endpoint para inserir um cliente
app.post('/v1/cadastro-clientes/clientes', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formao de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerClientes.inserirCliente(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de cliente
app.get('/v1/cadastro-clientes/clientes', cors(), async function(request, response){

    //chama a função para retornar uma lista de clientes
    let result = await controllerClientes.listarClientes()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar uma cliente pelo id
app.get('/v1/cadastro-clientes/clientes/:id', cors(), async function(request, response){

    let idCliente = request.params.id

    let result = await controllerClientes.buscarCliente(idCliente)

    response.status(result.status_code)
    response.json(result)

})

// endpoint para deletar um cliente
app.delete('/v1/cadastro-clientes/clientes/:id', cors(), async function(request, response){
    let idCliente = request.params.id

    let result = await controllerClientes.deletarCliente(idCliente)

    response.status(result.status_code)
    response.json(result)
})

//endpoint pr atualizar um cliente
app.put('/v1/cadastro-clientes/clientes/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idCliente = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerClientes.atualizarCliente(dadosBody, idCliente, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.listen(8080, function(){
    console.log('Servidor aguardando novas requisições...')
})