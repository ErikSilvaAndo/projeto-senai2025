import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../imagens/logo2.png";

const Container = styled.div`
    background-color: #131D47;
    color: #fff;
    font-family: Arial, sans-serif;
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    margin-bottom: 20px;
`;

const LogoImage = styled.img`
    width: 200px;
    height: 120px;
    margin-right: 10px;
`;

const BolaDoPerfil = styled.div`
    width: 300px;
    height: 300px;
    background-color: #9AECED;
    border-radius: 50%;
    border: 2px solid #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    position: relative;
    cursor: pointer;

    &:hover::after {
        content: "Alterar imagem";
        position: absolute;
        bottom: 0;
        background-color: rgba(0,0,0,0.6);
        color: white;
        font-size: 16px;
        width: 100%;
        text-align: center;
        padding: 10px 0;
    }
`;

const FotoPerfil = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Label = styled.label`
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
`;

const Input = styled.input`
    border-radius: 160px;
    width: 100%;
    height: 50px;
    background-color: #9AECED;
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
`;

const CardLabelInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 75%;
`;

const VoltarBotao = styled.a`
    text-decoration: none;
    color: #fff;
    font-size: 15px;
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;

    &:hover{
        cursor: pointer;
        text-decoration: underline
    }
`;

export default function MeuPerfil() {
    const [erro, setErro] = useState(false);
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState([]);
    const [imagemPreview, setImagemPreview] = useState(null);
    const [imagemBase64, setImagemBase64] = useState(null);

    const navigation = useNavigate();

    const logout = () => {
        localStorage.removeItem("usuario");
        navigation("/");
    };

    useEffect(() => {
        const carregarUsuario = async () => {
            try {
                setLoading(true);
                const dados = await fetchUsuario();
                setUsuario(dados);
                if (dados[0]?.imagem) {
                    setImagemPreview(dados[0].imagem);
                }
            } catch (erro) {
                console.log("Erro ao buscar usuário", erro);
                setErro("Erro ao buscar usuário: " + erro);
            } finally {
                setLoading(false);
            }
        };
        carregarUsuario();
    }, []);

    const fetchUsuario = async () => {
        try {
            const usuarioString = localStorage.getItem("usuario");
            if (!usuarioString) {
                console.log("Usuário não encontrado no localStorage");
                return [];
            }

            const usuario = JSON.parse(usuarioString);
            const usuarioId = usuario.id;
            const resposta = await fetch(`http://localhost:3000/usuarios/buscarUsuariosPorId/${usuarioId}`);
            const dados = await resposta.json();
            return dados;
        } catch (erro) {
            console.log("Erro ao buscar usuário", erro);
            throw erro;
        }
    };

    const handleImagemChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagemPreview(reader.result);
            setImagemBase64(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const enviarImagem = async () => {
        if (!imagemBase64) {
            alert("Escolha uma imagem primeiro!");
            return;
        }

        try {
            const usuarioString = localStorage.getItem("usuario");
            const usuario = JSON.parse(usuarioString);
            const usuarioId = usuario.id;

            const resposta = await fetch(`http://localhost:3000/usuarios/salvarImagem/${usuarioId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imagem: imagemBase64 }),
            });

            const resultado = await resposta.json();

            if (resposta.ok) {
                alert("Imagem atualizada com sucesso!");
                setUsuario([resultado.usuario]);
            } else {
                alert("Erro ao salvar imagem: " + resultado.error);
            }
        } catch (erro) {
            console.log("Erro ao enviar imagem:", erro);
            alert("Erro ao enviar imagem.");
        }
    };

    return (
        <Container>
            <Header>
                <LogoImage src={Logo} alt="Logo" />
                <VoltarBotao href="/" onClick={logout}>
                    SAIR
                </VoltarBotao>
            </Header>

            <p>MEU PERFIL</p>

            <BolaDoPerfil>
                {imagemPreview ? (
                    <FotoPerfil src={imagemPreview} alt="Foto de perfil" />
                ) : (
                    <p style={{ color: "#131D47", fontWeight: "bold" }}>Sem imagem</p>
                )}
            </BolaDoPerfil>

            <input
                type="file"
                accept="image/*"
                onChange={handleImagemChange}
                style={{ marginBottom: "15px" }}
            />

            <CardLabelInput>
                {Array.isArray(usuario) &&
                    usuario.map((item) => (
                        <div key={item.id}>
                            <Label>NOME:</Label>
                            <Input value={item.nome} disabled />

                            <Label>EMAIL:</Label>
                            <Input value={item.email} disabled />

                            <Label>SENHA:</Label>
                            <Input value="********" type="password" disabled />
                        </div>
                    ))}
            </CardLabelInput>
                        <button
                onClick={enviarImagem}
                style={{
                    backgroundColor: "#9AECED",
                    color: "#131D47",
                    fontWeight: "bold",
                    padding: "10px 25px",
                    borderRadius: "25px",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Salvar Imagem
            </button>
            <div>
                <VoltarBotao onClick={() => navigation(-1)}>Voltar</VoltarBotao>
            </div>
        </Container>
    );
}
