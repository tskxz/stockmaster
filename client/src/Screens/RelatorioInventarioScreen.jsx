"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaChartBar, FaWarehouse, FaBoxes } from "react-icons/fa";
import { Bar, Doughnut } from "react-chartjs-2";
import {
        Chart,
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement,
} from "chart.js";
import "../styles/screens/relatorio.css";

Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement,
);

const RelatorioInventarioScreen = () => {
        const [relatorio, setRelatorio] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
                const fetchRelatorio = async () => {
                        try {
                                const token = localStorage.getItem("jwt");
                                if (!token) {
                                        throw new Error(
                                                "Usuário não autenticado. Faça login novamente.",
                                        );
                                }
                                const { data } = await axios.get(
                                        "http://localhost:8000/api/empresas/relatorio_inventario",
                                        {
                                                headers: {
                                                        Authorization: `Bearer ${token}`,
                                                },
                                        },
                                );
                                setRelatorio(data.data);
                                setLoading(false);
                        } catch (err) {
                                setError(
                                        err.response?.data?.message ||
                                                "Erro ao carregar relatório",
                                );
                                setLoading(false);
                        }
                };
                fetchRelatorio();
        }, []);

        if (!token) {
          throw new Error("utilizador não autenticado. Faça login novamente.");
        if (loading) {
                return <div className="loading">Carregando relatório...</div>;

        }

        if (error) {
                return <div className="error">{error}</div>;
        }

        const estoquePorArmazemLabels = relatorio.estoquePorArmazem.map(
                (a) => a.nome,
        );
        const estoquePorArmazemData = relatorio.estoquePorArmazem.map(
                (a) => a.totalEstoque,
        );
        const capacidadePorArmazemData = relatorio.estoquePorArmazem.map(
                (a) => a.capacidade,
        );

        return (
                <div className="relatorio-inventario-screen">
                        <h2>
                                <FaChartBar /> Relatório de Inventário
                        </h2>

                        <div className="summary-cards">
                                <div className="summary-card">
                                        <FaBoxes className="summary-icon" />
                                        <div className="summary-content">
                                                <h3>
                                                        Total de Produtos na
                                                        Empresa
                                                </h3>
                                                <p>
                                                        {
                                                                relatorio.totalProdutosEmpresa
                                                        }
                                                </p>
                                        </div>
                                </div>
                                <div className="summary-card">
                                        <FaWarehouse className="summary-icon" />
                                        <div className="summary-content">
                                                <h3>
                                                        Total de Estoque na
                                                        Empresa
                                                </h3>
                                                <p>
                                                        {
                                                                relatorio.totalEstoqueEmpresa
                                                        }
                                                </p>
                                        </div>
                                </div>
                        </div>

                        <div className="chart-container">
                                <div className="chart">
                                        <h3>
                                                Distribuição do Estoque por
                                                Armazém
                                        </h3>
                                        <Bar
                                                data={{
                                                        labels: estoquePorArmazemLabels,
                                                        datasets: [
                                                                {
                                                                        label: "Estoque Atual",
                                                                        data: estoquePorArmazemData,
                                                                        backgroundColor:
                                                                                "rgba(54, 162, 235, 0.6)",
                                                                        borderColor:
                                                                                "rgba(54, 162, 235, 1)",
                                                                        borderWidth: 1,
                                                                },
                                                                {
                                                                        label: "Capacidade Total",
                                                                        data: capacidadePorArmazemData,
                                                                        backgroundColor:
                                                                                "rgba(255, 99, 132, 0.6)",
                                                                        borderColor:
                                                                                "rgba(255, 99, 132, 1)",
                                                                        borderWidth: 1,
                                                                },
                                                        ],
                                                }}
                                                options={{
                                                        responsive: true,
                                                        plugins: {
                                                                legend: {
                                                                        position: "top",
                                                                },
                                                        },
                                                }}
                                        />
                                </div>

                                <div className="chart">
                                        <h3>Distribuição do Estoque (%)</h3>
                                        <Doughnut
                                                data={{
                                                        labels: estoquePorArmazemLabels,
                                                        datasets: [
                                                                {
                                                                        label: "Porcentagem de Estoque",
                                                                        data: estoquePorArmazemData,
                                                                        backgroundColor:
                                                                                [
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
                                                        plugins: {
                                                                legend: {
                                                                        position: "right",
                                                                },
                                                        },
                                                }}
                                        />
                                </div>
                        </div>
                </div>
        );
};

export default RelatorioInventarioScreen;
