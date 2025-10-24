// import { useState, useEffect } from "react";
// import React from "react";
// import { href, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import Logo from '../imagens/logo2.png'

// const Container = styled.div`
//     background-color: #131D47;
//     color: #fff;
//     font-family: Arial, sans-serif;
//     min-height: 100vh;
//     padding: 20px;
//     box-sizing: border-box;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `;

// const Header = styled.header`
//     width: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 10px 0;
//     margin-bottom: 20px;
// `;

// const LogoContainer = styled.div`
//     display: flex;
//     align-items: center;
// `;

// const LogoImage = styled.img`
//     width: 200px;
//     height: 120px;
//     margin-right: 10px;
// `;

// const Nav = styled.nav`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: absolute;
//     top: 50px;
//     gap: 55px;
// `;

// const NavLink = styled.a`
//     color: #fff;
//     font-weight: bold;
//     font-size: 20px;
//     margin-bottom: 10px;
//     text-decoration: none;
//     &:hover {
//         text-decoration: underline;
//         cursor: pointer;
//     }
// `;

// const MainContent = styled.div`
//     width: 100%;
//     max-width: 1200px;
//     padding: 40px 0;
//     text-align: center;
// `;

// const SearchSection = styled.div`
//     margin-bottom: 40px;
// `;

// const Titulo = styled.label`
//     font-size: 32px;
//     margin-bottom: 20px;
// `;

// const SearchInputContainer = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
//     width: 100%;
// `;

// const SearchInput = styled.input`
//     width: 50%;
//     padding: 15px 50px 15px 20px;
//     border-radius: 50px;
//     border: none;
//     background-color: #9AECED;
//     font-size: 18px;
//     outline: none;
//     color: #131D47;
// `;

// const SeccaoMaterias = styled.div`
//     display: flex;
//     justify-content: center;
//     gap: 20px;
// `;

// const MateriasCard = styled.div`
//     background-color: #131D47;
//     border: 2px solid #9AECED;
//     border-radius: 10px;
//     width: 100px;
//     height: 100px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 10px;
//     margin-top: 10px;
//     cursor: pointer;
//     text-transform: uppercase;
//     font-weight: bold;
//     font-size: 14px;
//     color: #fff;
// `;

// const Rodape = styled.footer`
//     width: 100%;
//     max-width: 1200px;
//     display: flex;
//     justify-content: space-between;
//     margin-left: 150px;
//     padding: 20px 0;
//     background-color: #9AECED
// `;

// const LinksRodape = styled.a`
//     color: #000;
//     text-decoration: none;
//     font-weight: 1000;
//     font-size: 14px;
//     &:hover {
//         text-decoration: underline;
//         cursor: pointer;
//     }
// `;
// const Linhas = styled.div`
//     width: 100%;
//     max-width: 1200px;
//     border: none;
//     border-top: 1px solid gray;
//     margin: 20px 0;
// `;

// const CardRodape = styled.div`
//     width: 100%;
//     background-color: #9AECED;
//     position: fixed;
//     bottom: 0;
// `;

// const BolaDoPerfil = styled.div`
//     width: 40px;
//     height: 40px;
//     background-color: #9AECED;
//     border-radius: 50%;
//     margin-left: 20px;
//     cursor: pointer;
//     border: 2px solid #fff;
// `;

// export default function Conteudo({id}) {
//     const [materias, setMaterias] = useState([]);
//     const [conteudos, setConteudos] = useState([]);
//     const [erro, setErro] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     const handleInputChange = (e) => {
//         e.preventDefault();
//         console.log('handleInputChange', e.target.value);
//     } 

//     useEffect (() => {
//         const fetchMaterias = async () => {
//             try {
//                 const resposta = await fetch('http://localhost:3000/materias/selecionarTodasMaterias');
//                 if(!resposta.ok){
//                     throw new Error(`Erro ao listar todas as matérias: ${resposta.status}`);
//                 }
//                 const data = await resposta.json();
//                 setMaterias(data);
//             } catch (error) {
//                 setErro(error)
//                 console.error('Erro ao buscar os dados', error)
//             }finally{
//                 setLoading(false)
//             }
//         }
//         fetchMaterias();
//     }, []);

//     useEffect(() => {
//         const fetchMateriaisEmDestaque = async () => {
//             try {
//                 const resposta = await fetch('http://localhost:3000/conteudos/selecionarTodosConteudos');
//                 if(!resposta.ok){
//                     throw new Error(`Erro ao listar os conteúdos ${resposta.status}`);
//                 }
//                 const data = await resposta.json();
//                 setConteudos(data)
//             } catch (error) {
//                 setErro(error)
//                 console.error('Erro ao buscar os dados', error)
//             }finally{
//                 setLoading(false)
//             }
//         }
//         fetchMateriaisEmDestaque();
//     }, [])

//     const irParaMateria = (id) => {
//         navigate(`/paginasConteudos/${id}`);
//     };
    
//     return (
//         <Container>
//             <Header>
//                 <LogoContainer>
//                     <LogoImage src={Logo} alt="Logo"></LogoImage>
//                 </LogoContainer>
//             </Header>
//                 <Nav>
//                     <NavLink href="/conteudos">INÍCIO</NavLink>
//                     <NavLink>DISCIPLINAS</NavLink>
//                     <NavLink>MEU PERFIL</NavLink>
//                     <NavLink>SAIR</NavLink>
//                     <BolaDoPerfil />
//                 </Nav>
//                 <Linhas />
//             <MainContent>
//                 <SearchSection>
//                     <SearchInputContainer>
//                         <Titulo htmlFor="pesquisar">O que você quer estudar hoje?</Titulo>
//                         <SearchInput id="pesquisar" name="pesquisar" onChange={handleInputChange}/>
//                     </SearchInputContainer>
//                 </SearchSection>

//                 <Linhas />
//             <SeccaoMaterias>
//                     {materias.map(item => (
//                         <MateriasCard onClick={() => irParaMateria(item.id_materia)}>
//                             <a key={item.id_materia} onClick={() => irParaMateria(item.id_materia)}>{item.nome}</a>
//                         </MateriasCard>
//                     ))}
//             </SeccaoMaterias>
//             </MainContent>
//             <CardRodape>
//                 <Rodape>
//                     <LinksRodape href="/sobre">SOBRE</LinksRodape>
//                     <LinksRodape href="/contato">CONTATO</LinksRodape>
//                     <LinksRodape href="/termosDeUso">TERMOS DE USO</LinksRodape>
//                     <LinksRodape href="politica">POLÍTICAS DE PRIVACIDADE</LinksRodape>
//                 </Rodape>
//             </CardRodape>
//         </Container>
//     );
// }


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
                setError(data.mesage || 'Erro ao fazer Cadastro. Tente novamente');
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