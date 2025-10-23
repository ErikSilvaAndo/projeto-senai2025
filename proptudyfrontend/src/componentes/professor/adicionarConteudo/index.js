import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    width: 100%;
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
    width: 100%;
    height: 50px;
    background-color: #9AECED;
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
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

const LabelArquivo = styled.label`
    display: inline-block;
    background-color: #9AECED;
    color: #000;
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    border-radius: 50px;
    padding: 12px 25px;
    cursor: pointer;
    width: 350px;
    transition: 0.3s;
    margin-bottom: 8px;
`;

const InputArquivo = styled.input`
    display: none; /* Esconde o input padrão */
`;

const LogoImagem = styled.img`
    width: 400px;
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

    const id_materia = useParams();

    const navigate = useNavigate();
    
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
            const imagemBase64 = await converterParaBase64(imagem);
            const pdfBase64 = await converterParaBase64(arquivo);

            const resposta = await fetch('http://localhost:3000/conteudos/adicionarConteudos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // As chaves precisam corresponder ao que o backend (app.js) espera
                    fk_materia: id_materia,
                    titulo: titulo, 
                    link: link,
                    imagem: imagemBase64, 
                    arquivo: pdfBase64,
                }),
            });

            if(resposta.ok){
                navigate(-1)
            }

            if (!resposta.ok) {
                const dadosErro = await resposta.json();
                throw new Error(dadosErro.error || `Erro HTTP: ${resposta.status}`);
            }

            resetarFormulario();
            aoAdicionarProduto(); 

        } catch (err) {
            console.error('Erro ao cadastrar:', err);
            // Mensagem de erro 
            setErro(`Falha ao cadastrar: ${err.message}.`);
        } finally {
            setEstaCarregando(false);
            alert("Conteúdo cadastrado com sucesso")
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
        <Container>
            <LogoImagem src={Logo}></LogoImagem>
            <form 
                onSubmit={aoSubmeter} 
            >
                <CardLabelInput>
                    <Label htmlFor="materia">MATÉRIA:</Label>
                        <Select id="id_materia" name="id_materia">
                        <Option value="">Selecione a sua matéria</Option>
                            {Array.isArray(fk_materia) &&
                                fk_materia.map(item => (
                            <Option key={item.id_materia} value={item.id_materia}>
                                {item.nome}
                            </Option>
                            ))}
                        </Select>
                </CardLabelInput>

                <CardLabelInput>
                    <Label>TITÚLO:</Label>
                    <Input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                        disabled={estaCarregando}
                    />
                </CardLabelInput>

                <CardLabelInput>
                    <Label>LINK:</Label>
                    <Input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                        disabled={estaCarregando}
                    />
                </CardLabelInput>
                
                <CardLabelInput>
                    <Label>IMAGEM:</Label>
                        <LabelArquivo htmlFor="imagem">
                            {imagem ? "Imagem Selecionada ✅" : "Selecionar Imagem"}
                            </LabelArquivo>
                            <InputArquivo
                            id="imagem"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImagem(e.target.files[0])}
                            required
                        />
                    <Label>ARQUIVO:</Label>
                    <LabelArquivo htmlFor="arquivo">
                        {arquivo ? "PDF Selecionado ✅" : "Selecionar PDF"}
                        </LabelArquivo> 
                        <InputArquivo
                        id="arquivo"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setArquivo(e.target.files[0])}
                        required
                    />
                </CardLabelInput>

                {/* Mensagem de Erro */}
                {erro && (
                    <div>
                        <strong>Erro:</strong>
                        <span>{erro}</span>
                    </div>
                )}

                    <CardBotao>
                        <Botao type="submit" disabled={loading}>
                            {loading ? 'Adicionando...' : 'ADICIONAR'}
                        </Botao>
                        <VoltarBotao onClick={() => navigate(-1)}>Voltar</VoltarBotao>
                    </CardBotao>
            </form>
        </Container>
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
        <div>
            
            {/* Formulário de Cadastro */}
            <FormularioProduto aoAdicionarProduto={buscarProdutos} />
            <div>
                {/* Mensagens de Status */}
                {erro && (
                    <div>
                        <p><span >❌</span> {erro}</p>
                        <button onClick={buscarProdutos}>
                            Tentar Novamente <span>🔄</span>
                        </button>
                    </div>
                )}

                {/* Carregando Produtos */}
                {estaCarregando && (
                    <div>
                        <span>🔄</span>
                        Carregando produtos...
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
