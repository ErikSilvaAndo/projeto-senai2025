const conexao = require('../conexao')

const listarQuiz = async () => {
    const query = 'SELECT * FROM quiz';

    const { rows } = await conexao.query(query);

    return rows
}

const criarQuiz = async (titulo, descricao, link) => {
    const query = 'INSERT INTO quiz(titulo, descricao, link) VALUES($1, $2, $3) RETURNING *'

    const valores = [titulo, descricao, link]

    const { rows } = await conexao.query(query, valores)
    return rows
}

const editarQuiz = async (id_quiz, dados) => {
    const { titulo, descricao, link } = dados;
    const query = `
        UPDATE quiz
        SET titulo = $1, descricao = $2, link = $3
        WHERE id_quiz = $4 RETURNING *
    `;
    const { rows } = await conexao.query(query, [titulo, descricao, link, id_quiz])
    return rows[0];
}

const deletarQuiz = async (id_quiz) => {
    const query = 'DELETE FROM quiz WHERE id_quiz = $1'
    await conexao.query(query, [id_quiz]);
}

// const selecionarPorId = async (id_materia) => {
//     const query = 'SELECT id_materia, nome FROM materias WHERE id_materia = $1'
//     const { rows } = await conexao.query(query, [id_materia]);
//     return rows;
// }

module.exports = {
    listarQuiz,
    criarQuiz,
    editarQuiz,
    deletarQuiz
}