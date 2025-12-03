import { sql } from "./conexao.js";

async function testar() {
    try {
        const r = await sql`SELECT NOW()`;
        console.log("Conectado ao banco:", r[0]);
    } catch (err) {
        console.error("Erro ao conectar:", err.message);
    }
}

testar();
