import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { Link, useNavigate  } from 'react-router-dom';


const MeusArmazensScreen = () => {
  const [armazens, setArmazens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArmazens = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get('http://localhost:8000/api/empresas/meus_armazens', {
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
      <Row className="mb-4">
        <Col>
        <h2>Meus Armazéns</h2>
          <Button variant="primary" onClick={() => navigate("/criararmazem")}>
            Criar Armazém
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          
          {armazens.length === 0 ? (
            <Alert variant="info">Você não tem armazéns cadastrados.</Alert>
          ) : (
            <ListGroup>
              {armazens.map((armazem) => (
                <ListGroup.Item key={armazem._id}>
                  <strong>{armazem.nome}</strong>
                  <p>{armazem.endereco}</p>
                  <p>Capacidade: {armazem.capacidade}</p>
                  <Button
    variant="warning"
    onClick={() => navigate(`/editar_armazem/${armazem._id}`)}
    className="me-2"
  >
    Editar
  </Button>
                  {/* Link para a página de produtos do armazém */}
                  <Link to={`/produtos/${armazem._id}`} className="btn btn-link">
                    Ver Produtos
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          
        </Col>
      </Row>
    </Container>
  );
};

export default MeusArmazensScreen;
