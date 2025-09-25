import Login from './componentes/login/index'
import CadastroUsuario from './componentes/cadastro'
import Conteudo from './componentes/conteudo';
import AdicionarMateria from './componentes/adicionarMateria';
import EditarConteudo from './componentes/editarMateria';
import PaginasMaterias from './componentes/PaginasMaterias'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login titulo='Login'/>}></Route>
          <Route path="/cadastroUsuario" element={<CadastroUsuario titulo='CadastroUsuario'/>}></Route>
          <Route path='/conteudos' element={<Conteudo titulo='Conteudos'></Conteudo>}></Route>
          <Route path='/adicionarMateria' element={<AdicionarMateria></AdicionarMateria>}></Route>
          <Route path='/editarConteudo' element={<EditarConteudo></EditarConteudo>}></Route>
          <Route path='/paginasMateria/:id' element={<PaginasMaterias titulo="Páginas Matérias"></PaginasMaterias>}></Route>
        </Routes>
      </Router>
  );
}

export default App;
