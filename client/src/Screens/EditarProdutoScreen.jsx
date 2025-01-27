import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditarProdutoScreen = () => {
  const { produtoId } = useParams(); // Obter o ID do produto da URL
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [stockTotal, setStockTotal] = useState("");
  const [stockMinimo, setStockMinimo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(`http://localhost:8000/api/empresas/produto/${produtoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { produto } = response.data.data;
        setNome(produto.nome);
        setDescricao(produto.descricao);
        setPreco(produto.preco);
        setStockTotal(produto.stock_total);
        setStockMinimo(produto.stock_minimo);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar os dados do produto.");
        setLoading(false);
      }
    };

    fetchProduto();
  }, [produtoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwt");
    const response = await axios.put(
      `http://localhost:8000/api/empresas/editar_produto/${produtoId}`,
      { nome, descricao, preco, stock_total: stockTotal, stock_minimo: stockMinimo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { produto } = response.data.data;

    // Redirecionar para o ID do armazém associado ao produto
    navigate(`/produtos/${produto.armazem._id}`);
    } catch (err) {
      
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
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
          <h2 className="text-center mb-4">Editar Produto</h2>
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

            <Form.Group controlId="descricao" className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="preco" className="mb-3">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="stockTotal" className="mb-3">
              <Form.Label>Estoque Total</Form.Label>
              <Form.Control
                type="number"
                value={stockTotal}
                onChange={(e) => setStockTotal(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="stockMinimo" className="mb-3">
              <Form.Label>Estoque Mínimo</Form.Label>
              <Form.Control
                type="number"
                value={stockMinimo}
                onChange={(e) => setStockMinimo(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Atualizar Produto
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditarProdutoScreen;
