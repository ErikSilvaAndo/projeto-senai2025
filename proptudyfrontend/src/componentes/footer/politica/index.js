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

const ListaTexto = styled.li`
    font-size: 18px;
    letter-spacing: 1px;
    margin-left: 30px;
`;

const Titulo = styled.h1`
    font-size: 24px;
`;

const TituloTexto = styled.h2`
    font-size: 22px;
`;

const Imagem = styled.img`
    width: 400px;
    margin-top: 10px
`;

const CardTitulo = styled.div`
    margin-top: 50px;
`;

export default function PoliticaFooter() {
    const navigation = useNavigate();
    return (
        <Container>
            <CardLinkVoltar>
                <LinkVoltar onClick={() => navigation(-1)}>Voltar</LinkVoltar>
            </CardLinkVoltar>
            <div>
                <Imagem src={Logo}></Imagem>
            </div>
            <CardTitulo>
                <Titulo>POLÍTICAS DE PRIVACIDADE</Titulo>
            </CardTitulo>
            <CardTexto>
                <Texto>A ProStudy valoriza a sua privacidade e está comprometida em proteger os dados pessoais de todos os usuários que utilizam nossa plataforma. Este documento explica como coletamos, usamos, armazenamos e protegemos suas informações.</Texto>
                <TituloTexto>1. Coleta de Informações</TituloTexto>
                <Texto>Ao utilizar a ProStudy, coletamos dados necessários para garantir o bom funcionamento da plataforma e oferecer uma melhor experiência de uso. As informações coletadas incluem:</Texto>
                <ListaTexto>Dados de cadastro, como nome e e-mail;</ListaTexto>
                <ListaTexto>Informações de acesso, como login e senha;</ListaTexto>
                <ListaTexto>Interações dentro da plataforma, como dúvidas enviadas, materiais acessados e atividades realizadas.</ListaTexto>
                <Texto>Essas informações são fornecidas voluntariamente pelo usuário no momento do cadastro e uso dos serviços.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>2. Uso das Informações</TituloTexto>
                <Texto>Os dados coletados são utilizados exclusivamente para:</Texto>
                <ListaTexto>Permitir o funcionamento do sistema (login, autenticação e personalização da experiência);</ListaTexto>
                <ListaTexto>Facilitar a comunicação entre alunos e professores;</ListaTexto>
                <ListaTexto>Gerar relatórios de desempenho e histórico de atividades;</ListaTexto>
                <ListaTexto>Garantir a segurança e integridade das contas de usuário.</ListaTexto>
                <Texto>A ProStudy não compartilha, vende ou aluga suas informações pessoais a terceiros.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>3. Armazenamento e Segurança</TituloTexto>
                <Texto>Todas as informações são armazenadas em banco de dados seguro (PostgreSQL) com técnicas de criptografia e controle de acesso restrito. Empregamos tecnologias modernas e práticas de segurança recomendadas, utilizando ReactJS e Node.js no desenvolvimento do sistema, garantindo confiabilidade e integridade dos dados.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>4. Direitos do Usuário</TituloTexto>
                <Texto>O usuário tem direito a:</Texto>
                <ListaTexto>Acessar, corrigir ou excluir seus dados pessoais;</ListaTexto>
                <ListaTexto>Solicitar informações sobre o uso de seus dados;</ListaTexto>
                <ListaTexto>Cancelar sua conta a qualquer momento.</ListaTexto>
                <Texto>Para exercer esses direitos, o usuário pode entrar em contato com nossa equipe de suporte por meio dos canais oficiais da plataforma.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>5. Responsabilidade dos Usuários</TituloTexto>
                <Texto>O usuário é responsável por manter suas credenciais de acesso seguras e por não compartilhar suas informações de login com terceiros. A ProStudy não se responsabiliza por acessos indevidos resultantes de negligência do usuário.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>6. Alterações nesta Política</TituloTexto>
                <Texto>A ProStudy pode atualizar esta Política de Privacidade periodicamente para refletir melhorias e atualizações na plataforma. Recomendamos que os usuários consultem esta página regularmente para se manterem informados.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>8. Contato</TituloTexto>
                <Texto>Em caso de dúvidas, solicitações ou sugestões sobre esta Política de Privacidade, entre em contato conosco pelos canais oficiais disponibilizados na plataforma.</Texto>
            </CardTexto>
        </Container>
    );
}
