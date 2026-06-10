import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Cadastro() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    nome: "",
    snome: "",
    telefone: "",
    endereco: "",
    divida: "",
    itens_divida: "",
  });

  const addUser = (e) => {
    e.preventDefault(); // Impede o reload da página
    axios
      .post("http://localhost:5000/users", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({
          nome: "",
          snome: "",
          telefone: "",
          endereco: "",
          divida: "",
          itens_divida: "",
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-5">
      <h2 className="mt-5">Adicionar Novos Clientes</h2>
      <form onSubmit={addUser} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={newUser.nome}
            onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Sobrenome</label>
          <input
            type="text"
            className="form-control"
            value={newUser.snome}
            onChange={(e) => setNewUser({ ...newUser, snome: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Telefone</label>
          <input
            type="text"
            className="form-control"
            value={newUser.telefone}
            onChange={(e) =>
              setNewUser({ ...newUser, telefone: e.target.value })
            }
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Endereço</label>
          <input
            type="text"
            className="form-control"
            value={newUser.endereco}
            onChange={(e) =>
              setNewUser({ ...newUser, endereco: e.target.value })
            }
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Valor da Dívida</label>
          <input
            type="text"
            className="form-control"
            value={newUser.divida}
            onChange={(e) => setNewUser({ ...newUser, divida: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Itens Da Dívida</label>
          <input
            type="text"
            className="form-control"
            value={newUser.itens_divida}
            onChange={(e) =>
              setNewUser({ ...newUser, itens_divida: e.target.value })
            }
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Adicionar Cliente
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
