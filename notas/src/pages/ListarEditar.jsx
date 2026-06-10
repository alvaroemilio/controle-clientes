import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ListarEditar() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [payDebtUser, setPayDebtUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/consulta")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  const updateUser = () => {
    axios
      .put(`http://localhost:5000/users/divida/${editUser.id}`, editUser)
      .then((response) => {
        const updateUsers = users.map((user) =>
          user.id === editUser.id ? response.data : user
        );
        setUsers(updateUsers);
        setEditUser(null);
      })
      .catch((error) => console.log(error));

    window.location.reload();
  };

  const updateUserDebt = () => {
    axios
      .put(`http://localhost:5000/users/${payDebtUser.id}`, {
        ...payDebtUser,
        itens_divida: "",
        divida: 0,
      })
      .then((response) => {
        const updateUsers = users.map((user) =>
          user.id === payDebtUser.id ? response.data : user
        );
        setUsers(updateUsers);
        setPayDebtUser(null);
      })
      .catch((error) => console.log(error));
    window.location.reload();
  };

  // Função para enviar a mensagem de dívida pelo WhatsApp
  const enviarDivida = (telefone, nome, snome, divida, itens_divida) => {
    // Formata o telefone para o padrão do WhatsApp (removendo espaços, parênteses, etc)
    const telefoneFormatado = telefone.replace(/\D/g, "");
    // Mensagem para enviar
    const mensagem = `Olá ${nome} ${snome}, seus débitos atuais são de R$ ${divida} referente aos itens (${itens_divida}). Por favor, entre em contato para mais informações e confirme com um Ok.`;
    // URL para abrir WhatsApp
    const url = `https://wa.me/${telefoneFormatado}?text=${encodeURIComponent(
      mensagem
    )}`;
    // Abre em nova aba
    window.open(url, "_blank");
  };

  return (
    <>
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.snome}</td>
              <td>{user.telefone}</td>
              <td>{user.endereco}</td>
              <td>{user.divida}</td>
              <td>{user.itens_divida}</td>

              <td className="center">
                <button
                  onClick={() => setEditUser(user)} // Abre o modal de editar
                  className="btn btn-sm btn-primary ms-2"
                >
                  Editar Dívidas
                </button>
                <button
                  onClick={() => setPayDebtUser(user)} // Abre o modal de quitar dívida
                  className="btn btn-sm btn-secondary ms-2"
                >
                  Quitar Dívidas
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-success ms-2 "
                  onClick={() =>
                    enviarDivida(
                      user.telefone,
                      user.nome,
                      user.snome,
                      user.divida,
                      user.itens_divida
                    )
                  }
                >
                  Enviar Informações
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
                      disabled
                      onChange={(e) =>
                        setEditUser({ ...editUser, divida: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="nova_divida" className="form-label">
                      Valor a Ser Adicionado
                    </label>
                    <input
                      type="text"
                      id="nova_divida"
                      className="form-control"
                      value={editUser.nova_divida}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          nova_divida: e.target.value,
                        })
                      }
                    />
                  </div>

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

      {/* Modal para Quitar Dívida */}
      {payDebtUser && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          aria-labelledby="payDebtModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="payDebtModalLabel">
                  Confirmar quitação de dívidas?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setPayDebtUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateUserDebt();
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
                      value={payDebtUser.nome}
                      disabled
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
                      value={payDebtUser.snome}
                      disabled
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
                      value={payDebtUser.telefone}
                      disabled
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
                      value={payDebtUser.endereco}
                      disabled
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
                      value={payDebtUser.divida}
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="itens_divida" className="form-label">
                      Dívida
                    </label>
                    <textarea
                      type="text"
                      id="itens_divida"
                      className="form-control"
                      value={payDebtUser.itens_divida}
                      disabled
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                      Confirmar
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setPayDebtUser(null)}
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
    </>
  );
}

export default ListarEditar;
