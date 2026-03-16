const express = require ('express')
const cors = require ('cors')
const { sequelize, DataTypes} = require ('sequelize')

//configuração da conexao com o banco de dados

const sequelize = new Sequelize('db_projeto', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})


const Cliente = sequelize.define('CLiente', {
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
        type: DataTypes.STRING,

    }
})