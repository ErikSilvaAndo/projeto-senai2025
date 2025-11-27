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
    font-weight: bold;
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

export default function CadastroUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('aluno');
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(false);
    const [cadastroSucesso, setCadastroSucesso] = useState(false);

    const navigate = useNavigate();

    const executaSubmit = async (event) => {
        if(senha === confirmarSenha){
            event.preventDefault();
            setLoading();
            setErro('');
            setCadastroSucesso(false);

            try {
                const resposta = await fetch('http://localhost:3000/usuarios/registrar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nome, email, senha, tipoUsuario }),
                });
                const data = await resposta.json();
                if (resposta.ok) {
                    setCadastroSucesso(true);
                    setTimeout(() => {
                        setCadastroSucesso(false);
                        navigate('/');
                    }, 800);
                } else {
                    setErro(data.mesage || 'Erro ao fazer cadastro. Tente novamente.');
                }
            } catch (erro) {
                console.error('Falha ao conectar a API', erro);
                setErro('Não foi possível conectar ao servidor. Verifique sua conexão. ' + erro);
            } finally {
                setLoading(false);
            }
        }else{
            event.preventDefault();
            alert("As senhas não são iguais. Tente novamente!");
            setSenha('');
            setConfirmarSenha('');
        }

    };

    return (
        <Container>
            <Imagem src={Logo} alt="Logo"/>
            {erro && <CadastroErro>{erro}</CadastroErro>}
            {cadastroSucesso && <CadastroSucesso>Cadastro bem-sucedido</CadastroSucesso>}
            <form onSubmit={executaSubmit}>
                <CardLabelInput>
                    <Label htmlFor="nome">NOME:</Label>
                    <Input
                        type="text"
                        id="nome"
                        name="nome"
                        // placeholder="Digite seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </CardLabelInput>
                <CardLabelInput>
                    <Label htmlFor="email">EMAIL:</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        // placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </CardLabelInput>
                <CardLabelInput>
                    <Label htmlFor="senha">SENHA:</Label>
                    <Input
                        type="password"
                        id="senha"
                        name="senha"
                        // placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </CardLabelInput>
                <CardLabelInput>
                    <Label htmlFor="confirmarSenha">CONFIRMAR SENHA:</Label>
                    <Input
                        type="password"
                        id="confirmarSenha"
                        name="confirmarSenha"
                        // placeholder="Confirme sua senha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        required
                    />
                </CardLabelInput>
                <CardBotao>
                    <Botao type="submit" disabled={loading}>
                        {loading ? 'Cadastrando...' : 'CADASTRAR'}
                    </Botao>
                    <VoltarBotao href="/">Voltar</VoltarBotao>
                </CardBotao>
            </form>
        </Container>
    );
}
