import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert('As senhas não coincidem!');
      return;
    }  try {
      // TODO: usar proxy
      const response = await fetch('http://localhost:8000/api/empresas/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          passwordConfirm,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('jwt', data.token);
        // Redireciona para /meus_armazens apos criar conta
        navigate('/meus_armazens');
      } else {
        // Exibe erro (caso o backend tenha retornado um erro)
        alert(data.message || 'Erro ao criar a conta. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao criar a conta:', error);
      alert('Erro ao se conectar com o servidor.');
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
