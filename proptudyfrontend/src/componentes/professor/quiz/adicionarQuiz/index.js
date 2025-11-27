import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../../imagens/logo2.png";


export default function AdicionarQuiz() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [link, setLink] = useState('');
    const [estaCarregando, setEstaCarregando] = useState(false);
    const [loading, setLoading] = useState('');
    const [erro, setErro] = useState('');

    const navigate = useNavigate()

    const resetarFormulario = () => {
        setTitulo('');
        setDescricao('');
        setLink('');
    };

    const aoSubmeter = async (e) => {
        e.preventDefault();
        setErro('');

        if (!titulo || !descricao || !link) {
            setErro('Por favor, preencha todos os campos e selecione os arquivos.');
            return;
        }


        setEstaCarregando(true);

        try {
            const resposta = await fetch('http://localhost:3000/quiz/criarQuiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titulo: titulo,
                    descricao: descricao,
                    link: link,
                }),
            });

            if (resposta.ok) {
                alert('Adicionado')

            }

            if (!resposta.ok) {
                const dadosErro = await resposta.json();
                throw new Error(dadosErro.error || `Erro HTTP: ${resposta.status}`);
            }

            resetarFormulario();

        } catch (err) {
            console.error('Erro ao cadastrar conteúdo:', err);
            setErro(`Falha ao cadastrar: ${err.message}.`);
        } finally {
            setEstaCarregando(false);
            alert("Conteúdo cadastrado com sucesso")
        }
    };
    
    return (
        <div>
            <div>
                <img src={Logo}></img>
            </div>
            <div>
                <form onClick={aoSubmeter}>
                    <div>
                        <label>TITULO:</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                            disabled={estaCarregando} />
                    </div>
                    <div>
                        <label>DESCRIÇÃO:</label>
                        <input
                            type="text"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                            disabled={estaCarregando}  />
                    </div>
                    <div>
                        <label>LINK:</label>
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            required
                            disabled={estaCarregando} />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Adicionando...' : 'ADICIONAR'}
                    </button>
                </form>
                <a onClick={() => navigate(-1)} >Voltar</a>
            </div>
        </div>
    )
}