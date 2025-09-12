const conteudosModel = require('../models/conteudosModels');

const adicionarConteudos = async(req, res) => {
    const { fk_materia, titulo, imagem, descricao, arquivo } = req.body;

    try {
        const conteudo = await conteudosModel.adicionarConteudos({ fk_materia, titulo, imagem, descricao, arquivo })
        res.json(conteudo);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar o conteúdo', detalhe: error.message})
    }
}

const alterarConteudo = async(req, res) => {
    const { id_conteudo } = req.params
    const { fk_materia, titulo, imagem, descricao, arquivo } = req.body

    try {
        const conteudo = await conteudosModel.alterarConteudo(id_conteudo, {fk_materia, titulo, imagem, descricao, arquivo})
        res.json(conteudo)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao alterar o conteúdo', detalhe: error.message})
    }
}

const selecionarTodosConteudos = async(req, res) => {
    try {
        const conteudo = await conteudosModel.selecionarTodosConteudos();
        res.json(conteudo)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar todos os conteúdos', detalhe: error.message});
    }
}

const deletarConteudo = async(req, res) => {
    const { id_conteudo } = req.params;
    try {
        await conteudosModel.deletarConteudo(id_conteudo);
            res.json({ mensagem: 'Conteúdo apagado'})
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o conteúdo', detalhe: error.message})
    }
}

module.exports = {
    adicionarConteudos,
    alterarConteudo,
    selecionarTodosConteudos,
    deletarConteudo
}