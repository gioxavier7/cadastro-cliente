/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de clientes
  * Data: 17/04/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de mensagens
const message = require('../modulo/config.js')

//import da dao de clientes pra manipulação de dados
const clienteDAO = require('../model/dao/clientes.js')
const {json} = require('body-parser')

//função para inserir um novo cliente 
const inserirCliente = async function(cliente, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            //validacao de dados obrigatórios
            if(cliente.nome == '' || cliente.nome == undefined || cliente.nome == null || cliente.nome.length > 80 ||
                cliente.email == '' || cliente.email == undefined || cliente.email == null || cliente.email.length > 80 ||
                cliente.telefone == undefined || cliente.telefone == null
            ){
                return message.ERROR_REQUIRE_FIELDS // 400
            }else{
                let resultCliente = await clienteDAO.insertCliente(cliente)

                if(resultCliente)
                    return message.SUCCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                    // console.log(resultCliente)
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//funcao pra listar todos os clientes
const listarClientes = async function(){
    try {
        let dadosClientes = {}

        let resultClientes = await clienteDAO.selectAllClientes()

        if(resultClientes != false || typeof(resultClientes) == 'object'){
            //criando json pra retornar a lista de clientes
            if(resultClientes.length > 0){
                dadosClientes.status = true
                dadosClientes.status_code = 200
                dadosClientes.item = resultClientes.length
                dadosClientes.clientes = resultClientes
                return dadosClientes //200
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//funcao pra buscar cliente pelo id
const buscarCliente = async function(id){
    try {
        let dadosCliente = {}

        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{
            let resultCliente = await clienteDAO.selectByIdCliente(id)

            if(resultCliente != false || typeof(resultCliente) == 'object'){
                if(resultCliente.length > 0){
                    dadosCliente.status = true
                    dadosCliente.status_code = 200
                    dadosCliente.cliente = resultCliente
                    return dadosCliente //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//funcao pra atualizar um cliente
const atualizarCliente = async function(cliente, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            //validacao de dados obrigatórios
            if(cliente.nome == '' || cliente.nome == undefined || cliente.nome == null || cliente.nome.length > 80 ||
                cliente.email == '' || cliente.email == undefined || cliente.email == null || cliente.email.length > 80 ||
                cliente.telefone == '' || cliente.telefone == undefined || cliente.telefone == null
            ){
                return message.ERROR_REQUIRE_FIELDS // 400
            }else{
                //verificar se o cliente existe no banco de dados
                let resultCliente = await buscarCliente(id)

                if(resultCliente.status_code == 200){
                    //update
                    cliente.id = id
                    let result = await clienteDAO.updateCliente(cliente)

                    if(result)
                        return message.SUCCESS_UPDATED_ITEM //200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }else if(resultCliente.status_code == 404){
                    return message.ERROR_NOT_FOUND //404
                }else{
                    return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//funcao pra deletar um cliente
const deletarCliente = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{
            //verificar se o cliente existe no banco de dados
            let resultCliente = await buscarCliente(id)

            if(resultCliente.status_code == 200){
                let result = await clienteDAO.deleteCliente(id)

                if(result)
                    return message.SUCCESS_DELETED_ITEM //200
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }else if(resultCliente.status_code == 404){
                return message.ERROR_NOT_FOUND //404
            }else{
                return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirCliente,
    listarClientes,
    buscarCliente,
    atualizarCliente,
    deletarCliente
}