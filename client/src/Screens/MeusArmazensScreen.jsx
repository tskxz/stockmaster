import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MeusArmazensScreen = () => {
  const [armazens, setArmazens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArmazens = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get('/api/empresas/meus_armazens', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setArmazens(response.data.data.armazens);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os armazéns');
        setLoading(false);
      }
    };

    fetchArmazens();
  }, []);

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
          <h2>Meus Armazéns</h2>
          {armazens.length === 0 ? (
            <Alert variant="info">Você não tem armazéns cadastrados.</Alert>
          ) : (
            <ListGroup>
              {armazens.map((armazem) => (
                <ListGroup.Item key={armazem._id}>
                  <strong>{armazem.nome}</strong>
                  <p>{armazem.endereco}</p>
                  <p>Capacidade: {armazem.capacidade}</p>
                  {/* Link para a página de produtos do armazém */}
                  <Link to={`/produtos/${armazem._id}`} className="btn btn-link">
                    Ver Produtos
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {/* Botão para criar um novo armazém */}
          <Link to="/criararmazem">
            <Button variant="primary" className="mt-3">
              Criar Armazém
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default MeusArmazensScreen;
