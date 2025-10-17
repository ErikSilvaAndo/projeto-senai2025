require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { put, del } = require('@vercel/blob');

const conteudosRoutes = require("./routes/conteudosRoutes")
const materiasRoutes = require("./routes/materiasRoutes")
const usuariosRoutes = require("./routes/usuariosRoutes")

const app = express();

app.use(cors())
// app.use(express.json());
//app.use(express.urlencoded({ limit: "500000000mb", extended: true, parameterLimit: 500000000000 }))
//app.use(express.json({ limit: "500000000mb", extended: true, parameterLimit: 500000000000 }))
app.use(bodyParser.json({ limit: "50mb" }))

app.use('/conteudos', conteudosRoutes)
app.use('/materias', materiasRoutes)
app.use('/usuarios', usuariosRoutes)


app.get('/', (req, res) => {
    res.send(`API funcionando!`)
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor executando em: http://localhost:${port}`)
});

// const uploadBase64ToStorage = async (dataUrl) => {
//     if (!dataUrl || !dataUrl.startsWith('data:')) {
//         throw new Error("Formato de Base64 inválido.");
//     }

//     const parts = dataUrl.split(';base64,');
//     if (parts.length !== 2) {
//         throw new Error("Base64 malformado.");
//     }
//     const mimeType = parts[0].split(':')[1];
//     const base64Data = parts[1];
//     const fileBuffer = Buffer.from(base64Data, 'base64');
    
//     // Nomes de variáveis 
//     const extensaoMapeada = {
//         'image/png': 'png',
//         'image/jpeg': 'jpg',
//         'application/pdf': 'pdf',
//         'image/svg+xml': 'svg',
//     };
//     const extensao = extensaoMapeada[mimeType] || 'bin';
    
//     // Gera nome de arquivo único (chave única no Vercel Blob)
//     const NomeArquivo = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${extensao}`;

//     // Salva no Vercel Blob
//     const resultado = await put(NomeArquivo, fileBuffer, {
//         access: 'public', // Permite acesso público via URL
//         contentType: mimeType // Define o tipo de conteúdo
//     });

//     // Retorna a URL pública gerada pelo Vercel Blob
//     return resultado.url;
// };

// module.exports ={
//     uploadBase64ToStorage
// }