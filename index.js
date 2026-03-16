const express = require ('express')
const cors = require ('cors')
const { sequelize, DataTypes, Sequelize} = require ('sequelize')

//configuração da conexao com o banco de dados

const sequelize = new Sequelize('db_projeto', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})
