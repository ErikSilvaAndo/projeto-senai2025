import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../imagens/logoCortada.png' // Certifique-se de que o caminho está correto

// --- Estilos Modificados ---

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

const Imagem = styled.img`
    width: 250px;
    height: 150px;
    margin: 10px
`;

const CardLabelInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const Label = styled.label`
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px
`;

const Select = styled.select`
    border-radius: 160px;
    width: 350px;
    height: 50px;
    background-color: #9AECED;
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
`;

const Option = styled.option`
    border-radius: 160px;
    width: 350px;
    height: 50px;
    background-color: #ffffffff;
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
`;

const Input = styled.input`
    border-radius: 160px;
    width: 350px;
    height: 50px;
    background-color: #9AECED;
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
`;

const Botao = styled.button`
    font-weight: 1000;
    background-color: #9AECED;
    width: 200px;
    height: 45px;
    border-radius: 50px;
    font-size: 20px;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const CardBotao = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    flex-direction: column;
`;

export default function AdicionarMateria() {
    const [fk_materia, setMateria] = useState('');
    const [titulo, setTitulo] = useState('');
    const [imagem, setImagem] = useState('');
    const [descricao, setDescricao] = useState('');
    const [arquivo, setArquivo] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState('');
    const [erro, setErro] = useState(null)

    const navigate = useNavigate();

    // teste
      const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile); // 'file' é o nome do campo que sua API espera

    try {
      const response = await fetch('/api/upload', { // Substitua '/api/upload' pelo endpoint da sua API
        method: 'POST',
        body: formData,
        // O Content-Type é definido automaticamente para multipart/form-data pelo navegador ao enviar FormData
      });

      if (response.ok) {
        alert('Arquivo enviado com sucesso!');
      } else {
        alert('Falha ao enviar arquivo.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao enviar o arquivo.');
    }
  };

    const executaSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const idMateriaSelecionada = event.target.id_materia.value;
        try {
            const resposta = await fetch('http://localhost:3000/conteudos/adicionarConteudos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({fk_materia: idMateriaSelecionada, titulo, imagem, arquivo }),
            });
            //console.log({fk_materia: idMateriaSelecionada,titulo, imagem, arquivo});
            if (resposta.ok) {
                alert("Matéria adicionado com sucesso!");
                navigate('/conteudos');
            } else {
                alert("Erro ao adicionar matéria.");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro de conexão.");
        } finally {
            setLoading(false);
        }
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
            <Imagem src={Logo} alt="Logo"/>
            
            <form onSubmit={executaSubmit}>
                <CardLabelInput>
                    <Label htmlFor="materia">MATÉRIA:</Label>
                    <Select id="id_materia" name="id_materia">
                        <Option value="">Selecione a sua matéria</Option>
                        {Array.isArray(fk_materia) &&
                            fk_materia.map(item => (
                            <Option key={item.id_materia} value={item.id_materia}>
                                {item.nome}
                            </Option>
                            ))}
                    </Select>
                </CardLabelInput>
                <CardLabelInput>
                    <Label htmlFor="titulo">TITÚLO:</Label>
                    <Input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </CardLabelInput>
                <CardLabelInput>
                    <Label htmlFor="imagem">IMAGEM:</Label>
                    <Input
                        type="text"
                        id="imagem"
                        name="imagem"
                        value={imagem}
                        onChange={(e) => setImagem(e.target.value)}
                        required
                    />
                </CardLabelInput>
                <CardLabelInput>
                    <Label htmlFor="arquivo">ARQUIVO:</Label>
                    <Input
                        type="file"
                        id="arquivo"
                        name="arquivo"
                        onChange={handleFileChange}
                        required
                    />
                </CardLabelInput>
                <CardBotao>
                    <Botao type="submit" disabled={loading}>
                        {loading ? 'Adicionando...' : 'ADICIONAR'}
                    </Botao>
                    <VoltarBotao href="/">Voltar</VoltarBotao>
                </CardBotao>
            </form>
        </Container>
    );
}
