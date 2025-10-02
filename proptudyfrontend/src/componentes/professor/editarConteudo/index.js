import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../../imagens/logoCortada.png'

const Container = styled.div`
    background-color: #131D47;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const VoltarBotao = styled.a`
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

const atualizarConteudoApi = async(id, dadosConteudo) => {
    try{
        const carregar ={
            ...dadosConteudo,
            valor: parseFloat(dadosConteudo.valor)
        }
        const resposta = await fetch(`http://localhost:3000/conteudos/alterarConteudo/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carregar)
        })
        return await resposta.json();
    }catch(erro){
        console.log('Erro ao atualizar dados na API', erro)
        throw erro;
    }
}

export default function EditarConteudo() {
    const [fk_materia, setMateria] = useState('');
    const [titulo, setTitulo] = useState('');
    const [imagem, setImagem] = useState('');
    const [arquivo, setArquivo] = useState('');
    const [loading, setLoading] = useState('');
    const [erro, setErro] = useState(null);

    const [formDados, setFormDados] = useState({
        id_conteudo: '',
        fk_materia: '',
        titulo: '',
        imagem: '',
        arquivo: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [editErro, setEditErro] = useState(null);
    const [conteudoEmEdicao, setConteudoEmEdicao] = useState(null);
    const [conteudo, setConteudo] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setFormDados(prev => ({...prev, [name]: value}))
    }

    const executaEditar = (conteudo) => {
        setConteudoEmEdicao(conteudo)
        setFormDados({
            id_conteudo: '',
            fk_materia: '',
            titulo: '',
            imagem: '',
            arquivo: ''
        });
        setEditErro(null);
    }

    const salvarEdicao = async(e) => {
        e.preventDefault();
        if(!conteudoEmEdicao) return;
        setIsUpdating(true);
        setEditErro(null);

        try {
            const carregar = {
                fk_materia: '',
                titulo: '',
                imagem: '',
                arquivo: ''
            }

            const conteudoAtualizado = await atualizarConteudoApi(conteudoEmEdicao.id, carregar);

            setConteudo(prevConteudos => prevConteudos.map(mov => 
                mov.id_conteudo === conteudoAtualizado.id ? conteudoAtualizado : mov
            ))
            setConteudoEmEdicao(null)
        } catch (error) {
            console.log('Erro ao salvar a edição', error)
            setEditErro('Falha ao salvar a edição' + error)
        }finally{
            setIsUpdating(false)
        }
    }

    const handleCancelarEdicao = () => {
        setConteudoEmEdicao(null);
        setEditErro(null);
        navigate("/conteudos")
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

            useEffect (() => {
                const fetchMaterias = async () => {
                    try {
                        const resposta = await fetch('http://localhost:3000/materias/selecionarTodasMaterias');
                        if(!resposta.ok){
                            throw new Error(`Erro ao listar todas as matérias: ${resposta.status}`);
                        }
                        const data = await resposta.json();
                        setMateria(data);
                    } catch (error) {
                        setErro(error)
                        console.error('Erro ao buscar os dados', error)
                    }finally{
                        setLoading(false)
                    }
                }
                fetchMaterias();
            }, []);

    return (
        <Container>
            <img src={Logo} alt="Logo"/>
            
            <form onSubmit={salvarEdicao}>
                <div>
                    <label htmlFor="materia">MATÉRIA:</label>
                    <select id="id_materia" name="id_materia">
                        <option value="">Selecione a sua matéria</option>
                        {Array.isArray(fk_materia) &&
                            fk_materia.map(item => (
                            <option key={item.id_materia} value={item.id_materia}>
                                {item.nome}
                            </option>
                            ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="titulo">TITÚLO:</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="imagem">IMAGEM:</label>
                    <input
                        type="text"
                        id="imagem"
                        name="imagem"
                        value={imagem}
                        onChange={(e) => setImagem(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="arquivo">ARQUIVO:</label>
                    <input
                        type="file"
                        id="arquivo"
                        name="arquivo"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={isUpdating}>
                        {isUpdating ? 'Salvar...' : 'SALVAR'}
                    </button>
                    <button type="button" onClick={handleCancelarEdicao} disabled={isUpdating}>Voltar</button>
                </div>
            </form>
        </Container>
    );
}
