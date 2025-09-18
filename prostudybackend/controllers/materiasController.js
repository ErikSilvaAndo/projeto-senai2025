const materiasModel = require('../models/materiasModels')

const criarMaterias = async(req, res) => {
    const { nome } = req.body;

    try {
        const materia = await materiasModel.criarMaterias(nome);
        res.json(materia)
    } catch (error) {
        res.status(500).json({erro: 'Erro ao buscar pagamentos', detalhe: error.message})
    }
}

const selecionarTodasMaterias = async(req, res) => {
    try {
        const materia = await materiasModel.selecionarTodasMaterias();
        res.json(materia)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar todas as matérias', detalhe: error.message})
    }
}

module.exports = {
    criarMaterias,
    selecionarTodasMaterias
}