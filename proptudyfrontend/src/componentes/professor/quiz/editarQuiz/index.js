import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../../imagens/logo2.png";

const Container = styled.div`
    background-color: #131D47;
    min-height: 100vh;        
    width: 100%;              
    display: flex;
    flex-direction: column; 
    align-items: center;
    padding-top: 40px;        
    padding-bottom: 40px;     
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
    margin: 10px;
`;

const Input = styled.input`
    border-radius: 160px;
    width: 400px;
    height: 50px;
    background-color: #9AECED;
    text-align: center;
    margin-top: 10px;
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

const LogoImagem = styled.img`
    width: 400px;
`;

export default function EditarQuiz() {
    const [titulo, setTitulo] = useState('');
    const [link, setLink] = useState('');
    const [estaCarregando, setEstaCarregando] = useState(false);
    const [quiz, setQuiz] = useState([]);
    const [materia, setMateria] = useState([]);
    const [loading, setLoading] = useState('');
    const [erro, setErro] = useState('');
    const [id_materia, setIdMateria] = useState();
    const [nomeMateria, setNomeMateria] = useState([])

    const { id_quiz } = useParams();

    const navigate = useNavigate();

        // Reseta o estado do formulário
        const resetarFormulario = () => {
            setTitulo('');
            setLink('');
    };
    
        // Função de manipulação do envio
            const aoSubmeter = async (e) => {
                e.preventDefault();
                setErro('');
        
                setEstaCarregando(true);
        
        try {
            const resposta = await fetch(`http://localhost:3000/quiz/editarQuiz/${id_quiz}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_materia: id_materia,
                    titulo: titulo,
                    link: link,
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
        
        } catch (err) {
            console.error('Erro ao editar:', err);
            setErro(`Falha ao editar: ${err.message}.`);
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
    
        useEffect(() => {
            const fetchMateriaisEmDestaque = async () => {
                try {
                    const resposta = await fetch('http://localhost:3000/quiz/listarQuiz');
                    if(!resposta.ok){
                        throw new Error(`Erro ao listar os conteúdos ${resposta.status}`);
                    }
                    const data = await resposta.json();
                    quiz(data)
                } catch (error) {
                    setErro(error)
                    console.error('Erro ao buscar os dados', error)
                }finally{
                    setLoading(false)
                }
            }
            fetchMateriaisEmDestaque();
        }, [])
    
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const resposta = await fetch(`http://localhost:3000/quiz/selecionarIdMateriaPorIdQuiz/${id_quiz}`);
                const data = await resposta.json();
                setNomeMateria(data);
            } catch (error) {
                console.error("Erro ao carregar conteúdo: ", error);
            }
        };
        fetchQuiz();
    }, [id_quiz]);
    return (
        <Container>
                <LogoImagem src={Logo} />
                <form onSubmit={aoSubmeter}>
                    {nomeMateria.map(item => (
                        <Input value={item.nome_materia} disabled></Input>
                    ))}

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
                    <CardBotao>
                        <Botao type="submit" disabled={loading}>
                            {loading ? 'Editando...' : 'EDITAR'}
                        </Botao>
                        <VoltarBotao onClick={() => navigate(-1)}>Voltar</VoltarBotao>
                    </CardBotao>
                </form>
        </Container>
    )
}