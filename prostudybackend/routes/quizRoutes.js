const express = require('express')
const router = express.Router()
const quizController = require('../controllers/quizController')

router.get('/listarQuiz', quizController.listarQuiz);
router.post('/criarQuiz', quizController.criarQuiz);
router.put('/editarQuiz/:id_quiz', quizController.editarQuiz)
router.delete('/deletarQuiz/:id_quiz', quizController.deletarQuiz)

module.exports = router