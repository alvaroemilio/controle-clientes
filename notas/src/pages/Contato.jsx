import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Contato = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Fale Conosco</h1>

      <div className="mb-4">
        <p>
          <strong>Desenvolvedor:</strong> github.com/alvaroemilio
        </p>
        <p>
          <strong>Email:</strong>
        </p>
        <p>
          <strong>Telefone:</strong> (XX) XXXXX-XXXX
        </p>
        <p>
          <strong>Endereço:</strong>
        </p>
      </div>
    </div>
  );
};

export default Contato;
