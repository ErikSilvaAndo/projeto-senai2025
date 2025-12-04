import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Logo from "../imagens/logo2.png";
import 'bootstrap-icons/font/bootstrap-icons.css'

const Container = styled.div`
    background-color: #131D47;
    color: #fff;
    font-family: Arial, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LogoImage = styled.img`
    width: 250px;
    height: 150px;
`;

const Titulo = styled.h1`
    font-size: 60px;
    font-weight: 1000;
`;

const CardImagem = styled.div`
    margin-top: 20px;
`;

const CardTitulo = styled.div`
    margin-bottom: 30px;
`;

const CardQuiz = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background-color: rgba(154, 236, 237, 0.9);
    border: 2px solid white;
    border-radius: 12px;

    width: 100%;
    aspect-ratio: 1 / 1; 
    max-width: 200px;    
    padding: 15px;

    height: 150px;

    transition: 0.2s;
`;

const SecaoQuiz = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 30px;
    width: 100%;
    max-width: 1400px;
    padding: 30px;
`;

const CardLinkVoltar = styled.div`
    position: absolute;
    top: 20px;
    left: 20px; 
`;

const LinkVoltar = styled.a`
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 20px;
    cursor: pointer;
`;

const TituloQuiz = styled.p`
    font-size: 20px;
    font-weight: 800;
    text-transform: uppercase;
    color: black;
    text-align: center;
`;

const CardLinks = styled.div`
    display: flex;
    flex-direction: row;
    gap: 50px;
    margin-top: 10px;
`;

const Links = styled.a`
    color: black;
    text-decoration: none;
    font-weight: 700;
`;

const BotaoAdicionar = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background-color: rgba(154, 236, 237, 0.9);
    border: 2px solid white;
    border-radius: 12px;

    width: 100%;
    aspect-ratio: 1 / 1;
    max-width: 230px;

    padding: 15px;

    font-size: 80px;
    font-weight: bold;
    color: black;

    cursor: pointer;
    
    height: 185px;
`;

const IconesAcoes = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 10px;
`;

const BotaoIcone = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;

    i {
        color: white;
        font-size: 20px;
    }

    &:hover i {
        opacity: 0.7;
        color: black;
    }
`;

const SearchSection = styled.div`
    margin-bottom: 40px;
`;

const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 1000px;
    margin-top: 20px;
`;

const SearchInput = styled.input`
    width: 50%;
    padding: 15px 50px 15px 20px;
    border-radius: 50px;
    border: none;
    background-color: #9AECED;
    font-size: 18px;
    outline: none;
    color: #131D47;
`;

const SeccaoMaterias = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const MateriasCardPesquisa = styled.div`
    background-color: #131D47;
    border: 2px solid #9AECED;
    border-radius: 10px;
    width: 120px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    color: #fff;
`;

const TituloPesquisa = styled.label`
    font-size: 32px;
    margin-bottom: 20px;
`;


export default function ListarQuiz() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [link, setLink] = useState('');
    const [estaCarregando, setEstaCarregando] = useState(false);
    const [quiz, setQuiz] = useState([])
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState('');
    const [erro, setErro] = useState('');

    const CriarQuiz = () => {
        navigate(`/adicionarQuiz`);
    };

    const navigate = useNavigate()

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const resposta = await fetch('http://localhost:3000/quiz/listarQuiz');
                if (!resposta.ok) {
                    throw new Error(`Erro ao listar todas as matérias: ${resposta.status}`);
                }
                const data = await resposta.json();
                setQuiz(data);
            } catch (error) {
                setErro(error)
                console.error('Erro ao buscar os dados', error)
            } finally {
                setLoading(false)
            }
        }
        fetchQuiz();
    }, []);

    const executaExcluir = async (idQuiz) => {
        if (window.confirm(`Tem certeza que deseja excluir o conteúdo ID ${idQuiz}?`)) {
            try {
                const resposta = await fetch(`http://localhost:3000/quiz/deletarQuiz/${idQuiz}`, {
                    method: 'DELETE'
                });
                setQuiz(prev => prev.filter(item => item.id_quiz !== idQuiz))
                alert(`Conteúdo ID ${idQuiz} excluída com sucesso!`)
            } catch (error) {
                console.error(`Erro ao excluir a conteúdo ID ${idQuiz}`, error)
                alert(`Falha ao excluir conteúdo: ${error.message}`)
            }
        }
    }

    const handleInputChange = (e) => {
        setBusca(e.target.value.toLowerCase());
    };

    const quizFiltrados = busca
        ? quiz.filter((item) =>
            String(item.titulo || "").toLowerCase().includes(busca)
        )
        : quiz;

    return (
        <Container>
            <CardLinkVoltar>
                <LinkVoltar onClick={() => navigate(-1)}>Voltar</LinkVoltar>
            </CardLinkVoltar>
            <CardImagem>
                <LogoImage src={Logo} />
            </CardImagem>

            <Titulo>QUIZ</Titulo>

            <SearchSection>
                <SearchInputContainer>
                    <TituloPesquisa htmlFor="pesquisar">O que você quer pesquisar?</TituloPesquisa>
                    <SearchInput
                        id="pesquisar"
                        name="pesquisar"
                        onChange={handleInputChange}
                    />
                </SearchInputContainer>
            </SearchSection>


            {busca !== "" && (
                <>
                    <h2 style={{ marginTop: 0 }}>Resultados da busca:</h2>
                    <SeccaoMaterias>
                        {quizFiltrados.length > 0 ? (
                            quizFiltrados.map((item) => (
                                <MateriasCardPesquisa
                                    key={item.id_quiz}
                                    onClick={() => navigate(`/editarQuiz/${item.id_quiz}`)}
                                >
                                    {item.titulo}
                                </MateriasCardPesquisa>
                            ))
                        ) : (
                            <p>Nenhum quiz encontrado.</p>
                        )}
                    </SeccaoMaterias>
                </>
            )}

            <SecaoQuiz>
                {quiz.map(item => (
                    <CardQuiz>
                        <TituloQuiz key={item.id_quiz}>{item.titulo}</TituloQuiz>
                        <CardLinks>
                            <Links href={item.link} target="_blank">Quiz</Links>
                        </CardLinks>
                    </CardQuiz>
                ))}
            </SecaoQuiz>
        </Container>
    )
}