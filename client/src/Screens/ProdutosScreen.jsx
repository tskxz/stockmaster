import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Container, Row, Col, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ProdutosScreen = () => {
  const { armazemId } = useParams(); // Obter o ID do armazém da URL
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`/api/empresas/produtos/${armazemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProdutos(response.data.data.produtos);
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
      <Row>
        <Col>
          <h2>Produtos do Armazém</h2>
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
