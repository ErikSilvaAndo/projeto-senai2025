import { useState, useEffect } from "react";
import React from "react";
import { href, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../../imagens/logo2.png'

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
    background-color: #9AECED;
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
    color: #000000ff;
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
    border-top: 1px solid white;
    margin: 20px 0;
`;

const CardRodape = styled.div`
    width: 100%;
    background-color: #9AECED;
    position: fixed;
    bottom: 0;
`;

const BolaDoPerfil = styled.div`
    width: 60px; 
    aspect-ratio: 1 / 1; 
    border-radius: 50%;
    margin-left: 20px;
    cursor: pointer;
    border: 3px solid #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #131D47;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        display: block;
    }
`;

export default function Conteudo({id}) {
    const [materias, setMaterias] = useState([]);
    const [conteudos, setConteudos] = useState([]);
    const [erro, setErro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState([]);
    const [imagemPreview, setImagemPreview] = useState(null);
    const [imagemBase64, setImagemBase64] = useState(null);
    const [busca, setBusca] = useState("");
    const navigate = useNavigate();
    

    const usuarioString = localStorage.getItem('usuario');
    const usuarioId = usuarioString ? JSON.parse(usuarioString) : null;

    const irParaMateria = (id) => {
        navigate(`/paginasConteudoProfessor/${id}`);
    };

    const irParaPerfil = () => {
        if (usuario) {
            navigate(`/perfil/${usuarioId.id}`);
        }
    };

    const handleInputChange = (e) => {
        setBusca(e.target.value.toLowerCase());
    }

    const conteudosFiltrados = busca
        ? conteudos.filter((conteudo) =>
            String(conteudo.titulo || "").toLowerCase().includes(busca)
        )
        : [];
        const logout = () => {
        localStorage.removeItem('usuario');
        navigate('/')
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
    }, []);

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

        useEffect(() => {
            const carregarUsuario = async () => {
                try {
                    setLoading(true);
                    const dados = await fetchUsuario();
                    setUsuario(dados);
                    if (dados[0]?.imagem) {
                        setImagemPreview(dados[0].imagem);
                    }
                } catch (erro) {
                    console.log("Erro ao buscar usuário", erro);
                    setErro("Erro ao buscar usuário: " + erro);
                } finally {
                    setLoading(false);
                }
            };
            carregarUsuario();
        }, []);
    
        const fetchUsuario = async () => {
            try {
                const usuarioString = localStorage.getItem("usuario");
                if (!usuarioString) {
                    console.log("Usuário não encontrado no localStorage");
                    return [];
                }
    
                const usuario = JSON.parse(usuarioString);
                const usuarioId = usuario.id;
                const resposta = await fetch(`http://localhost:3000/usuarios/buscarUsuariosPorId/${usuarioId}`);
                const dados = await resposta.json();
                return dados;
            } catch (erro) {
                console.log("Erro ao buscar usuário", erro);
                throw erro;
            }
        };

        

    return (
        <Container>
            <Header>
                <LogoContainer>
                    <LogoImage src={Logo} alt="Logo"></LogoImage>
                </LogoContainer>
            </Header>
                <Nav>
                    <NavLink href="/conteudos">INÍCIO</NavLink>
                    <NavLink>DISCIPLINAS</NavLink>
                    <NavLink onClick={irParaPerfil}>MEU PERFIL</NavLink>
                    <NavLink href="/" onClick={logout}>SAIR</NavLink>
                    {Array.isArray(usuario) &&
                        usuario.map((item) => (
                            <BolaDoPerfil key={item.id} onClick={irParaPerfil}>
                                <img src={item.imagem}></img>
                            </BolaDoPerfil>
                    ))}
                </Nav>
                <Linhas />
            <MainContent>
                <SearchSection>
                    <SearchInputContainer>
                        <Titulo htmlFor="pesquisar">O que você quer estudar hoje?</Titulo>
                        <SearchInput id="pesquisar" name="pesquisar" onChange={handleInputChange}/>
                    </SearchInputContainer>
                </SearchSection>

                    {busca !== "" && (
                    <>
                        <h2 style={{ marginTop: 0 }}>Resultados da busca:</h2>
                        <SeccaoMaterias>
                            {conteudosFiltrados.length > 0 ? (
                                conteudosFiltrados.map((item) => (
                                    <MateriasCardPesquisa
                                        key={item.id_conteudo || item.id}
                                        onClick={() => irParaMateria(item.fk_materia)}
                                    >
                                        {item.titulo}
                                    </MateriasCardPesquisa>
                                ))
                            ) : (
                                <p>Nenhum conteúdo encontrado.</p>
                            )}
                        </SeccaoMaterias>
                    </>
                )}

                <Linhas />

            <SeccaoMaterias>
                    {materias.map(item => (
                        <MateriasCard onClick={() => irParaMateria(item.id_materia)}>
                            <a key={item.id_materia} onClick={() => irParaMateria(item.id_materia)}>{item.nome}</a>
                        </MateriasCard>
                    ))}
            </SeccaoMaterias>
            </MainContent>
            <CardRodape>
                <Rodape>
                    <LinksRodape href="/sobre">SOBRE</LinksRodape>
                    <LinksRodape href="/contato">CONTATO</LinksRodape>
                    <LinksRodape href="/termosDeUso">TERMOS DE USO</LinksRodape>
                    <LinksRodape href="/politica">POLÍTICAS DE PRIVACIDADE</LinksRodape>
                </Rodape>
            </CardRodape>
        </Container>
    );
}

