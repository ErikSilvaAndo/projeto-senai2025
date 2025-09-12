import Login from './componentes/login/index'
import CadastroUsuario from './componentes/cadastro'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login titulo='Login'/>}></Route>
          <Route path="/cadastroUsuario" element={<CadastroUsuario titulo='CadastroUsuario'/>}></Route>
        </Routes>
      </Router>
  );
}

export default App;
