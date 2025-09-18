const conexao = require('../conexao')

const criarMaterias = async(nome) => {
    const query = 'INSERT INTO materias(nome) VALUES($1) RETURNING *'

    const valores = [nome]

    const { rows } = await conexao.query(query, valores)
    return rows;
}

const selecionarTodasMaterias = async() => {
    const query = 'SELECT * FROM materias'

    const { rows } = await conexao.query(query)
    return rows
}

module.exports = {
    criarMaterias,
    selecionarTodasMaterias   
}