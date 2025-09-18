import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../imagens/logoCortada.png'

const Imagem = styled.img`
    width: 400px;
    height: 250px;
    margin: 10px
`;

const Container = styled.div`
    background-color: #131D47;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Label = styled.label`
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px
`;

const Input = styled.input`
    border-radius: 160px;
    width: 380px;
    height: 50px;
    background-color: #9AECED;
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
`;

const CardLabelInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px
`;

const Botao = styled.button`
    font-weight: bold;
    background-color: #9AECED;
    width: 200px;
    height: 45px;
    border-radius: 50px;
    font-size: 20px;
`;

const CardBotao = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

const CardCadastreSe = styled.div`
    display: flex;
    justify-content: center;
    color: #fff;

`;

const CadastreSe = styled.a`
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

const ErroAoLogar = styled.p`
    color: #fff;
    font-weight: bold;
`;

const SucessoAoLogar = styled.p`
    color: #9AECED;
    font-weight: bold;
`;

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginSucesso, setLoginSucesso] = useState(false);

    const navigate = useNavigate();

    const executaSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setLoginSucesso(false);

        try {
            const resposta = await fetch('http://localhost:3000/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });
            const data = await resposta.json();
            if (resposta.ok) {
                setLoginSucesso(true);
                setTimeout(() => {
                    setLoginSucesso(false);
                    localStorage.setItem('usuario', JSON.stringify(data.usuario));
                    navigate('/conteudos');
                }, 500);
            } else {
                setError(data.mesage || 'Erro ao fazer Cafastro. Tente novamente');
            }
        } catch (erro) {
            console.error('Falha ao conectar a API', erro);
            setError('Não foi possível conectar ao servidor. Verifique sua conexão. ' + erro);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            {loginSucesso && (
                <SucessoAoLogar>Login Bem-Sucedido!</SucessoAoLogar>
            )}

            {error && (
                <ErroAoLogar>{error}</ErroAoLogar>
            )}

                <Imagem src={Logo}></Imagem>
            <form onSubmit={executaSubmit}>
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
                <CardBotao>
                    <Botao type="submit" disabled={loading}><strong>{loading ? 'Entrando...' : 'ENTRAR'}</strong></Botao>
                </CardBotao>
                <CardCadastreSe>
                    <CadastreSe href="/cadastroUsuario">Cadastre-se</CadastreSe>   
                </CardCadastreSe>
            </form>
        </Container>
    );
}