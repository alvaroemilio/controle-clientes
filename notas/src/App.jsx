import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import ListarEditar from "./pages/ListarEditar";
import ListarFiltro from "./pages/ListarFiltro";
import NoPage from "./pages/NoPage";
import Contato from "./pages/Contato";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Início
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/cadastro">
                  Cadastro
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/editar">
                  Editar
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/filtro">
                  Filtro
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contato">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h1 className="mt-4">Módulo De Lançamento De Notas</h1>
      <p>
        O Módulo de Cadastro de Notas de Clientes foi desenvolvido para ajudar
        empresas a gerenciar e controlar as pendências financeiras de seus
        clientes de maneira simples e eficiente. Com esse sistema, você tem a
        capacidade de realizar uma série de ações fundamentais para otimizar o
        processo de cobrança e acompanhamento da saúde financeira dos seus
        clientes.
      </p>

      {/* Corpo da página */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/filtro" element={<ListarFiltro />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-light text-center text-lg-start mt-5">
        <div className="container p-4">
          <p className="text-muted">
            © {new Date().getFullYear()} Sistema-Notinhas. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
