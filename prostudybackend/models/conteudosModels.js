const conexao = require('../conexao');

const adicionarConteudos = async(dados) => {
    const { fk_materia, titulo, link, imagem, arquivo } = dados

    const query = 'INSERT INTO conteudos(fk_materia, titulo, link, imagem, arquivo) VALUES($1, $2, $3, $4, $5) RETURNING *';

    const { rows } = await conexao.query(query, [fk_materia, titulo, link, imagem, arquivo]);
    return rows;
}

const alterarConteudo = async(id_conteudo, dados) => {
    const { fk_materia, titulo, link, imagem, arquivo } = dados
    const query = `
        UPDATE conteudos
        SET fk_materia = $1, titulo = $2, link = $3, imagem = $4, arquivo = $5
        WHERE id_conteudo = $6 RETURNING *
    `
    const { rows } = await conexao.query(query, [fk_materia, titulo, link, imagem, arquivo, id_conteudo])
    return rows[0]
}


const selecionarTodosConteudos = async () => {
    const query = 'SELECT * FROM conteudos ORDER BY id_conteudo DESC LIMIT 2';

    const { rows } = await conexao.query(query);
    return rows;
}

const deletarConteudo = async (id_conteudo) => {
    const query = `DELETE FROM conteudos WHERE id_conteudo = $1 RETURNING *`;
    await conexao.query(query, [id_conteudo])
}

const getConteudosPorIdMateria = async(dados) => {
    const { fk_materia } = dados;

    const query = `SELECT * FROM conteudos WHERE fk_materia = $1`

    const { rows } = await conexao.query(query, [fk_materia]);
    return rows;
}

module.exports = {
    adicionarConteudos,
    alterarConteudo,
    selecionarTodosConteudos,
    deletarConteudo,
    getConteudosPorIdMateria,
}