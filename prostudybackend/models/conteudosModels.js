const conexao = require('../conexao');

const adicionarConteudos = async(dados) => {
    const { fk_materia, titulo, imagem, arquivo } = dados

    const query = 'INSERT INTO conteudos(fk_materia, titulo, imagem, arquivo) VALUES($1, $2, $3, $4) RETURNING *';

    const { rows } = await conexao.query(query, [fk_materia, titulo, imagem, arquivo]);
    return rows;
}

const alterarConteudo = async(id_conteudo, dados) => {
    const { fk_materia, titulo, imagem, arquivo } = dados
    const query = `
        UPDATE conteudos
        SET fk_materia = $1, titulo = $2, imagem = $3, arquivo = $4
        WHERE id_conteudo = $5 RETURNING *
    `
    const { rows } = await conexao.query(query, [fk_materia, titulo, imagem, arquivo, id_conteudo])
    return rows[0]
}

// const atualizarArquivoConteudo = async(dados) =>{
//     const { id_conteudo, fk_materia, titulo, imagem, arquivo } = dados
//     const query = `UPDATE conteudos SET fk_materia = $1, titulo = $2, image`
// }

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