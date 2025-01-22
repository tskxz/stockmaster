import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const EditarArmazemScreen = () => {
  const { armazemId } = useParams(); // Obter o ID do armazém da URL
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArmazem = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(`http://localhost:8000/api/empresas/armazem/${armazemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { armazem } = response.data.data;
        setNome(armazem.nome);
        setEndereco(armazem.endereco);
        setCapacidade(armazem.capacidade);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar os dados do armazém.");
        setLoading(false);
      }
    };

    fetchArmazem();
  }, [armazemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwt");
      await axios.put(
        `http://localhost:8000/api/empresas/editar_armazem/${armazemId}`,
        { nome, endereco, capacidade },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/meus_armazens"); // Redireciona para a lista de armazéns
    } catch (err) {
      setError("Erro ao atualizar o armazém. Tente novamente.");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <h2 className="text-center mb-4">Editar Armazém</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nome" className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="endereco" className="mb-3">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="capacidade" className="mb-3">
              <Form.Label>Capacidade</Form.Label>
              <Form.Control
                type="number"
                value={capacidade}
                onChange={(e) => setCapacidade(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Atualizar Armazém
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditarArmazemScreen;
