import { useState, useEffect } from "react";
import React from "react";
import { href, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../imagens/logo2.png';

const Container = styled.div`
    background-color: #131D47;
    color: #fff;
    font-family: Arial, sans-serif;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    margin-bottom: 20px;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
`;

const LogoImage = styled.img`
    width: 200px;
    height: 120px;
    margin-right: 10px;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50px;
    gap: 55px;
`;

const NavLink = styled.a`
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const MainContent = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 40px 0;
    text-align: center;
`;

const SearchSection = styled.div`
    margin-bottom: 40px;
`;

const Titulo = styled.label`
    font-size: 32px;
    margin-bottom: 20px;
`;

const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
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

const MateriasCard = styled.div`
    background-color: #131D47;
    border: 2px solid #9AECED;
    border-radius: 10px;
    width: 100px;
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

const Rodape = styled.footer`
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    margin-left: 150px;
    padding: 20px 0;
    background-color: #9AECED
`;

const LinksRodape = styled.a`
    color: #000;
    text-decoration: none;
    font-weight: 1000;
    font-size: 14px;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;
const Linhas = styled.div`
    width: 100%;
    max-width: 1200px;
    border: none;
    border-top: 1px solid gray;
    margin: 20px 0;
`;

const CardRodape = styled.div`
    width: 100%;
    background-color: #9AECED;
    position: fixed;
    bottom: 0;
`;

const BolaDoPerfil = styled.div`
    width: 40px;
    height: 40px;
    background-color: #9AECED;
    border-radius: 50%;
    margin-left: 20px;
    cursor: pointer;
    border: 2px solid #fff;
`;

export default function MeuPerfil() {
    const [conteudos, setConteudos] = useState([]);
    const [erro, setErro] = useState(false);
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState('');

    const navigation = useNavigate();

    const logout = () => {
        localStorage.removeItem('usuario');
        navigation('/')
    }
    
    useEffect(() => {
        const carregarUsuario = async () => {
            try {
                setLoading(true)
                setErro(null)
                const dados = await fetchUsuario();
                setUsuario(dados);
            } catch (erro) {
                console.log('Erro ao buscar movimentações', erro);
                setErro('Erro ao buscar movimentações'+ erro)
            }finally{
                setLoading(false)
            }
        }
        carregarUsuario();
    }, [])

    const fetchUsuario = async () =>{
    try {
        const usuarioString = localStorage.getItem('usuario');
        if (!usuarioString) {
            console.log('Usuario não encontrado no localStorage');
            return [];
        }

        const usuario = JSON.parse(usuarioString);
        const usuarioId = usuario.id;
        const resposta = await fetch(`http://localhost:3000/usuarios/buscarUsuariosPorId/${usuarioId}`)
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.log('Erro ao buscar movimentaçãoes', erro)
        throw erro;
    }
}

    return (
        <Container>
            <Header>
                <LogoContainer>
                    <LogoImage src={Logo} alt="Logo"></LogoImage>
                </LogoContainer>
                <a href="/" onClick={logout}>SAIR</a>
            </Header>
            <div>
                <p>MEU PERFIL</p>
            </div>
            <div>
                <div />
            </div>
            <div>
                {Array.isArray(usuario) && usuario.map((item) => {
                    <p>{item.id_usuario}</p>
                })}
            </div>
        </Container>
    );
}

