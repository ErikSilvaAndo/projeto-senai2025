require('dotenv').config();
const express = require('express');
const cors = require('cors');

const conteudosRoutes = require("./routes/conteudosRoutes")
const materiasRoutes = require("./routes/materiasRoutes")
const usuariosRoutes = require("./routes/usuariosRoutes")

const app = express();

app.use(cors())
app.use(express.json());

app.use('/conteudos', conteudosRoutes)
app.use('/materias', materiasRoutes)
app.use('/usuarios', usuariosRoutes)

app.get('/', (req, res) => {
    res.send(`API funcionando!`)
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor executando em: http://localhost:${port}`)
})