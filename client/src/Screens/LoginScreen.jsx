import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: fazer autenticação
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <div className="login-screen">
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Digite seu email"
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Digite sua senha"
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Entrar
              </Button>
            </Form>
            <p className="mt-3 text-center">
              Ainda não possui uma conta? <a href="/signup">Crie uma agora!</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
