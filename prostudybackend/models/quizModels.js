const conexao = require('../conexao')

const listarQuiz = async () => {
    const query = 'SELECT * FROM quiz';

    const { rows } = await conexao.query(query);

    return rows
}

const criarQuiz = async (id_materia, titulo, link) => {
    const query = 'INSERT INTO quiz(id_materia, titulo, link) VALUES($1, $2, $3) RETURNING *'

    const valores = [id_materia, titulo, link]

    const { rows } = await conexao.query(query, valores)
    return rows
}

const editarQuiz = async (id_quiz, dados) => {
    const { id_materia, titulo, link } = dados;
    const query = `
        UPDATE quiz
        SET id_materia = $1, titulo = $2, link = $3
        WHERE id_quiz = $4 RETURNING *
    `;
    const { rows } = await conexao.query(query, [id_materia, titulo, link, id_quiz])
    return rows[0];
}

const deletarQuiz = async (id_quiz) => {
    const query = 'DELETE FROM quiz WHERE id_quiz = $1'
    await conexao.query(query, [id_quiz]);
}

const selecionarIdMateriaPorIdQuiz = async (id_quiz) => {
    const query = 'SELECT m.nome AS nome_materia FROM quiz q JOIN materias m ON q.id_materia = m.id_materia WHERE q.id_quiz = $1;'
    const { rows } = await conexao.query(query, [id_quiz])
    return rows
}

module.exports = {
    listarQuiz,
    criarQuiz,
    editarQuiz,
    deletarQuiz,
    selecionarIdMateriaPorIdQuiz
}