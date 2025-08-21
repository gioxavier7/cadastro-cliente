const controllerClientes = require('../controller/controllerClientes.js')

// mock da DAO usada no controller (pra não depender do banco)
jest.mock('../model/dao/clientes.js', () => ({
    insertCliente: jest.fn(),
    selectAllClientes: jest.fn(),
    selectByIdCliente: jest.fn(),
    updateCliente: jest.fn(),
    deleteCliente: jest.fn()
}))

const clienteDAO = require('../model/dao/clientes.js')

describe('Controller - Clientes', () => {

    // POST
    test('POST /clientes - deve criar cliente com sucesso', async () => {
        clienteDAO.insertCliente.mockResolvedValue(true)

        const result = await controllerClientes.inserirCliente(
            { nome: "Teste Sucesso", email: "teste@sucesso.com", telefone: "11999998888" },
            'application/json'
        )

        expect(result.status_code).toBe(201)
        expect(result.status).toBe(true)
    })

    // GET ALL
    test('GET /clientes - deve retornar lista de clientes', async () => {
        clienteDAO.selectAllClientes.mockResolvedValue([
            { id: 1, nome: "Giovanna Xavier", email: "giovanna@gmail.com", telefone: "11956568949" }
        ])

        const result = await controllerClientes.listarClientes()
        expect(result.status_code).toBe(200)
        expect(Array.isArray(result.clientes)).toBe(true)
    })

    // GET BY ID
    test('GET /clientes/:id - deve retornar cliente válido', async () => {
        clienteDAO.selectByIdCliente.mockResolvedValue(
            { id: 1, nome: "Giovanna Xavier", email: "giovanna@gmail.com", telefone: "11956568949" }
        )

        const result = await controllerClientes.buscarCliente(1)
        expect(result.status_code).toBe(200)
        expect(result.cliente[0].nome).toBe("Giovanna Xavier")
    })

    // PUT
    test('PUT /clientes/:id - deve atualizar cliente existente', async () => {
        clienteDAO.updateCliente.mockResolvedValue(true)

        const result = await controllerClientes.atualizarCliente(
            1,
            { nome: "Atualizado", email: "atualizado@test.com", telefone: "3333" },
            'application/json'
        )

        expect(result.status_code).toBe(200)
    })

    // DELETE
    test('DELETE /clientes/:id - deve remover cliente existente', async () => {
        clienteDAO.deleteCliente.mockResolvedValue(true)

        const result = await controllerClientes.deletarCliente(1)
        expect(result.status_code).toBe(200)
    })
})
