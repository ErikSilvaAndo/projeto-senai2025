const { json } = require('express');
const conteudosModel = require('../models/conteudosModels');

const uploadBase64ToStorage = async (dataUrl) => {
    if (!dataUrl || !dataUrl.startsWith('data:')) {
        throw new Error("Formato de Base64 inválido.");
    }

    const parts = dataUrl.split(';base64,');
    if (parts.length !== 2) {
        throw new Error("Base64 malformado.");
    }
    const mimeType = parts[0].split(':')[1];
    const base64Data = parts[1];
    const fileBuffer = Buffer.from(base64Data, 'base64');
    
    // Nomes de variáveis 
    const extensaoMapeada = {
        'image/png': 'png',
        'image/jpeg': 'jpg',
        'application/pdf': 'pdf',
        'image/svg+xml': 'svg',
    };
    const extensao = extensaoMapeada[mimeType] || 'bin';
    
    // Gera nome de arquivo único (chave única no Vercel Blob)
    const NomeArquivo = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${extensao}`;

    // Salva no Vercel Blob
    const resultado = await put(NomeArquivo, fileBuffer, {
        access: 'public', // Permite acesso público via URL
        contentType: mimeType // Define o tipo de conteúdo
    });

    // Retorna a URL pública gerada pelo Vercel Blob
    return resultado.url;
};

const adicionarConteudos = async(req, res) => {
    const { fk_materia, titulo, link, imagem, arquivo } = req.body;

    if (!titulo || !fk_materia) {
        return res.status(400).json({ error: "Todos os campos (fk_materia, nome) são obrigatórios." });
    }

    let finalImageUrl, finalPdfUrl;

    const ProdutoFormatado = {
        fk_materia: fk_materia,
        titulo: titulo,
        link: link,
        imagem: finalImageUrl,
        arquivo: finalPdfUrl
        };

    try {
        const conteudo = await conteudosModel.adicionarConteudos({ fk_materia, titulo, link, imagem, arquivo })
        finalImageUrl = await uploadBase64ToStorage(imagem);
        finalPdfUrl = await uploadBase64ToStorage(arquivo);
        res.json(conteudo, ProdutoFormatado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar o conteúdo', detalhe: error.message})
    }
}

const alterarConteudo = async(req, res) => {
    const { id_conteudo } = req.params
    const { fk_materia, titulo, link, imagem, arquivo } = req.body

    try {
        const conteudo = await conteudosModel.alterarConteudo(id_conteudo, { fk_materia, titulo, link, imagem, arquivo })
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

const getConteudosPorIdMateria = async(req, res) => {
    const { fk_materia } = req.params;
    try {
        const conteudo = await conteudosModel.getConteudosPorIdMateria({fk_materia})
        res.json(conteudo);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o conteudo por id da matéria', detalhe: error.message})
    }
}

module.exports = {
    adicionarConteudos,
    alterarConteudo,
    selecionarTodosConteudos,
    deletarConteudo,
    getConteudosPorIdMateria
}