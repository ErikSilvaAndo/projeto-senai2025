import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../../imagens/logo2.png";
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

const CardConteudo = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    background-color: rgba(154, 236, 237, 0.9);
    border: 2px solid white;
    border-radius: 10px;
    min-width: 250px;
    width: 90%
`;

const ImagemConteudo = styled.img`
    width: 350px;
    height: 200px;
    border-radius: 20px;
`;

const SecaoConteudo = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    justify-items: center;
    width: 100%;
    margin-bottom: 50px;
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

const TituloConteudo = styled.p`
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
    margin: 10px;
    background-color: rgba(154, 236, 237, 0.9);
    border: 2px solid white;
    border-radius: 10px;
    font-size: 100px;
    cursor: pointer;
    width: 90%;
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


export default function ListarQuiz() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [link, setLink] = useState('');
    const [estaCarregando, setEstaCarregando] = useState(false);
    const [quiz, setQuiz] = useState([])
    const [loading, setLoading] = useState('');
    const [erro, setErro] = useState('');

    const navigate = useNavigate()

        useEffect (() => {
            const fetchQuiz = async () => {
                try {
                    const resposta = await fetch('http://localhost:3000/quiz/listarQuiz');
                    if(!resposta.ok){
                        throw new Error(`Erro ao listar todas as matérias: ${resposta.status}`);
                    }
                    const data = await resposta.json();
                    setQuiz(data);
                } catch (error) {
                    setErro(error)
                    console.error('Erro ao buscar os dados', error)
                }finally{
                    setLoading(false)
                }
            }
            fetchQuiz();
        }, []);
    
    const executaExcluir = async (idQuiz) => {
        if (window.confirm(`Tem certeza que deseja excluir o conteúdo ID ${idQuiz}?`)) {
            try {
                const resposta = await fetch(`http://localhost:3000/conteudos/deletarConteudo/${idQuiz}`, {
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
    
    return (
        <Container>
            <Container>
                <CardLinkVoltar>
                    <LinkVoltar onClick={() => navigate(-1)}>Voltar</LinkVoltar>
                </CardLinkVoltar>
                <CardImagem>
                    <LogoImage src={Logo} />
                </CardImagem>
                {quiz.map(item => (
                    <div>
                        <h1>{item.titulo}</h1>
                    </div>
                ))}
            </Container>
        </Container>
    )
}