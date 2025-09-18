import { useState, useEffect } from "react";
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

export default function Conteudo() {
    const [materias, setMaterias] = useState([]);
    const [erro, setErro] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleInputChange = (e) => {
        e.preventDefault();
        console.log('handleInputChange', e.target.value);
    } 


    useEffect (() => {
        const fetchMaterias = async () =>{
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
    return (
        <div>
            <div>
                <img src={Logo} alt="Logo"></img>
            </div>
            <div>
                <p>INÍCIO</p>
                <p>DISCIPLINAS</p>
                <p>MEU PERFIL</p>
                <a href="/">SAIR</a>
            </div>
            <div>
                {/* Fazer perfil aqui */}
            </div>
            <div /> {/* É para fazer a linha */}
            <div>
                <form>
                    <label htmlFor="pesquisar">O que você quer estudar hoje?</label>
                    <input id="pesquisar" name="pesquisar" onChange={handleInputChange}/>
                </form>
            </div>
            <div /> {/* É para fazer a linha */}
            <div>
                <ul>
                    {materias.map(item => (
                        <li key={item.id}>{item.nome}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

