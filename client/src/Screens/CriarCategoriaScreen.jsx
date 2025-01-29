import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CriarCategoriaScreen = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.post(
        "http://localhost:8000/api/categorias",
        { nome },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Categoria criada com sucesso!");
      setNome(""); // Limpar o campo após sucesso

      // Redirecionar para a lista de categorias após um tempo
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Ocorreu um erro ao criar a categoria.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <h2 className="text-center mb-4">Criar Nova Categoria</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nome" className="mb-3">
              <Form.Label>Nome da Categoria</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? "Criando..." : "Criar Categoria"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CriarCategoriaScreen;
