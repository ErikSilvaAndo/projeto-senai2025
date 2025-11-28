import { useState, useEffect } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../../imagens/logo2.png";

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
    margin: 20px;
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
    width: 400px;
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

const LogoImagem = styled.img`
    width: 350px;
`;

export default function AdicionarQuiz() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [link, setLink] = useState('');
    const [materias, setMateria] = useState([]);
    const [id_materia, setIdMateria] = useState();
    const [estaCarregando, setEstaCarregando] = useState(false);
    const [loading, setLoading] = useState('');
    const [erro, setErro] = useState('');

    const navigate = useNavigate()

    const resetarFormulario = () => {
        setTitulo('');
        setDescricao('');
        setLink('');
    };

    const aoSubmeter = async (e) => {
        e.preventDefault();
        setErro('');

        if (!titulo || !descricao || !link) {
            setErro('Por favor, preencha todos os campos e selecione os arquivos.');
            return;
        }


        setEstaCarregando(true);

        try {
            const resposta = await fetch('http://localhost:3000/quiz/criarQuiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_materia: id_materia,
                    titulo: titulo,
                    descricao: descricao,
                    link: link,
                }),
            });

            if (!id_materia || !titulo || !descricao || !link) {
                alert("Preencha todos os campos")
            }

            if (resposta.ok) {
                navigate(-1)
            }

            if (!resposta.ok) {
                const dadosErro = await resposta.json();
                throw new Error(dadosErro.error || `Erro HTTP: ${resposta.status}`);
            }

            resetarFormulario();

        } catch (err) {
            console.error('Erro ao cadastrar conteúdo:', err);
            setErro(`Falha ao cadastrar: ${err.message}.`);
        } finally {
            setEstaCarregando(false);
        }
    };

    const selecionarMateria = (e) => {
        // O valor é sempre uma string, converta se o seu backend exigir número
        setIdMateria(e.target.value);
    };

        useEffect(() => {
            const fetchMaterias = async () => {
                try {
                    const resposta = await fetch('http://localhost:3000/materias/selecionarTodasMaterias');
                    if (!resposta.ok) {
                        throw new Error(`Erro ao listar todas as matérias: ${resposta.status}`);
                    }
                    const data = await resposta.json();
                    setMateria(data);
                    // console.log(data)
                } catch (error) {
                    setErro(error)
                    console.error('Erro ao buscar os dados', error)
                } finally {
                    setLoading(false)
                }
            }
            fetchMaterias();
        }, []);
    
    
    return (
        <Container>
                <LogoImagem src={Logo}></LogoImagem>
                <form onSubmit={aoSubmeter}>
                        <CardLabelInput>
                            <Label htmlFor="materia">MATÉRIA:</Label>
                            <Select id="id_materia" name="id_materia" onChange={selecionarMateria}>
                                <Option value="id_materia" >Selecione a sua matéria</Option>
                                {Array.isArray(materias) &&
                                    materias.map(item => (
                                        <Option key={item.id_materia} value={item.id_materia}>
                                            {item.nome} {item.id_materia}
                                        </Option>
                                    ))}
                            </Select>
                        </CardLabelInput>

                        <CardLabelInput>
                            <Label>TITULO:</Label>
                            <Input
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                                disabled={estaCarregando} 
                                />
                    </CardLabelInput>
                    
                    <CardLabelInput>
                        <Label>DESCRIÇÃO:</Label>
                        <Input
                            type="text"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
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
                <CardBotao>
                    <Botao type="submit" disabled={loading}>
                        {loading ? 'Adicionando...' : 'ADICIONAR'}
                    </Botao>
                    <VoltarBotao onClick={() => navigate(-1)} >Voltar</VoltarBotao>
                </CardBotao>
                </form>
        </Container>
    )
}