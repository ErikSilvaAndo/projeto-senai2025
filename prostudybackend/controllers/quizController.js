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
    const { titulo, descricao, link } = req.body;

    try {
        const quiz = await quizModel.criarQuiz(titulo, descricao, link)
        res.json(quiz)
    } catch (error) {
        res.status(500).json({error: 'Erro ao criar o quiz', detalhe: error.message})
    }
}

const editarQuiz = async (req, res) => {
    const { id_quiz } = req.params;
    const { titulo, descricao, link } = req.body;

    try {
        const quizEditado = await quizModel.editarQuiz(id_quiz, { titulo, descricao, link });
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



    // const selecionarPorId = async(req, res) => {
    //     const { id_materia } = req.params;
    //     try {
    //         const materia = await materiasModel.selecionarPorId(id_materia);
    //         if(!materia){
    //             return res.status(404).json({ erro: 'Erro ao buscar materia ', detalhe: error.message})
    //         }
    //         res.status(201).json(materia)
    //     } catch (error) {
    //         res.status(500).json({ erro: 'Erro ao buscar o ID da materia', detalhe: error.message})
    //     }
    // }


module.exports = {
    listarQuiz,
    criarQuiz,
    editarQuiz,
    deletarQuiz
}