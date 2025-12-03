import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import conteudosRoutes from "./routes/conteudosRoutes";
import materiasRoutes from "./routes/materiasRoutes";
import usuariosRoutes from "./routes/usuariosRoutes";
import quizRoutes from "./routes/quizRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/conteudos", conteudosRoutes);
app.use("/materias", materiasRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/quiz", quizRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando!");
});

export default app;
