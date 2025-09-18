import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../imagens/logoCortada.png' // Certifique-se de que o caminho está correto

// --- Estilos Modificados ---

const Container = styled.div`
    background-color: #131D47;
    height: 100vh;
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

const Input = styled.input`
    border-radius: 160px;
    width: 350px;
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

const CadastroErro = styled.p`
    color: #fff;
    font-weight: bold;
    margin-bottom: 10px;
`;

const CadastroSucesso = styled.p`
    color: #9AECED;
    font-weight: bold;
    margin-bottom: 10px;
`;

const CardBotao = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    flex-direction: column;
`;

export default function EditarConteudo() {
    const [titulo, setTitulo] = useState('');
    const [materia, setMateria] = useState('');
    const [pdf, setPdf] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState('')
    const [cadastroSucesso, setCadastroSucesso] = useState(false);

    const navigate = useNavigate();

     const executaSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const resposta = await fetch(`http://localhost:3000/conteudos/alterarConteudo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titulo, materia, pdf, link }),
            });

            if (resposta.ok) {
                alert("Matéria editada com sucesso!");
                navigate('/');
            } else {
                alert("Erro ao editar matéria.");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro de conexão.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Imagem src={Logo} alt="Logo"/>
            
            <form onSubmit={executaSubmit}>
                <CardLabelInput>
                    <Label htmlFor="titulo">TITÚLO:</Label>
                    <Input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </CardLabelInput>
                <CardLabelInput>
                    <Label htmlFor="materia">MATÉRIA:</Label>
                    <Input
                        type="text"
                        id="materia"
                        name="materia"
                        value={materia}
                        onChange={(e) => setMateria(e.target.value)}
                        required
                    />
                </CardLabelInput>
                <CardLabelInput>
                    <Label htmlFor="pdf">PDF:</Label>
                    <Input
                        type="text"
                        id="pdf"
                        name="pdf"
                        
                        value={pdf}
                        onChange={(e) => setPdf(e.target.value)}
                        required
                    />
                </CardLabelInput>
                <CardLabelInput>
                    <Label htmlFor="link">LINK:</Label>
                    <Input
                        type="text"
                        id="link"
                        name="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                    />
                </CardLabelInput>
                <CardBotao>
                    <Botao type="submit" disabled={loading}>
                        {loading ? 'Salvando...' : 'SALVAR'}
                    </Botao>
                    <VoltarBotao href="/">Voltar</VoltarBotao>
                </CardBotao>
            </form>
        </Container>
    );
}