require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { put, del } = require('@vercel/blob');

const conteudosRoutes = require("./routes/conteudosRoutes")
const materiasRoutes = require("./routes/materiasRoutes")
const usuariosRoutes = require("./routes/usuariosRoutes")
const quizRoutes = require('./routes/quizRoutes')

const app = express();

app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))

app.use('/conteudos', conteudosRoutes)
app.use('/materias', materiasRoutes)
app.use('/usuarios', usuariosRoutes)
app.use('/quiz', quizRoutes)


app.get('/', (req, res) => {
    res.send(`API funcionando!`)
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor executando em: http://localhost:${port}`)
});