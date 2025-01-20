import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const ProdutosScreen = () => {
  const { armazemId } = useParams(); // Obter o ID do armazém da URL
  const [produtos, setProdutos] = useState([]);
  const [armazemNome, setArmazemNome] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`http://localhost:8000/api/empresas/produtos/${armazemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const armazemResponse = await axios.get(`http://localhost:8000/api/empresas/armazem/${armazemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProdutos(response.data.data.produtos);
        setArmazemNome(armazemResponse.data.data.armazem.nome);
        setLoading(false);

        
      } catch (err) {
        setError('Erro ao carregar os produtos');
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [armazemId]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
        <h2>Produtos do Armazém "{armazemNome}"</h2>
          <Button variant="primary" onClick={() => navigate(`/adicionar_produto/${armazemId}`)}>
            Adicionar Produto
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {produtos.length === 0 ? (
            <Alert variant="info">Não há produtos cadastrados neste armazém.</Alert>
          ) : (
            <ListGroup>
              {produtos.map((produto) => (
                <ListGroup.Item key={produto._id}>
                  <strong>{produto.nome}</strong>
                  <p>{produto.descricao}</p>
                  <p>Preço: {produto.preco}€</p>
                  <p>Estoque: {produto.stock_total}</p>
                  <Button
    variant="warning"
    onClick={() => navigate(`/editar_produto/${produto._id}`)}
  >
    Editar
  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProdutosScreen;
