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
`;

const SucessoAoLogar = styled.p`
    color: #fff;
`;

export default function Conteudo() {
    return (
        <>
            
        </>
    );
}