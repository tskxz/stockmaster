import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert('As senhas não coincidem!');
    } else {
      // TODO: Lógica para criar conta (enviar para o backend, etc.)
      console.log('Conta criada com sucesso!');
      console.log('Nome:', name);
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <div className="signup-screen">
            <h2 className="text-center mb-4">Criar Conta</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Digite seu nome"
                />
              </Form.Group>
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
              <Form.Group controlId="passwordConfirm" className="mb-3">
                <Form.Label>Confirmar Senha</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  placeholder="Confirme sua senha"
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Criar Conta
              </Button>
            </Form>
            <p className="mt-3 text-center">
              Já possui uma conta? <a href="/login">Faça login agora!</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupScreen;
