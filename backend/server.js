const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Listar usuários
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Listar usuários divida > 0
app.get("/users/consulta", (req, res) => {
  db.query("SELECT * FROM users where divida > 0", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Adicionar usuário
app.post("/users", (req, res) => {
  const { nome, snome, telefone, endereco, divida, itens_divida } = req.body;
  const query =
    "INSERT INTO users (nome, snome, telefone, endereco, divida, itens_divida) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [nome, snome, telefone, endereco, divida, itens_divida],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json({
          id: results.insertId,
          nome,
          snome,
          telefone,
          endereco,
          divida,
          itens_divida,
        });
      }
    }
  );
});

// Atualizar usuário
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { nome, snome, telefone, endereco, divida, itens_divida } = req.body;
  const query =
    "UPDATE users SET nome = ?, snome = ?, telefone = ?, endereco = ?, divida = ?, itens_divida = ? WHERE id = ?";
  db.query(
    query,
    [nome, snome, telefone, endereco, divida, itens_divida, id],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ id, nome, snome, telefone, endereco, divida, itens_divida });
      }
    }
  );
});

app.put("/users/divida/:id", (req, res) => {
  const { id } = req.params;
  const { nome, snome, telefone, endereco, divida, nova_divida, itens_divida } =
    req.body;
  const novaDivida = parseFloat(nova_divida) || 0;
  const query =
    "UPDATE users SET nome = ?, snome = ?, telefone = ?, endereco = ?, divida = divida + ?, itens_divida = ? WHERE id = ?";
  db.query(
    query,
    [nome, snome, telefone, endereco, novaDivida, itens_divida, id],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({
          id,
          nome,
          snome,
          telefone,
          endereco,
          divida,
          nova_divida: novaDivida,
          itens_divida,
        });
      }
    }
  );
});

// Deletar usuário
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send("Deletado!");
    }
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`App escutando na porta ${port}`);
  console.log(`Servidor rodando em http://localhost:${port}`);
});
