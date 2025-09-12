const conexao = require('../conexao')
const bcrypt = require('bcrypt')

const criarUsuario = async(nome, email, senhaHash) => {
    const query = 'INSERT INTO usuarios (email, nome, senha) VALUES ($1, $2, $3) RETURNING email, nome, senha';
    const valores = [nome, email, senhaHash]
    const { rows } = await conexao.query(query, valores)
    return rows[0];
}

const buscarUsuarioPorEmail = async(email) => {
    const query = 'SELECT * FROM usuarios WHERE email = $1'
    const { rows } = await conexao.query(query, [email]);
    return rows[0];
}

const buscarUsuarioPorId = async(id_usuario) => {
    const query = 'SELECT * FROM usuarios WHERE id_usuario = $1'
    const { rows } = await conexao.query(query, [id_usuario]);
    return rows;
};

const selecionarTodosUsuarios = async() => {
    const query = 'SELECT * FROM usuarios';

    const { rows } = await conexao.query(query);
    return rows;
}

const deletarUsuarios = async(id_usuario) => {
    const query = 'DELETE FROM usuarios WHERE id_usuario = $1';
    const { rows } = await conexao.query(query, [id_usuario])
    return rows;
}

const selecionarProfessores = async() => {
    const query = 'SELECT * FROM professores_autorizados'

    const { rows } = await conexao.query(query)
    return rows;
}

const gerarSenhaHash = async(senha) => {
    console.log(bcrypt.hash(senha, 10));
    return bcrypt.hash(senha, 10);
}

const compararSenhas = async(senha, senhaHash) => {
    return bcrypt.compare(senha, senhaHash)
}

module.exports = {
    criarUsuario,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId,
    selecionarTodosUsuarios,
    deletarUsuarios,
    gerarSenhaHash,
    compararSenhas,
    selecionarProfessores
}