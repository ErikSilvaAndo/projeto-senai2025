import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './componentes/login/index'
import CadastroUsuario from './componentes/cadastro'
import Conteudo from './componentes/conteudo';
import AdicionarMateria from './componentes/professor/adicionarConteudo';
import EditarConteudo from './componentes/professor/editarConteudo';
import PaginaMateria from './componentes/PaginasMaterias';
import ConteudoProfessor from './componentes/professor/conteudoProfessor';
import PaginaMateriasProfessor from './componentes/professor/paginaMateriaProfessor';
import SobreFooter from './componentes/footer/sobre';
import PoliticaFooter from './componentes/footer/politica';
import TermosUsoFooter from './componentes/footer/termos de uso';
import ContatoFooter from './componentes/footer/contato';
import MeuPerfil from './componentes/perfil';
import AdicionarQuiz from './componentes/professor/quiz/adicionarQuiz';
import ListarQuizProfessor from './componentes/professor/quiz/quizProfessor';
import EditarQuiz from './componentes/professor/quiz/editarQuiz';
import ListarQuiz from './componentes/quiz';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login titulo='Login'/>}></Route>
          <Route path='/cadastroUsuario' element={<CadastroUsuario titulo='CadastroUsuario'/>}></Route>
          <Route path='/conteudos' element={<Conteudo titulo='Conteudos' />}></Route>
          <Route path='/adicionarConteudo' element={<AdicionarMateria titulo="Página de adicionar matéria"/>}></Route>
          <Route path='/editarConteudo/:id_conteudo' element={<EditarConteudo titulo="Página de edição de matéria"/>}></Route>
          <Route path='/paginasConteudos/:id' element={<PaginaMateria titulo="Páginas Matérias"/>}></Route>
          <Route path='/conteudosProfessor' element={<ConteudoProfessor titulo="Conteúdos Professor"/>}></Route>
          <Route path='/paginasConteudoProfessor/:id' element={<PaginaMateriasProfessor titulo="Página materia professor"/>}></Route>
          <Route path='/politica' element={<PoliticaFooter titulo="Página política de privacidade"/>}></Route>
          <Route path='/sobre' element={<SobreFooter titulo="Página sobre"/>}></Route>
          <Route path='/termosDeUso' element={<TermosUsoFooter titulo="Página termos de uso"/>}></Route>
          <Route path='/contato' element={<ContatoFooter titulo="Página de contato"/>}></Route>
          <Route path='/perfil/:id_usuario' element={<MeuPerfil titulo="Página de perfil"/>}></Route>
          <Route path='/adicionarQuiz' element={<AdicionarQuiz titulo="Página de adicionar quiz" />}></Route>
          <Route path='/listarQuizProfessor' element={<ListarQuizProfessor titulo="Página de listar quiz" />}></Route>
          <Route path='/editarQuiz/:id_quiz' element={<EditarQuiz titulo="Página de editar quiz" />}></Route>
          <Route path='/listarQuiz' element={<ListarQuiz titulo="Página de listar quiz" />}></Route>
        </Routes>
      </Router>
  );
}

export default App;
