const express = require('express')
const router = express.Router()
const materiasController = require('../controllers/materiasController')

router.post('/criarMaterias', materiasController.criarMaterias);
router.get('/selecionarTodasMaterias', materiasController.selecionarTodasMaterias);


module.exports = router