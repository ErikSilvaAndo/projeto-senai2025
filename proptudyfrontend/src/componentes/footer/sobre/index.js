import { useState, useEffect } from "react";
import React from "react";
import { useNavigation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../../imagens/logo2.png';

const Container = styled.div`
    background-color: #131D47;
    color: #fff;
    font-family: Arial, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
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

const CardTexto = styled.div`
    display: flex;
    text-align: justify;
    width: 1000px;
    flex-direction: column;
`;

const Texto = styled.p`
    font-size: 20px;
    letter-spacing: 1px;
`;

const Imagem = styled.img`
    width: 450px;
    margin-top: 10px
`;

const LinkYoutube = styled.a`
    font-size: 23px;
    color: #fff;
    text-align: center;
    text-decoration: none;
`;

export default function SobreFooter() {
    const navigation = useNavigate();
    return (
        <Container>
            <CardLinkVoltar>
                <LinkVoltar onClick={() => navigation(-1)}>Voltar</LinkVoltar>
            </CardLinkVoltar>
            <div>
                <Imagem src={Logo}></Imagem>
            </div>
                <h1>SOBRE</h1>
            <CardTexto>
                <Texto>A ProStudy é uma empresa dedicada a transformar a educação por meio da tecnologia. Nascida do entusiasmo de estudantes do Curso Técnico em Desenvolvimento de Sistemas, em Mirandópolis-SP, a ProStudy surgiu com o propósito de aproximar alunos e professores, criando um ambiente digital que torna o aprendizado mais acessível, dinâmico e interativo.
                Acreditamos que a educação de qualidade deve acompanhar o ritmo da era digital. Por isso, desenvolvemos uma plataforma intuitiva que permite aos alunos esclarecer dúvidas, acessar materiais de estudo e se preparar melhor para o vestibular, enquanto professores podem organizar conteúdos, gerenciar atividades e acompanhar o progresso de suas turmas com facilidade.
                Com base em tecnologias modernas como ReactJS, Node.js e PostgreSQL, a ProStudy une desempenho, segurança e inovação para oferecer uma experiência eficiente e confiável. Nosso trabalho é guiado por valores como empatia, compromisso e inovação, buscamos compreender as necessidades de quem aprende e ensinar de forma mais humana e próxima da realidade de cada estudante.
                Mais do que uma ferramenta, a ProStudy é uma ponte entre a dúvida e a conquista. Nosso objetivo é inspirar o aprendizado contínuo, promover a autonomia e contribuir para uma educação que evolui junto com as pessoas.</Texto>
                <LinkYoutube href="https://youtube.com/shorts/qMFsgscbgIk" target="_blank">Conheça mais sobre nosso projeto</LinkYoutube>
            </CardTexto>
        </Container>
    );
}
