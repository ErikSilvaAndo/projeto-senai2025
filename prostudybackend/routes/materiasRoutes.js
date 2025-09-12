const express = require('express')
const router = express.Router()
const materiasController = require('../controllers/materiasController')

router.post('/criarMaterias', materiasController.criarMaterias)


module.exports = router