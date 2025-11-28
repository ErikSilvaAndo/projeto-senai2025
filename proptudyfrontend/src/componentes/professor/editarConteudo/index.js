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
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
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
    const [fk_materia, setMateria] = useState([]);
    const [id_materia, setIdMateria] = useState();
    const [conteudo, setConteudo] = useState([])

    const { id_conteudo } = useParams();

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

        setEstaCarregando(true);

try {
    let imagemBase64 = conteudo[0]?.imagem;
    let arquivoBase64 = conteudo[0]?.arquivo;

    // Só converte se o usuário enviou um novo arquivo
    if (imagem instanceof File) {
        imagemBase64 = await converterParaBase64(imagem);
    }

    if (arquivo instanceof File) {
        arquivoBase64 = await converterParaBase64(arquivo);
    }

    const resposta = await fetch(`http://localhost:3000/conteudos/alterarConteudo/${id_conteudo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fk_materia: id_materia,
            titulo,
            link,
            imagem: imagemBase64,
            arquivo: arquivoBase64,
        }),
    });

    if (resposta.ok) {
        alert("Conteúdo editado com sucesso!");
        navigate(-1);
    } else {
        const dadosErro = await resposta.json();
        throw new Error(dadosErro.error || `Erro HTTP: ${resposta.status}`);
    }

    resetarFormulario();
    aoAdicionarProduto();

} catch (err) {
    console.error('Erro ao editar:', err);
    setErro(`Falha ao editar: ${err.message}.`);
} finally {
    setEstaCarregando(false);
}
    };

        useEffect(() => {
            const fetchSelecionaTodosConteudos = async () => {
                try {
                    const resposta = await fetch(`http://localhost:3000/conteudos/selecionarConteudoPorId/${id_conteudo}`);
                    if(!resposta.ok){
                        throw new Error(`Erro ao listar os conteúdos ${resposta.status}`);
                    }
                    const data = await resposta.json();
                    setConteudo(data)
                    console.log(data);
                    
                } catch (error) {
                    setErro(error)
                    console.error('Erro ao buscar os dados', error)
                }finally{
                    setLoading(false)
                }
            }
            fetchSelecionaTodosConteudos();
        }, [])

        useEffect(() => {
            const fetchConteudo = async () => {
            try {
                const resposta = await fetch(`http://localhost:3000/conteudos/selecionarConteudoPorId/${id_conteudo}`);
                const data = await resposta.json();
                setConteudo(data)
                if (data.length > 0) {
                    setTitulo(data[0].titulo || '');
                    setLink(data[0].link || '');
                    setIdMateria(data[0].fk_materia || '');
                }
            } catch (error) {
                console.error("Erro ao carregar conteúdo: ", error);
            }
        };
            fetchConteudo();
        }, [id_conteudo]);

    

        useEffect (() => {
            const fetchMaterias = async () => {
                try {
                    const resposta = await fetch('http://localhost:3000/materias/selecionarTodasMaterias');
                    if(!resposta.ok){
                        throw new Error(`Erro ao listar todas as matérias: ${resposta.status}`);
                    }
                    const data = await resposta.json();
                    setMateria(data);
                    console.log(conteudo)
                } catch (error) {
                    setErro(error)
                    console.error('Erro ao buscar os dados', error)
                }finally{
                    setLoading(false)
                }
            }
            fetchMaterias();
        }, []);

        const selecionarMateria = (e) => {
            // O valor é sempre uma string, converta se o seu backend exigir número
            setIdMateria(e.target.value); 
        };

    return (
        <Container>
            <LogoImagem src={Logo}></LogoImagem>
            <form 
                onSubmit={aoSubmeter} 
            >
                <CardLabelInput>
                    <Label htmlFor="materia">MATÉRIA:</Label>
                        {/* <Input value={{conteudo.materia}}/> */}
                        <Input defaultValue={conteudo.length > 0 ? conteudo[0].nome : ''} disabled/>
                        <Input defaultValue={conteudo.length > 0 ? conteudo[0].fk_materia : ''} hidden/>
                </CardLabelInput>

                <CardLabelInput>
                    <Label>TITÚLO:</Label>
                    <Input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        disabled={estaCarregando}
                    />
                </CardLabelInput>

                <CardLabelInput>
                    <Label>LINK:</Label>
                    <Input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        disabled={estaCarregando}
                    />
                </CardLabelInput>
                
                <CardLabelInput>
                    <Label>IMAGEM:</Label>
                        <LabelArquivo htmlFor="imagem">
                            {imagem ? "Imagem Selecionada" : "Selecione uma imagem"}
                            </LabelArquivo>
                            <InputArquivo
                            id="imagem"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImagem(e.target.files[0])}
                            required={!id_conteudo}
                        />
                    <Label>ARQUIVO:</Label>
                    <LabelArquivo htmlFor="arquivo">
                        {arquivo ? "Arquivo Selecionado" : "Selecione um arquivo"}
                        </LabelArquivo> 
                        <InputArquivo
                        id="arquivo"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setArquivo(e.target.files[0])}
                        required={!id_conteudo}
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
                            {loading ? 'Editando...' : 'EDITAR'}
                        </Botao>
                        <VoltarBotao onClick={() => navigate(-1)}>Voltar</VoltarBotao>
                    </CardBotao>
            </form>
        </Container>
    );
};


const EditarConteudo = () => {
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
            setErro(`Erro de conexão com a API: http://localhost:3000/conteudos/selecionarTodosConteudos. Verifique se o servidor Node.js está rodando.`);
        } finally {
            setEstaCarregando(false);
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
                        Carregando conteúdos...
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditarConteudo
