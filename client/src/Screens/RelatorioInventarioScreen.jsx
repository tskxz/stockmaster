import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Registrar os componentes necessários do Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const RelatorioInventarioScreen = () => {
  const [relatorio, setRelatorio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatorio = async () => {
      try {
        const token = localStorage.getItem("jwt");

        if (!token) {
          throw new Error("utilizador não autenticado. Faça login novamente.");
        }

        const { data } = await axios.get("http://localhost:8000/api/empresas/relatorio_inventario", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRelatorio(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Erro ao carregar relatório");
        setLoading(false);
      }
    };

    fetchRelatorio();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Carregando relatório...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Configuração dos gráficos
  const estoquePorArmazemLabels = relatorio.estoquePorArmazem.map((a) => a.nome);
  const estoquePorArmazemData = relatorio.estoquePorArmazem.map((a) => a.totalEstoque);
  const capacidadePorArmazemData = relatorio.estoquePorArmazem.map((a) => a.capacidade);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Relatório de Inventário</h2>

      <Row>
        <Col md={6}>
          <Alert variant="primary">
            <h4>Total de Produtos na Empresa</h4>
            <p>{relatorio.totalProdutosEmpresa}</p>
          </Alert>
        </Col>
        <Col md={6}>
          <Alert variant="success">
            <h4>Total de Estoque na Empresa</h4>
            <p>{relatorio.totalEstoqueEmpresa}</p>
          </Alert>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <h4>Distribuição do Estoque por Armazém</h4>
          <Bar
            data={{
              labels: estoquePorArmazemLabels,
              datasets: [
                {
                  label: "Estoque Atual",
                  data: estoquePorArmazemData,
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
                {
                  label: "Capacidade Total",
                  data: capacidadePorArmazemData,
                  backgroundColor: "rgba(255, 99, 132, 0.6)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
            }}
          />
        </Col>

        <Col md={6}>
          <h4>Distribuição do Estoque (%)</h4>
          <Doughnut
            data={{
              labels: estoquePorArmazemLabels,
              datasets: [
                {
                  label: "Porcentagem de Estoque",
                  data: estoquePorArmazemData,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                  ],
                  hoverOffset: 10,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: "right" } },
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default RelatorioInventarioScreen;
