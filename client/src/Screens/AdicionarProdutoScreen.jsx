import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AdicionarProdutoScreen = () => {
  const { armazemId } = useParams(); // Obter o ID do armazém da URL
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [stockTotal, setStockTotal] = useState('');
  const [stockMinimo, setStockMinimo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !preco || !stockTotal) {
      setError('Nome, preço e estoque total são obrigatórios');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('jwt');
      const response = await axios.post(
        `/api/empresas/criar_produto`,
        { nome, descricao, preco, stock_total: stockTotal, stock_minimo: stockMinimo, armazemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setLoading(false);
        navigate(`/produtos/${armazemId}`); // Redireciona para a lista de produtos do armazém
      }
    } catch (err) {
      setLoading(false);
      setError('Erro ao adicionar o produto. Tente novamente.');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <div className="adicionar-produto-screen">
            <h2 className="text-center mb-4">Adicionar Produto</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="nome" className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  placeholder="Digite o nome do produto"
                />
              </Form.Group>

              <Form.Group controlId="descricao" className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Digite a descrição do produto"
                />
              </Form.Group>

              <Form.Group controlId="preco" className="mb-3">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="number"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  required
                  placeholder="Digite o preço"
                />
              </Form.Group>

              <Form.Group controlId="stockTotal" className="mb-3">
                <Form.Label>Estoque Total</Form.Label>
                <Form.Control
                  type="number"
                  value={stockTotal}
                  onChange={(e) => setStockTotal(e.target.value)}
                  required
                  placeholder="Digite o estoque total"
                />
              </Form.Group>

              <Form.Group controlId="stockMinimo" className="mb-3">
                <Form.Label>Estoque Mínimo</Form.Label>
                <Form.Control
                  type="number"
                  value={stockMinimo}
                  onChange={(e) => setStockMinimo(e.target.value)}
                  placeholder="Digite o estoque mínimo"
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                {loading ? 'Adicionando...' : 'Adicionar Produto'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdicionarProdutoScreen;
