


const express = require('express')
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize')

// conexão com banco
const sequelize = new Sequelize('db_atv', 'root', '', {
host: 'localhost',
dialect: 'mysql'
})



// FUNCIONARIO
const Funcionario = sequelize.define('Funcionario', {
nome: {
type: DataTypes.STRING,
allowNull: false
},
cpf: {
type: DataTypes.STRING,
allowNull: false,
unique: true
},
data_nascimento: {
type: DataTypes.DATEONLY
},
email: {
type: DataTypes.STRING,
allowNull: false,
unique: true
}
})

// LIVRO
const Livro = sequelize.define('Livro', {
titulo: {
type: DataTypes.STRING,
allowNull: false
},
autor: {
type: DataTypes.STRING,
allowNull: false
},
numero_paginas: {
type: DataTypes.INTEGER
},
preco: {
type: DataTypes.FLOAT
}
})


// RELACIONAMENTO

Funcionario.hasMany(Livro, { foreignKey: 'funcionarioId' })
Livro.belongsTo(Funcionario, { foreignKey: 'funcionarioId' })


// SERVIDOR

const app = express()
app.use(cors())
app.use(express.json())

const port = 3001


// ROTAS FUNCIONARIO


// GET
app.get('/funcionarios', async (req, res) => {
const dados = await Funcionario.findAll()
res.json(dados)
})

// POST
app.post('/funcionarios', async (req, res) => {
try {
const novo = await Funcionario.create(req.body)

res.status(201).json({
message: 'Funcionário criado com sucesso',
funcionario: novo
})
} catch (error) {
res.status(500).json({ erro: error.message })
}
})

// PUT
app.put('/funcionarios/:id', async (req, res) => {
const { id } = req.params

const [updated] = await Funcionario.update(req.body, {
where: { id }
})

if (updated) {
const atualizado = await Funcionario.findByPk(id)
return res.json(atualizado)
}

res.status(404).json({ message: 'Funcionário não encontrado' })
})

// DELETE
app.delete('/funcionarios/:id', async (req, res) => {
    const { id } = req.params

    const deleted = await Funcionario.destroy({
        where: { id }
    })

    if (deleted) {
        return res.status(204).send()
    }

    res.status(404).json({ message: 'Funcionário não encontrado' })
})


// ROTAS LIVRO


// GET (com funcionário)
app.get('/livros', async (req, res) => {
    const dados = await Livro.findAll({
        include: Funcionario
    })
    res.json(dados)
})

// POST
app.post('/livros', async (req, res) => {
    try {
        const novo = await Livro.create(req.body)

        res.status(201).json({
            message: 'Livro criado com sucesso',
            livro: novo
        })
    } catch (error) {
        res.status(500).json({ erro: error.message })
    }
})

// PUT
app.put('/livros/:id', async (req, res) => {
    const { id } = req.params

    const [updated] = await Livro.update(req.body, {
        where: { id }
    })

    if (updated) {
        const atualizado = await Livro.findByPk(id)
        return res.json(atualizado)
    }

    res.status(404).json({ message: 'Livro não encontrado' })
})

// DELETE
app.delete('/livros/:id', async (req, res) => {
    const { id } = req.params

    const deleted = await Livro.destroy({
        where: { id }
    })

    if (deleted) {
        return res.status(204).send()
    }

    res.status(404).json({ message: 'Livro não encontrado' })
})


//servidor


sequelize.sync().then(() => {

    console.log(" Banco rodando sincronizado.")

    app.listen(port, () => {
        console.log(` Servidor rodando na porta ${port}`)
    })

}).catch((error) => {
    console.error('Erro ao sincronizar o banco:')
    console.error(error)
})