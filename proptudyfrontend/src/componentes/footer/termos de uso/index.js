import React from "react";
import { useNavigate } from "react-router-dom";
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
    
`;

const TituloTexto = styled.h2`
    font-size: 22px;
`;

const Imagem = styled.img`
    width: 400px;
    margin-top: 50px
`;

const CardTitulo = styled.div`
    margin-top: 30px;
    text-align: center;
`;

export default function TermosUsoFooter() {
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
                <Titulo>TERMOS DE USO</Titulo>
                <p><strong>Última atualização:</strong> Outubro de 2025</p>
            </CardTitulo>
            <CardTexto>
                <Texto>Bem-vindo(a) à ProStudy, uma plataforma de estudo a distância desenvolvida para facilitar a interação entre alunos e professores, promovendo o aprendizado digital de forma acessível, segura e eficiente. Ao acessar ou utilizar a ProStudy, você concorda com os presentes Termos de Uso, que regem a utilização dos nossos serviços. Recomendamos a leitura atenta deste documento antes de continuar utilizando a plataforma.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>1. Aceitação dos Termos</TituloTexto>
                <Texto>O uso da ProStudy implica na aceitação integral e incondicional destes Termos de Uso e da Política de Privacidade. Caso não concorde com algum dos termos aqui descritos, o usuário deve interromper o uso da plataforma imediatamente.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>2. Descrição dos Serviços</TituloTexto>
                <Texto>A ProStudy oferece uma plataforma web educacional que permite a:</Texto>
                <ListaTexto>Interação entre alunos e professores;</ListaTexto>
                <ListaTexto>Envio e resposta de dúvidas;</ListaTexto>
                <ListaTexto>Acesso a materiais e conteúdos de estudo;</ListaTexto>
                <ListaTexto>Organização e acompanhamento de atividades acadêmicas.</ListaTexto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>3. Cadastro e Responsabilidade do Usuário</TituloTexto>
                <Texto>Para utilizar os recursos da ProStudy, é necessário realizar um cadastro com informações verdadeiras e atualizadas. O usuário é responsável por:</Texto>
                <ListaTexto>Manter a confidencialidade do seu login e senha;</ListaTexto>
                <ListaTexto>Não compartilhar suas credenciais com terceiros;</ListaTexto>
                <ListaTexto>Garantir a veracidade dos dados informados;</ListaTexto>
                <ListaTexto>Utilizar a plataforma de forma ética, respeitosa e compatível com sua finalidade educacional.</ListaTexto>
                <Texto>A ProStudy se reserva o direito de suspender ou excluir contas que violem estes Termos de Uso.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>4. Uso Adequado da Plataforma</TituloTexto>
                <Texto>O usuário se compromete a utilizar a ProStudy de forma responsável, abstendo-se de:</Texto>
                <ListaTexto>Praticar atos ilícitos ou que violem direitos de terceiros;</ListaTexto>
                <ListaTexto>Publicar conteúdos ofensivos, discriminatórios ou inapropriados;</ListaTexto>
                <ListaTexto>Tentar invadir, modificar ou causar danos ao sistema da plataforma;</ListaTexto>
                <ListaTexto>Utilizar indevidamente os recursos para fins não educacionais.</ListaTexto>
                <Texto>Qualquer conduta inadequada poderá resultar na exclusão imediata da conta e na comunicação às autoridades competentes, se necessário.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>5. Propriedade Intelectual</TituloTexto>
                <Texto>Todo o conteúdo, design, código, layout e materiais disponibilizados na ProStudy são de propriedade exclusiva da equipe desenvolvedora. É proibida a cópia, reprodução, distribuição ou modificação de qualquer parte da plataforma sem autorização expressa da ProStudy. Os conteúdos postados por alunos e professores (textos, dúvidas, materiais e respostas) permanecem de responsabilidade de seus respectivos autores, mas ao publicá-los, o usuário concede à ProStudy o direito de exibi-los dentro da plataforma para fins educacionais.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>6. Privacidade e Proteção de Dados</TituloTexto>
                <Texto>A ProStudy adota medidas de segurança para proteger os dados dos usuários, conforme descrito em nossa Política de Privacidade. As informações pessoais são tratadas de forma confidencial, armazenadas em banco de dados seguro (PostgreSQL) e protegidas por técnicas de criptografia e autenticação.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>7. Atualizações e Modificações</TituloTexto>
                <Texto>A ProStudy poderá atualizar estes Termos de Uso a qualquer momento, com o objetivo de aprimorar o serviço ou adequar-se à legislação vigente. As alterações serão comunicadas por meio da própria plataforma, e o uso contínuo dos serviços após a atualização implicará na aceitação das novas condições.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>8. Limitação de Responsabilidade</TituloTexto>
                <Texto>A ProStudy não se responsabiliza por:</Texto>
                <ListaTexto>Danos causados por falhas na conexão ou na internet do usuário;</ListaTexto>
                <ListaTexto>Conteúdos publicados por terceiros dentro da plataforma;</ListaTexto>
                <ListaTexto>Perda de dados decorrente de mau uso da conta ou descumprimento destes Termos.</ListaTexto>
                <Texto>A equipe se compromete a manter o sistema atualizado e funcional, mas não garante disponibilidade ininterrupta dos serviços.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>9. Encerramento de Conta</TituloTexto>
                <Texto>O usuário pode encerrar sua conta a qualquer momento.</Texto>
                <Texto>A ProStudy também poderá desativar contas inativas ou que violem os presentes Termos, sem aviso prévio, visando manter a segurança e a integridade da plataforma.</Texto>
            </CardTexto>
            <CardTexto>
                <TituloTexto>10. Contato</TituloTexto>
                <Texto>Para dúvidas, sugestões ou solicitações relacionadas aos Termos de Uso, o usuário pode entrar em contato pelos canais oficiais disponibilizados na plataforma.</Texto>
            </CardTexto>
        </Container>
    );
}