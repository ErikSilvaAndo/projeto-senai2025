const conexao = require('../conexao');

const adicionarConteudos = async(dados) => {
    const { fk_materia, titulo, imagem, descricao, arquivo } = dados

    const query = 'INSERT INTO conteudos(fk_materia, titulo, imagem, descricao, arquivo) VALUES($1, $2, $3, $4, $5) RETURNING *';

    const { rows } = await conexao.query(query, [fk_materia, titulo, imagem, descricao, arquivo]);
    return rows;
}

const alterarConteudo = async(id_conteudo, dados) => {
    const { fk_materia, titulo, imagem, descricao, arquivo } = dados
    const query = `
        UPDATE conteudos
        SET fk_materia = $1, titulo = $2, imagem = $3, descricao = $4, arquivo = $5
        WHERE id_conteudo = $6 RETURNING *
    `
    const { rows } = await conexao.query(query, [fk_materia, titulo, imagem, descricao, arquivo, id_conteudo])
    return rows[0]
}

const selecionarTodosConteudos = async () => {
    const query = 'SELECT * FROM conteudos';

    const { rows } = await conexao.query(query);
    return rows;
}

const deletarConteudo = async (id_conteudo) => {
    const query = `DELETE FROM conteudos WHERE id_conteudo = $1 RETURNING *`;
    await conexao.query(query, [id_conteudo])
}

module.exports = {
    adicionarConteudos,
    alterarConteudo,
    selecionarTodosConteudos,
    deletarConteudo
}