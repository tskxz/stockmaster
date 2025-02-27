import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Table } from 'react-bootstrap';

const MovimentacoesScreen = () => {
  const [tipo, setTipo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [produtoId, setProdutoId] = useState('');
  const [armazemId, setArmazemId] = useState('');
  const [observacao, setObservacao] = useState('');
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [token] = useState(localStorage.getItem('jwt')); // Pega o token do localStorage
  
  // Função para enviar a movimentação
  const handleCreateMovimentacao = async (e) => {
    e.preventDefault();
    const body = {
      tipo,
      quantidade,
      produtoId,
      armazemId,
      observacao,
    };
    
    try {
      const response = await axios.post(
        'http://localhost:8000/api/empresas/movimentacao',
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMensagem('Movimentação criada com sucesso!');
      setTipo('');
      setQuantidade('');
      setProdutoId('');
      setArmazemId('');
      setObservacao('');
    } catch (error) {
      setMensagem('Erro ao criar movimentação');
    }
  };

  // Função para listar as movimentações
  const fetchMovimentacoes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/empresas/movimentacoes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovimentacoes(response.data.data.movimentacoes);
    } catch (error) {
      setMensagem('Erro ao carregar movimentações');
    }
  };

  useEffect(() => {
    fetchMovimentacoes(); // Carrega as movimentações na primeira vez
  }, []);

  return (
    <Container className="mt-4">
      <h2>Movimentações</h2>

      {mensagem && <Alert variant="info">{mensagem}</Alert>}

      {/* Formulário para criar movimentação */}
      <h3>Criar Movimentação</h3>
      <Form onSubmit={handleCreateMovimentacao}>
        <Form.Group controlId="tipo">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            as="select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="quantidade">
          <Form.Label>Quantidade</Form.Label>
          <Form.Control
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="produtoId">
          <Form.Label>ID do Produto</Form.Label>
          <Form.Control
            type="text"
            value={produtoId}
            onChange={(e) => setProdutoId(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="armazemId">
          <Form.Label>ID do Armazém</Form.Label>
          <Form.Control
            type="text"
            value={armazemId}
            onChange={(e) => setArmazemId(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="observacao">
          <Form.Label>Observação</Form.Label>
          <Form.Control
            type="text"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Criar Movimentação
        </Button>
      </Form>

      {/* Tabela de Movimentações */}
      <h3 className="mt-4">Movimentações Registadas</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Produto</th>
            <th>Armazém</th>
            <th>Data do Movimento</th>
            <th>Observação</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes.map((movimentacao) => (
            <tr key={movimentacao._id}>
              <td>{movimentacao.tipo}</td>
              <td>{movimentacao.quantidade}</td>
              <td>{movimentacao.produto.nome}</td>
              <td>{movimentacao.armazem.nome}</td>
              <td>{new Date(movimentacao.data_movimento).toLocaleString()}</td>
              <td>{movimentacao.observacao}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MovimentacoesScreen;
