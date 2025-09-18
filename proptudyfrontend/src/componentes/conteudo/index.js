import { useState, useEffect } from "react";
import React from "react";
import { href, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../imagens/logo2.png'

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
    text-decoration: none;
    font-size: 25px;
    font-weight: bold;
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
    margin-bottom: 40px;
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
`;

const SecaoDestaque = styled.div`
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 10px;
`;

const CardCardDestaque = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`;

const TituloDestaque = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

const DestaqueLista = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

const DestaqueItem = styled.div`
    background-color: #131D47;
    border: 2px solid #9AECED;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
`;

const DestaqueTexto = styled.span`
    font-size: 18px;
    font-weight: bold;
`;

const DestaqueLink = styled.a`
    background-color: #9AECED;
    color: #131D47;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 50px;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    margin: 10px;
`;

const Rodape = styled.footer`
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    gap: 30px;
    padding: 20px 0;
    background-color: #9AECED
`;

const LinksRodape = styled.a`
    color: #fff;
    text-decoration: none;
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
    height: 100%;
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

export default function Conteudo() {
    const [materias, setMaterias] = useState([]);
    const [conteudos, setConteudos] = useState([]);
    const [erro, setErro] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleInputChange = (e) => {
        e.preventDefault();
        console.log('handleInputChange', e.target.value);
    } 

    useEffect (() => {
        const fetchMaterias = async () => {
            try {
                const resposta = await fetch('http://localhost:3000/materias/selecionarTodasMaterias');
                if(!resposta.ok){
                    throw new Error(`Erro ao listar todas as matérias: ${resposta.status}`);
                }
                const data = await resposta.json();
                setMaterias(data);
            } catch (error) {
                setErro(error)
                console.error('Erro ao buscar os dados', error)
            }finally{
                setLoading(false)
            }
        }
        fetchMaterias();
    }, [])

    useEffect(() => {
        const fetchMateriaisEmDestaque = async () => {
            try {
                const resposta = await fetch('http://localhost:3000/conteudos/selecionarTodosConteudos');
                if(!resposta.ok){
                    throw new Error(`Erro ao listar os conteúdos ${resposta.status}`);
                }
                const data = await resposta.json();
                setConteudos(data)
            } catch (error) {
                setErro(error)
                console.error('Erro ao buscar os dados', error)
            }finally{
                setLoading(false)
            }
        }
        fetchMateriaisEmDestaque();
    }, [])
    return (
        <Container>
            <Header>
                <LogoContainer>
                    <LogoImage src={Logo} alt="Logo"></LogoImage>
                </LogoContainer>
            </Header>
                <Nav>
                    <NavLink>INÍCIO</NavLink>
                    <NavLink>DISCIPLINAS</NavLink>
                    <NavLink>PERFIL</NavLink>
                    <NavLink href="/">SAIR</NavLink>
                    <BolaDoPerfil />
                </Nav>
                <Linhas />
            <MainContent>
                <SearchSection>
                    <SearchInputContainer>
                        <Titulo htmlFor="pesquisar">O que você quer estudar hoje?</Titulo>
                        <SearchInput id="pesquisar" name="pesquisar" onChange={handleInputChange}/>
                    </SearchInputContainer>
                </SearchSection>

                <Linhas />
            <SeccaoMaterias>
                    {materias.map(item => (
                        <MateriasCard>
                            <a key={item.id}>{item.nome}</a>
                        </MateriasCard>
                    ))}
            </SeccaoMaterias>
            <CardCardDestaque>
                <SecaoDestaque>
                    <TituloDestaque>MATERIAIS EM DESTAQUE</TituloDestaque>
                    <div>
                        {conteudos.map(item => (
                            <DestaqueLista>
                                <DestaqueItem key={item.id}>{item.titulo}</DestaqueItem>
                                <DestaqueLink href={item.arquivo} target="_blank">
                                    <DestaqueTexto>ACESSAR</DestaqueTexto>
                                </DestaqueLink>
                            </DestaqueLista>
                        ))}
                    </div>
                </SecaoDestaque>
            </CardCardDestaque>
            </MainContent>
            <CardRodape>
                <Rodape>
                    <LinksRodape>SOBRE</LinksRodape>
                    <LinksRodape>CONTATO</LinksRodape>
                    <LinksRodape>TERMOS DE USO</LinksRodape>
                    <LinksRodape>POLÍTICAS DE PRIVACIDADE</LinksRodape>
                </Rodape>
            </CardRodape>
        </Container>
    );
}

