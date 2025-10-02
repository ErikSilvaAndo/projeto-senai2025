import Login from './componentes/login/index'
import CadastroUsuario from './componentes/cadastro'
import Conteudo from './componentes/conteudo';
import AdicionarMateria from './componentes/professor/adicionarConteudo';
import EditarConteudo from './componentes/professor/editarConteudo';
import PaginaMateria from './componentes/PaginasMaterias';
import ConteudoProfessor from './componentes/professor/conteudoProfessor';
import PaginaMateriasProfessor from './componentes/professor/paginaMateriaProfessor';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login titulo='Login'/>}></Route>
          <Route path="/cadastroUsuario" element={<CadastroUsuario titulo='CadastroUsuario'/>}></Route>
          <Route path='/conteudos' element={<Conteudo titulo='Conteudos'></Conteudo>}></Route>
          <Route path='/adicionarConteudo' element={<AdicionarMateria></AdicionarMateria>}></Route>
          <Route path='/editarConteudo/:id' element={<EditarConteudo></EditarConteudo>}></Route>
          <Route path='/paginasMateria/:id' element={<PaginaMateria titulo="Páginas Matérias"/>}></Route>
          <Route path='/conteudosProfessor' element={<ConteudoProfessor titulo="Conteúdos Professor"/>}></Route>
          <Route path='/paginasMateriaProfessor/:id' element={<PaginaMateriasProfessor titulo="Página materia professor"/>}></Route>
        </Routes>
      </Router>
  );
}

export default App;
