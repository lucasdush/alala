const express = require('express')
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize')

// conexão com banco
const sequelize = new Sequelize('db_projeto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

// modelo
const Cliente = sequelize.define('Cliente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING
    }
})

// servidor
const app = express()
app.use(cors())
app.use(express.json())

const port = 3001

// rotas
app.get('/clientes', async (req, res) => {
    const todosOsClientes = await Cliente.findAll()
    res.json(todosOsClientes)
})

app.post('/clientes', async (req, res) => {
    try {
        const { nome, email, telefone } = req.body
        const novoCliente = await Cliente.create({ nome, email, telefone })

        res.status(201).json({
            message: 'Cliente criado com sucesso',
            cliente: novoCliente
        })

    } catch (error) {
        res.status(500).json({
            message: 'Erro ao criar cliente',
            error: error.message
        })
    }
})

// iniciar servidor
sequelize.sync().then(() => {

    console.log('👌 Banco rodando sincronizado.')

    app.listen(port, () => {
        console.log(`😎 Servidor rodando na porta ${port}`)
    })

}).catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:')
    console.error(error)
})