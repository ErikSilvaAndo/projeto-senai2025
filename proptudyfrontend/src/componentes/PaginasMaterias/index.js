import { useState, useEffect } from "react";
import React from "react";
import { useNavigation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../imagens/logo2.png';

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
    font-weight: bold;
    text-transform: uppercase;
    color: black;
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
`;

export default function PaginaMaterias() {
    const [materias, setMaterias] = useState([]);
    const [conteudos, setConteudos] = useState([]);
    const [erro, setErro] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigate();

    // Teste
    


    const id = useParams();
    
    useEffect(() => {
        const fetchSelecionarConteudo = async () => {
            try {
                const resposta = await fetch(`http://localhost:3000/conteudos/getConteudosPorIdMateria/${id.id}`)
                if(!resposta.ok){
                    throw new Error(`Erro ao listar todas as matérias: ${resposta.status}`);
                }
                const dados = await resposta.json();
                setConteudos(dados);
            } catch (error) {
                setErro(error);
                console.error('Erro ao buscar os dados', error);
            }finally{
                setLoading(false);
            }
        }
        fetchSelecionarConteudo();
    },[]);

    useEffect(() => {
        const fetchSelecionarMaterias = async () => {
            try {
                const resposta = await fetch(`http://localhost:3000/materias/selecionarPorId/${id.id}`)
                if(!resposta.ok){
                    throw new Error(`Erro ao listar todas as matérias: ${resposta.status}`);
                }
                const dados = await resposta.json();
                setMaterias(dados);
            } catch (error) {
                setErro(error);
                console.error('Erro ao buscar os dados', error);
            }finally{
                setLoading(false);
            }
        }
        fetchSelecionarMaterias();
    },[]);

    return (
        <Container>
            <CardLinkVoltar>
                <LinkVoltar onClick={() => navigation(-1)}>Voltar</LinkVoltar>
            </CardLinkVoltar>
            <CardImagem>
                <LogoImage src={Logo} />
            </CardImagem>
            <CardTitulo>
                {materias.map(item => (
                        <Titulo key={item.id}>{item.nome}</Titulo>
                ))}
            </CardTitulo>

            <SecaoConteudo>
                {conteudos.map(item => (
                    <CardConteudo>
                        <TituloConteudo key={item.id_conteudo}>{item.titulo}</TituloConteudo>
                        <ImagemConteudo src={item.imagem} alt="Imagem do conteúdo"></ImagemConteudo>
                        <CardLinks>
                            <Links href={item.link} target="_blank">Vídeo YouTube</Links>
                            <Links href={item.arquivo} target="_blank">Arquivo PDF</Links>
                        </CardLinks>
                    </CardConteudo>
                ))}
            </SecaoConteudo>
        </Container>
    );
}

