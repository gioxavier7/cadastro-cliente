/**
 * objetivo: model responsável pelo CRUD de dados de clientes no banco de dados
 * data: 17/04/2025
 * dev: giovanna
 * versão: 1.0
 */

//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//função para inserir um novo cliente
const insertCliente = async function(cliente){
    try {
        let sql = `insert into tbl_cliente(
                                    nome,
                                    email,
                                    telefone
                                ) values(
                                    '${cliente.nome}',
                                    '${cliente.email}',
                                    '${cliente.telefone}'
                                )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//funcao pra atualizar um cliente
const updateCliente = async function(cliente){
    try {
        let sql = `update tbl_cliente set
                                    nome = '${cliente.nome}',
                                    email = '${cliente.email}',
                                    telefone = '${cliente.telefone}'
                                where id = ${cliente.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//funcao pra deletar um cliente
const deleteCliente = async function(id){
    try {
        let sql = `delete from tbl_cliente where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//funcao pra buscar todos os clientes
const selectAllClientes = async function(){
    let sql = 'select * from tbl_cliente order by id desc'

    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result
    else
        return false
}

//funcao pra buscar um cliente pelo id
const selectByIdCliente = async function(id){
    let sql = `select * from tbl_cliente where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result
    else
        return false
}

module.exports = {
    insertCliente,
    updateCliente,
    deleteCliente,
    selectAllClientes,
    selectByIdCliente
}