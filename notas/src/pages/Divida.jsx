import React, { useState } from "react";
import axios from "axios";

function Divida() {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [snome, setSnome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [divida, setDivida] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar o valor da dívida
    if (isNaN(divida) || divida <= 0) {
      setMessage("Por favor, insira um valor de dívida válido.");
      return;
    }

    try {
      // Enviar a requisição PUT para atualizar a dívida do usuário
      const response = await axios.put(
        `http://localhost:3001/users/divida/${id}`,
        {
          nome,
          snome,
          telefone,
          endereco,
          divida: parseFloat(divida),
        }
      );

      setMessage("Dívida atualizada com sucesso!");
      console.log(response.data);
    } catch (error) {
      setMessage("Erro ao atualizar a dívida.");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Atualizar Dívida do Usuário</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>ID do Usuário: </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Nome: </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Sobrenome: </label>
          <input
            type="text"
            value={snome}
            onChange={(e) => setSnome(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Telefone: </label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Endereço: </label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Dívida (R$): </label>
          <input
            type="number"
            value={divida}
            onChange={(e) => setDivida(e.target.value)}
            required
          />
        </div>

        <button type="submit">Atualizar Dívida</button>
      </form>
    </div>
  );
}

export default Divida;
