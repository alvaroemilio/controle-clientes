import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ListarFiltro() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  const updateUser = () => {
    axios
      .put(`http://localhost:5000/users/${editUser.id}`, editUser)
      .then((response) => {
        const updateUsers = users.map((user) =>
          user.id === editUser.id ? response.data : user
        );
        setUsers(updateUsers);
        setEditUser();
      })
      .catch((error) => console.log(error));
    window.location.reload();
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.log(error));
    window.location.reload();
  };

  const filteredUsers = users.filter((user) =>
    user.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-center mb-4">Lista de Clientes</h1>

      {/* Campo de busca */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabela */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Dívida</th>
              <th>Itens</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.slice(0, 10).map((user) => (
              <tr key={user.id}>
                <td>{user.nome}</td>
                <td>{user.snome}</td>
                <td>{user.telefone}</td>
                <td>{user.endereco}</td>
                <td>{user.divida}</td>
                <td>{user.itens_divida}</td>
                <td>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => setEditUser(user)}
                  >
                    Editar
                  </button>
                  {/* <button
                    className="btn btn-danger ms-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Deletar
                  </button> */}
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Tem certeza que deseja deletar o usuário "${user.nome}"?`
                        )
                      ) {
                        deleteUser(user.id);
                      }
                    }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para Edição */}
      {editUser && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  Editar Usuário
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setEditUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateUser();
                  }}
                >
                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="nome"
                      className="form-control"
                      value={editUser.nome}
                      onChange={(e) =>
                        setEditUser({ ...editUser, nome: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="snome" className="form-label">
                      Sobrenome
                    </label>
                    <input
                      type="text"
                      id="snome"
                      className="form-control"
                      value={editUser.snome}
                      onChange={(e) =>
                        setEditUser({ ...editUser, snome: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="telefone" className="form-label">
                      Telefone
                    </label>
                    <input
                      type="text"
                      id="telefone"
                      className="form-control"
                      value={editUser.telefone}
                      onChange={(e) =>
                        setEditUser({ ...editUser, telefone: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="endereco" className="form-label">
                      Endereço
                    </label>
                    <input
                      type="text"
                      id="endereco"
                      className="form-control"
                      value={editUser.endereco}
                      onChange={(e) =>
                        setEditUser({ ...editUser, endereco: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="divida" className="form-label">
                      Dívida
                    </label>
                    <input
                      type="text"
                      id="divida"
                      className="form-control"
                      value={editUser.divida}
                      onChange={(e) =>
                        setEditUser({ ...editUser, divida: e.target.value })
                      }
                    />
                  </div>

                  {/* <div className="mb-3">
                    <label htmlFor="itens_divida" className="form-label">
                      Itens Da Dívida
                    </label>
                    <input
                      type="text"
                      id="itens_divida"
                      className="form-control"
                      value={editUser.itens_divida}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          itens_divida: e.target.value,
                        })
                      }
                    />
                  </div> */}

                  <div className="mb-3">
                    <label htmlFor="itens_divida" className="form-label">
                      Itens Da Dívida
                    </label>
                    <textarea
                      id="itens_divida"
                      className="form-control"
                      rows="4"
                      value={editUser.itens_divida}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          itens_divida: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>

                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                      Atualizar Usuário
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setEditUser(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulário de edição */}
      {/* {editUser && (
        <div className="card mt-5">
          <div className="card-body">
            <h3 className="card-title mb-4">Editar Usuário</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateUser();
              }}
            >
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="nome"
                    className="form-control"
                    placeholder="Nome"
                    value={editUser.nome}
                    onChange={(e) =>
                      setEditUser({ ...editUser, nome: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="snome"
                    className="form-control"
                    placeholder="Sobrenome"
                    value={editUser.snome}
                    onChange={(e) =>
                      setEditUser({ ...editUser, snome: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="telefone"
                    className="form-control"
                    placeholder="Telefone"
                    value={editUser.telefone}
                    onChange={(e) =>
                      setEditUser({ ...editUser, telefone: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="endereco"
                    className="form-control"
                    placeholder="Endereço"
                    value={editUser.endereco}
                    onChange={(e) =>
                      setEditUser({ ...editUser, endereco: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="divida"
                    className="form-control"
                    placeholder="Dívida"
                    value={editUser.divida}
                    onChange={(e) =>
                      setEditUser({ ...editUser, divida: e.target.value })
                    }
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success me-2">
                Atualizar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditUser(null)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default ListarFiltro;
