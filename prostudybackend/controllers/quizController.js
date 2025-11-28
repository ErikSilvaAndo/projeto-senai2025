const quizModel = require('../models/quizModels');

const listarQuiz = async (req, res) => {
    try {
        const quiz = await quizModel.listarQuiz()
        res.json(quiz)
    } catch (error) {
        res.status(500).json({erro: 'Erro ao listar os quiz', detalhe: error.message})
    }
}

const criarQuiz = async (req, res) => {
    const { id_materia, titulo, link } = req.body;

    if (!id_materia || !titulo || !link) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

    try {
        const quiz = await quizModel.criarQuiz(id_materia, titulo, link)
        res.json(quiz)
    } catch (error) {
        res.status(500).json({error: 'Erro ao criar o quiz', detalhe: error.message})
    }
}

const editarQuiz = async (req, res) => {
    const { id_quiz } = req.params;
    const { id_materia, titulo, link } = req.body;

    try {
        const quizEditado = await quizModel.editarQuiz(id_quiz, { id_materia, titulo, link });
        res.json(quizEditado)
    } catch (error) {
        res.status(500).json({error: 'Erro ao editar o quiz', detalhe: error.message})
    }
}

const deletarQuiz = async (req, res) => {
    const { id_quiz } = req.params;
    try {
        await quizModel.deletarQuiz(id_quiz)
        res.json({ mensagem: 'Quiz deletado com sucesso' });
    } catch (error) {
        res.status(500).json({error: 'Erro a deletar o quiz', detalhe: error.message})
    }
}

const selecionarIdMateriaPorIdQuiz = async (req, res) => {
    const { id_quiz } = req.params;
    try {
        const quiz = await quizModel.selecionarIdMateriaPorIdQuiz(id_quiz)
        res.json(quiz)
            if (!quiz) {
                return res.status(404).json({ erro: 'Erro ao buscar o quiz', detalhe: error.message})
            }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o quiz pelo id', detalhe: error.message})
    }
}

module.exports = {
    listarQuiz,
    criarQuiz,
    editarQuiz,
    deletarQuiz,
    selecionarIdMateriaPorIdQuiz
}