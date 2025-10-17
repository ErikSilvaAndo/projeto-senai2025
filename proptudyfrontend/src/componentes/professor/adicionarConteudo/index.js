import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../../imagens/logoCortada.png'

const Container = styled.div`
    background-color: #131D47;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const VoltarBotao = styled.a`
    text-decoration: none;
    color: #fff;
    font-size: 15px;
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;

    &:hover{
        cursor: pointer;
        text-decoration: underline
    }
`;

const Imagem = styled.img`
    width: 250px;
    height: 150px;
    margin: 10px
`;

const CardLabelInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const Label = styled.label`
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px
`;

const Select = styled.select`
    border-radius: 160px;
    width: 350px;
    height: 50px;
    background-color: #9AECED;
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
`;

const Option = styled.option`
    border-radius: 160px;
    width: 350px;
    height: 50px;
    background-color: #ffffffff;
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
`;

const Input = styled.input`
    border-radius: 160px;
    width: 350px;
    height: 50px;
    background-color: #9AECED;
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
`;

const InputArquivo = styled.input`
`;

const Botao = styled.button`
    font-weight: 1000;
    background-color: #9AECED;
    width: 200px;
    height: 45px;
    border-radius: 50px;
    font-size: 20px;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const CardBotao = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    flex-direction: column;
`;

const converterParaBase64 = (arquivo) => {
    return new Promise((resolver, rejeitar) => {
        const leitor = new FileReader();
        leitor.readAsDataURL(arquivo);
        leitor.onload = () => resolver(leitor.result);
        leitor.onerror = (erro) => rejeitar(erro);
    });
};

const URL_BASE_API = 'http://localhost:3000'; 

const FormularioProduto = ({ aoAdicionarProduto }) => {
    const [titulo, setTitulo] = useState('');
    const [link, setLink] = useState('');
    const [imagem, setImagem] = useState(null);
    const [arquivo, setArquivo] = useState(null);
    const [estaCarregando, setEstaCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(false);
    const [fk_materia, setMateria] = useState('');
    
    // Reseta o estado do formulário
    const resetarFormulario = () => {
        setTitulo('');
        setLink('');
        setImagem(null);
        setArquivo(null);
        setErro('');
    };

    // Função de manipulação do envio
    const aoSubmeter = async (e) => {
        e.preventDefault();
        setErro('');

        if (!titulo || !fk_materia) {
            setErro('Por favor, preencha todos os campos e selecione os arquivos.');
            return;
        }

        setEstaCarregando(true);

        try {
            // 1. Converter arquivos para Base64 antes de enviar
            const imagemBase64 = await converterParaBase64(imagem);
            // const pdfBase64 = await converterParaBase64(arquivo);
            const pdfBase64 ="";

            alert(imagemBase64);
            alert(pdfBase64);

            const resposta = await fetch('http://localhost:3000/conteudos/adicionarConteudos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // As chaves precisam corresponder ao que o backend (app.js) espera
                    fk_materia,
                    titulo: titulo, 
                    link: link,
                    imagem: imagemBase64, 
                    arquivo: pdfBase64,
                }),
            });

            if (!resposta.ok) {
                const dadosErro = await resposta.json();
                throw new Error(dadosErro.error || `Erro HTTP: ${resposta.status}`);
            }

            // Produto cadastrado com sucesso. Reseta o formulário e notifica o App.
            resetarFormulario();
            aoAdicionarProduto(); 

        } catch (err) {
            console.error('Erro ao cadastrar:', err);
            // Mensagem de erro 
            setErro(`Falha ao cadastrar: ${err.message}. Verifique a URL: ${URL_BASE_API}/produtos.`);
        } finally {
            setEstaCarregando(false);
        }
    };

        useEffect (() => {
            const fetchMaterias = async () => {
                try {
                    const resposta = await fetch('http://localhost:3000/materias/selecionarTodasMaterias');
                    if(!resposta.ok){
                        throw new Error(`Erro ao listar todas as matérias: ${resposta.status}`);
                    }
                    const data = await resposta.json();
                    setMateria(data);
                } catch (error) {
                    setErro(error)
                    console.error('Erro ao buscar os dados', error)
                }finally{
                    setLoading(false)
                }
            }
            fetchMaterias();
        }, []);

    return (
        <form 
            onSubmit={aoSubmeter} 
            className="formulario"
        >
            <label htmlFor="materia">MATÉRIA:</label>
                <select id="id_materia" name="id_materia">
                <option value="">Selecione a sua matéria</option>
                    {Array.isArray(fk_materia) &&
                        fk_materia.map(item => (
                    <option key={item.id_materia} value={item.id_materia}>
                        {item.nome}
                    </option>
                    ))}
                </select>


            {/* Nome do Produto */}
            <div className="campo">
                <label className="label-campo">TITÚLO:</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="input-campo"
                    required
                    disabled={estaCarregando}
                />
            </div>

            {/* Link do YouTube */}
            <div className="campo">
                <label className="label-campo">LINK:</label>
                <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="input-campo"
                    required
                    disabled={estaCarregando}
                />
            </div>

            {/* Upload de Imagem */}
            <div className="campo">
                <label className="label-campo">
                    Imagem (PNG/JPG) {imagem && <span className="nome-arquivo-sucesso">({imagem.name})</span>}
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagem(e.target.files[0])}
                    className="input-file"
                    required
                    disabled={estaCarregando}
                />
            </div>

            {/* Upload de PDF */}
            <div className="campo">
                <label className="label-campo">
                    Documento (PDF) {arquivo && <span className="nome-arquivo-sucesso">({arquivo.name})</span>}
                </label>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setArquivo(e.target.files[0])}
                    className="input-file"
                    required
                    disabled={estaCarregando}
                />
            </div>

            {/* Mensagem de Erro */}
            {erro && (
                <div className="mensagem-erro" role="alert">
                    <strong className="font-bold">Erro:</strong>
                    <span className="block sm:inline ml-2">{erro}</span>
                </div>
            )}

            {/* Botão de Envio */}
            <button
                type="submit"
                className="btn-submit"
                disabled={estaCarregando}
            >
                {estaCarregando ? (
                    <>
                        <span className="mr-2">...</span> Cadastrando...
                    </>
                ) : (
                    'Cadastrar Produto'
                )}
            </button>
        </form>
    );
};


const AdicionarMateria = () => {
    const [produtos, setProdutos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    // Função para buscar produtos da API
    const buscarProdutos = async () => {
        setEstaCarregando(true);
        setErro(null);
        try {
            const resposta = await fetch(`http://localhost:3000/conteudos/selecionarTodosConteudos`);
            if (!resposta.ok) {
                throw new Error(`Erro ao buscar: ${resposta.statusText}`);
            }
            const dados = await resposta.json();
            setProdutos(dados);
        } catch (err) {
            console.error("Erro na busca de produtos:", err);
            // Mensagem de erro 
            setErro(`Erro de conexão com a API: ${URL_BASE_API}/produtos. Verifique se o servidor Node.js está rodando.`);
        } finally {
            setEstaCarregando(false);
        }
    };

    // Função para deletar um produto
    const aoDeletar = async (id, titulo) => {
        if (!window.confirm(`Tem certeza que deseja excluir o produto "${titulo}" (ID: ${id})? Esta ação é irreversível e excluirá os arquivos do Vercel Blob.`)) {
            return;
        }

        try {
            const resposta = await fetch(`${URL_BASE_API}/produtos/${id}`, {
                method: 'DELETE',
            });

            if (!resposta.ok) {
                const dadosErro = await resposta.json();
                throw new Error(dadosErro.error || `Erro HTTP: ${resposta.status}`);
            }
            
            // Atualiza a lista removendo o produto deletado (otimista)
            setProdutos(anterior => anterior.filter(p => p.id !== id));

        } catch (err) {
            console.error("Erro ao deletar produto:", err);
            // Mensagem de erro aprimorada
            setErro(`Falha ao excluir produto: ${err.message}. Verifique a URL: ${URL_BASE_API}/produtos/${id}.`);
        }
    };

    // Executa a busca na montagem do componente
    useEffect(() => {
        buscarProdutos();
    }, []);

    return (
        <div className="app-container">
            <style>
                {`
                /* Estilos Globais e Reset Simplificado */
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                body { 
                    margin: 0; 
                    padding: 0;
                    font-family: 'Inter', sans-serif; 
                    background-color: #f9fafb; /* gray-50 */
                }
                .app-container {
                    min-height: 100vh;
                    padding: 2rem 1rem; /* p-4 sm:p-8 */
                    margin: 0 auto;
                }
                
                /* Cabeçalho */
                .header {
                    text-align: center;
                    margin-bottom: 2.5rem; /* mb-10 */
                }
                .header h1 {
                    font-size: 2.25rem; /* text-4xl */
                    font-weight: 900; /* font-black */
                    color: #4f46e5; /* indigo-700 */
                }
                .header p {
                    color: #6b7280; /* gray-500 */
                    margin-top: 0.5rem; /* mt-2 */
                }

                /* Formulário */
                .formulario {
                    background-color: #ffffff;
                    padding: 1.5rem; /* p-6 */
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
                    border-radius: 0.75rem; /* rounded-xl */
                    border-top: 4px solid #6366f1; /* border-t-4 border-indigo-500 */
                    max-width: 32rem; /* max-w-lg */
                    margin-left: auto;
                    margin-right: auto;
                    margin-bottom: 2.5rem; /* mb-10 */
                }
                .formulario-titulo {
                    font-size: 1.5rem; /* text-2xl */
                    font-weight: 800; /* font-extrabold */
                    color: #1f2937; /* gray-800 */
                    margin-bottom: 1.5rem; /* mb-6 */
                    display: flex;
                    align-items: center;
                }
                .formulario-icone {
                    color: #6366f1; /* text-indigo-500 */
                    margin-right: 0.5rem; /* mr-2 */
                    font-size: 1.5rem;
                }
                .campo {
                    margin-bottom: 1rem; /* mb-4 */
                }
                .label-campo {
                    display: block;
                    font-size: 0.875rem; /* text-sm */
                    font-weight: 500; /* font-medium */
                    color: #374151; /* gray-700 */
                    margin-bottom: 0.25rem; /* mb-1 */
                }
                .input-campo {
                    width: 100%;
                    padding: 0.75rem; /* p-3 */
                    border: 1px solid #d1d5db; /* border border-gray-300 */
                    border-radius: 0.5rem; /* rounded-lg */
                    box-sizing: border-box;
                }
                .input-campo:focus {
                    outline: 2px solid #6366f1; /* focus:ring-indigo-500 */
                    border-color: #6366f1; /* focus:border-indigo-500 */
                }
                .input-campo:disabled {
                    background-color: #f3f4f6; /* gray-100 */
                    cursor: not-allowed;
                }
                .input-file {
                    width: 100%;
                    font-size: 0.875rem; /* text-sm */
                    color: #6b7280; /* text-gray-500 */
                    cursor: pointer;
                }
                .input-file::file-selector-button {
                    margin-right: 1rem; /* file:mr-4 */
                    padding: 0.5rem 1rem; /* file:py-2 file:px-4 */
                    border-radius: 0.5rem; /* file:rounded-lg */
                    border: none;
                    font-size: 0.875rem; /* file:text-sm */
                    font-weight: 600; /* file:font-semibold */
                    background-color: #eef2ff; /* file:bg-indigo-50 */
                    color: #4f46e5; /* file:text-indigo-700 */
                    transition: background-color 0.15s;
                }
                .input-file::file-selector-button:hover {
                    background-color: #e0e7ff; /* hover:file:bg-indigo-100 */
                }
                .nome-arquivo-sucesso {
                    font-size: 0.75rem; /* text-xs */
                    color: #059669; /* text-green-600 */
                    margin-left: 0.5rem; /* ml-2 */
                }
                .btn-submit {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.75rem 0; /* py-3 */
                    font-size: 1.125rem; /* text-lg */
                    font-weight: 700; /* font-bold */
                    color: #ffffff;
                    background-color: #4f46e5; /* indigo-600 */
                    border-radius: 0.5rem; /* rounded-lg */
                    transition: background-color 0.15s;
                }
                .btn-submit:hover:not(:disabled) {
                    background-color: #4338ca; /* hover:bg-indigo-700 */
                }
                .btn-submit:disabled {
                    background-color: #818cf8; /* disabled:bg-indigo-400 */
                    cursor: not-allowed;
                }

                /* Mensagens de Erro */
                .mensagem-erro {
                    background-color: #fee2e2; /* bg-red-100 */
                    border: 1px solid #f87171; /* border border-red-400 */
                    color: #b91c1c; /* text-red-700 */
                    padding: 1rem; /* px-4 py-3 */
                    border-radius: 0.5rem; /* rounded-lg */
                    position: relative;
                    margin-bottom: 1rem; /* mb-4 */
                }
                .mensagem-erro strong {
                    font-weight: 700;
                }

                /* Container Principal (Lista) */
                .listagem-container {
                    max-width: 80rem; /* max-w-7xl */
                    margin-left: auto;
                    margin-right: auto;
                }
                .listagem-titulo {
                    font-size: 1.875rem; /* text-3xl */
                    font-weight: 700; /* font-bold */
                    color: #1f2937; /* gray-800 */
                    margin-bottom: 1.5rem; /* mb-6 */
                    border-bottom: 1px solid #e5e7eb; /* border-b */
                    padding-bottom: 0.5rem; /* pb-2 */
                }
                .listagem-grid {
                    display: grid;
                    gap: 1.5rem; /* gap-6 */
                    grid-template-columns: repeat(1, minmax(0, 1fr));
                }
                /* Responsividade da Grid */
                @media (min-width: 640px) { /* sm */
                    .listagem-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }
                @media (min-width: 1024px) { /* lg */
                    .listagem-grid {
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                    }
                }
                @media (min-width: 1280px) { /* xl */
                    .listagem-grid {
                        grid-template-columns: repeat(4, minmax(0, 1fr));
                    }
                }

                /* Card Produto */
                .card-produto {
                    background-color: #ffffff;
                    padding: 1rem; /* p-4 */
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06); /* shadow-lg */
                    border-radius: 0.75rem; /* rounded-xl */
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.3s;
                    border: 1px solid #f3f4f6; /* border border-gray-100 */
                }
                .card-produto:hover {
                    transform: scale(1.02);
                }
                .card-imagem-container {
                    height: 12rem; /* h-48 */
                    overflow: hidden;
                    border-radius: 0.5rem; /* rounded-lg */
                    margin-bottom: 1rem; /* mb-4 */
                    background-color: #f9fafb; /* bg-gray-50 */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .card-imagem {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .card-titulo {
                    font-size: 1.25rem; /* text-xl */
                    font-weight: 700; /* font-bold */
                    color: #1f2937; /* gray-800 */
                    margin-bottom: 0.25rem; /* mb-1 */
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .card-links {
                    display: flex;
                    gap: 0.5rem; /* space-x-2 */
                    margin-top: 0.5rem; /* mt-2 */
                }
                .link-pdf, .link-youtube {
                    flex: 1;
                    padding: 0.25rem 0.75rem; /* px-3 py-1 */
                    font-size: 0.875rem; /* text-sm */
                    font-weight: 500; /* font-medium */
                    color: #ffffff;
                    border-radius: 0.5rem; /* rounded-lg */
                    text-align: center;
                    transition: background-color 0.15s;
                    text-decoration: none;
                }
                .link-pdf {
                    background-color: #dc2626; /* bg-red-600 */
                }
                .link-pdf:hover {
                    background-color: #b91c1c; /* hover:bg-red-700 */
                }
                .link-youtube {
                    background-color: #2563eb; /* bg-blue-600 */
                }
                .link-youtube:hover {
                    background-color: #1d4ed8; /* hover:bg-blue-700 */
                }
                .btn-deletar {
                    margin-top: 1rem; /* mt-4 */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 0.5rem; /* py-2 */
                    font-size: 0.875rem; /* text-sm */
                    font-weight: 600; /* font-semibold */
                    color: #ffffff;
                    background-color: #9ca3af; /* gray-400 */
                    border-radius: 0.5rem; /* rounded-lg */
                    transition: background-color 0.15s;
                    border: none;
                    cursor: pointer;
                }
                .btn-deletar:hover {
                    background-color: #6b7280; /* hover:bg-gray-500 */
                }
                
                /* Carregando/Vazio */
                .status-message {
                    text-align: center;
                    color: #6b7280; /* gray-500 */
                    padding: 2.5rem 0; /* py-10 */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.125rem;
                }
                .status-vazio {
                    background-color: #ffffff;
                    border-radius: 0.75rem;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
                    padding: 5rem 0; /* py-20 */
                }
                .status-vazio p:first-child {
                    font-size: 1.25rem;
                    font-weight: 600;
                }
                
                /* Mensagem de Erro Geral */
                .alerta-erro {
                    background-color: #fee2e2; /* bg-red-200 */
                    color: #b91c1c; /* text-red-800 */
                    padding: 1rem; /* p-4 */
                    border-radius: 0.5rem; /* rounded-lg */
                    margin-bottom: 1.5rem; /* mb-6 */
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .alerta-erro p {
                    display: flex;
                    align-items: center;
                }
                .alerta-erro span {
                    margin-right: 0.5rem;
                }
                .btn-tentar-novamente {
                    color: #dc2626; /* text-red-600 */
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    border: none;
                    background: none;
                    cursor: pointer;
                }
                .btn-tentar-novamente:hover {
                    text-decoration: underline;
                }
                
                /* Animação simplificada para 'Carregando' */
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .status-message .animate-spin {
                    animation: spin 1s linear infinite;
                }
                
                `}
            </style>
            
            {/* Cabeçalho */}
            <header className="header">
                <h1>Catálogo Vercel + Postgres</h1>
                <p>Gerencie imagens e pdfs via Vercel Blob</p>
            </header>

            {/* Formulário de Cadastro */}
            <FormularioProduto aoAdicionarProduto={buscarProdutos} />
            <div className="listagem-container">
                {/* Mensagens de Status */}
                {erro && (
                    <div className="alerta-erro">
                        <p><span className="mr-2 text-xl">❌</span> {erro}</p>
                        <button onClick={buscarProdutos} className="btn-tentar-novamente">
                            Tentar Novamente <span className="ml-1">🔄</span>
                        </button>
                    </div>
                )}

                {/* Carregando Produtos */}
                {estaCarregando && (
                    <div className="status-message">
                        <span className="text-2xl mr-3 animate-spin">🔄</span>
                        Carregando produtos...
                    </div>
                )}

                {/* Lista Vazia */}
                {!estaCarregando && !erro && produtos.length === 0 && (
                    <div className="status-message status-vazio">
                        <p className="text-xl font-semibold">Nenhum produto cadastrado ainda.</p>
                        <p className="mt-2">Use o formulário acima para começar a adicionar itens.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdicionarMateria

// export default function AdicionarMateria() {
//     const [fk_materia, setMateria] = useState('');
//     const [titulo, setTitulo] = useState('');
//     const [link, setLink] = useState('')
//     const [imagem, setImagem] = useState('');
//     const [arquivo, setArquivo] = useState('');
//     const [loading, setLoading] = useState('');
//     const [erro, setErro] = useState(null)

//     const navigate = useNavigate();

//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const executaSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         const idMateriaSelecionada = event.target.id_materia.value;
//         try {
//             const resposta = await fetch('http://localhost:3000/conteudos/adicionarConteudos', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({fk_materia: idMateriaSelecionada, titulo, link, imagem, arquivo }),
//             });
//             if (resposta.ok) {
//                 alert("Matéria adicionado com sucesso!");
//                 navigate(-1);
//             } else {
//                 alert("Erro ao adicionar matéria.");
//             }
//         } catch (error) {
//             console.error("Erro:", error);
//             alert("Erro de conexão.");
//         } finally {
//             setLoading(false);
//         }
//     };

//         useEffect (() => {
//             const fetchMaterias = async () => {
//                 try {
//                     const resposta = await fetch('http://localhost:3000/materias/selecionarTodasMaterias');
//                     if(!resposta.ok){
//                         throw new Error(`Erro ao listar todas as matérias: ${resposta.status}`);
//                     }
//                     const data = await resposta.json();
//                     setMateria(data);
//                 } catch (error) {
//                     setErro(error)
//                     console.error('Erro ao buscar os dados', error)
//                 }finally{
//                     setLoading(false)
//                 }
//             }
//             fetchMaterias();
//         }, []);

//     return (
//         <Container>
//             <Imagem src={Logo} alt="Logo"/>
            
//             <form onSubmit={executaSubmit}>
//                 <CardLabelInput>
//                     <Label htmlFor="materia">MATÉRIA:</Label>
//                     <Select id="id_materia" name="id_materia">
//                         <Option value="">Selecione a sua matéria</Option>
//                         {Array.isArray(fk_materia) &&
//                             fk_materia.map(item => (
//                             <Option key={item.id_materia} value={item.id_materia}>
//                                 {item.nome}
//                             </Option>
//                             ))}
//                     </Select>
//                 </CardLabelInput>
//                 <CardLabelInput>
//                     <Label htmlFor="titulo">TITÚLO:</Label>
//                     <Input
//                         type="text"
//                         id="titulo"
//                         name="titulo"
//                         value={titulo}
//                         onChange={(e) => setTitulo(e.target.value)}
//                         required
//                     />
//                 </CardLabelInput>
//                 <CardLabelInput>
//                     <Label htmlFor="titulo">LINK:</Label>
//                     <Input
//                         type="text"
//                         id="titulo"
//                         name="titulo"
//                         value={link}
//                         onChange={(e) => setLink(e.target.value)}
//                     />
//                 </CardLabelInput>
//                 <CardLabelInput>
//                     <Label htmlFor="imagem">IMAGEM:</Label>
//                     <input
//                         type="file"
//                         id="imagem"
//                         name="imagem"
//                         value={imagem}
//                         onChange={(e) => setImagem(e.target.value)}
//                         required
//                     />
//                 </CardLabelInput>
//                 <CardLabelInput>
//                     <Label htmlFor="arquivo">ARQUIVO:</Label>
//                     <InputArquivo
//                         type="file"
//                         id="arquivo"
//                         name="arquivo"
//                         onChange={handleFileChange}
//                         required
//                     />
//                 </CardLabelInput>
//                 <CardBotao>
//                     <Botao type="submit" disabled={loading}>
//                         {loading ? 'Adicionando...' : 'ADICIONAR'}
//                     </Botao>
//                     <VoltarBotao onClick={() => navigate(-1)}>Voltar</VoltarBotao>
//                 </CardBotao>
//             </form>
//         </Container>
//     );
// }
