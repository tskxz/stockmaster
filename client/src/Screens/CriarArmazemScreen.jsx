import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/screens/criararmazemscreen.css";

const CriarArmazemScreen = () => {
        const [nome, setNome] = useState("");
        const [endereco, setEndereco] = useState("");
        const [capacidade, setCapacidade] = useState("");
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const navigate = useNavigate();

        const handleSubmit = async (e) => {
                e.preventDefault();

                // Verifica se todos os campos foram preenchidos
                if (!nome || !endereco || !capacidade) {
                        setError("Todos os campos são obrigatórios");
                        return;
                }

                try {
                        setLoading(true);
                        const token = localStorage.getItem("jwt");
                        const response = await axios.post(
                                "http://localhost:8000/api/empresas/criar_armazem",
                                { nome, endereco, capacidade }, // Envia os campos corretos
                                {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                        },
                                },
                        );
                        console.log(response);

                        if (response.status === 201) {
                                setLoading(false);
                                navigate("/meus_armazens"); // Redireciona para a lista de armazéns
                        }
                } catch (err) {
                        setLoading(false);
                        console.log(err);
                        setError("Erro ao criar o armazém. Tente novamente.");
                }
        };

        return (
                <Container
                        fluid
                        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: "100vh" }}
                >
                        <Row className="w-100">
                                <Col md={6} lg={4} className="mx-auto">
                                        <div className="criar-armazem-screen">
                                                <h2 className="text-center mb-4">
                                                        Criar Armazém
                                                </h2>
                                                {error && (
                                                        <Alert variant="danger">
                                                                {error}
                                                        </Alert>
                                                )}
                                                <Form onSubmit={handleSubmit}>
                                                        <Form.Group
                                                                controlId="nome"
                                                                className="mb-3"
                                                        >
                                                                <Form.Label>
                                                                        Nome
                                                                </Form.Label>
                                                                <Form.Control
                                                                        type="text"
                                                                        value={
                                                                                nome
                                                                        }
                                                                        onChange={(
                                                                                e,
                                                                        ) =>
                                                                                setNome(
                                                                                        e
                                                                                                .target
                                                                                                .value,
                                                                                )
                                                                        }
                                                                        required
                                                                        placeholder="Digite o nome do armazém"
                                                                />
                                                        </Form.Group>

                                                        <Form.Group
                                                                controlId="endereco"
                                                                className="mb-3"
                                                        >
                                                                <Form.Label>
                                                                        Endereço
                                                                </Form.Label>
                                                                <Form.Control
                                                                        type="text"
                                                                        value={
                                                                                endereco
                                                                        }
                                                                        onChange={(
                                                                                e,
                                                                        ) =>
                                                                                setEndereco(
                                                                                        e
                                                                                                .target
                                                                                                .value,
                                                                                )
                                                                        }
                                                                        required
                                                                        placeholder="Digite o endereço"
                                                                />
                                                        </Form.Group>

                                                        <Form.Group
                                                                controlId="capacidade"
                                                                className="mb-3"
                                                        >
                                                                <Form.Label>
                                                                        Capacidade
                                                                </Form.Label>
                                                                <Form.Control
                                                                        type="number"
                                                                        value={
                                                                                capacidade
                                                                        }
                                                                        onChange={(
                                                                                e,
                                                                        ) =>
                                                                                setCapacidade(
                                                                                        e
                                                                                                .target
                                                                                                .value,
                                                                                )
                                                                        }
                                                                        required
                                                                        placeholder="Digite a capacidade"
                                                                />
                                                        </Form.Group>

                                                        <Button
                                                                type="submit"
                                                                variant="primary"
                                                                className="w-100"
                                                                disabled={
                                                                        loading
                                                                }
                                                        >
                                                                {loading
                                                                        ? "Criando..."
                                                                        : "Criar Armazém"}
                                                        </Button>
                                                </Form>
                                        </div>
                                </Col>
                        </Row>
                </Container>
        );
};

export default CriarArmazemScreen;
