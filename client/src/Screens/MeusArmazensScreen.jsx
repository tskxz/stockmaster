import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/screens/meusarmazens.css";
import {
        FaPlus,
        FaClipboardList,
        FaExchangeAlt,
        FaWarehouse,
} from "react-icons/fa";

const MeusArmazensScreen = () => {
        const [armazens, setArmazens] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const navigate = useNavigate();

        useEffect(() => {
                const fetchArmazens = async () => {
                        try {
                                const token = localStorage.getItem("jwt");
                                const response = await axios.get(
                                        "http://localhost:8000/api/empresas/meus_armazens",
                                        {
                                                headers: {
                                                        Authorization: `Bearer ${token}`,
                                                },
                                        },
                                );

                                setArmazens(response.data.data.armazens);
                                setLoading(false);
                        } catch (err) {
                                setError("Erro ao carregar os armazéns");
                                setLoading(false);
                        }
                };

                fetchArmazens();
        }, []);

        if (loading) {
                return <div className="loading">Carregando...</div>;
        }

        if (error) {
                return <div className="error">{error}</div>;
        }

        return (
                <div className="armazens-screen">
                        <div className="header">
                                <h1 className="title">Meus Armazéns</h1>
                                <div className="action-buttons">
                                        <button
                                                className="action-button"
                                                onClick={() =>
                                                        navigate(
                                                                "/criararmazem",
                                                        )
                                                }
                                        >
                                                <FaWarehouse className="button-icon" />
                                                <span className="button-text">
                                                        Adicionar Armazém
                                                </span>
                                        </button>
                                        <button
                                                className="action-button"
                                                onClick={() =>
                                                        navigate(
                                                                "/criar-categoria",
                                                        )
                                                }
                                        >
                                                <FaPlus className="button-icon" />
                                                <span className="button-text">
                                                        Criar Categoria
                                                </span>
                                        </button>
                                        <button
                                                className="action-button"
                                                onClick={() =>
                                                        navigate(
                                                                "/relatorio-inventario",
                                                        )
                                                }
                                        >
                                                <FaClipboardList className="button-icon" />
                                                <span className="button-text">
                                                        Ver Relatório
                                                </span>
                                        </button>
                                        <button
                                                className="action-button"
                                                onClick={() =>
                                                        navigate(
                                                                "/movimentacoes",
                                                        )
                                                }
                                        >
                                                <FaExchangeAlt className="button-icon" />
                                                <span className="button-text">
                                                        Ver Movimentos
                                                </span>
                                        </button>
                                </div>
                        </div>
                        {armazens.length === 0 ? (
                                <div className="empty-state">
                                        <p>
                                                Você não tem armazéns
                                                registados.
                                        </p>
                                        <button
                                                onClick={() =>
                                                        navigate(
                                                                "/criararmazem",
                                                        )
                                                }
                                        >
                                                Adicionar seu primeiro armazém
                                        </button>
                                </div>
                        ) : (
                                <div className="armazens-grid">
                                        {armazens.map((armazem) => (
                                                <div
                                                        key={armazem._id}
                                                        className="armazem-card"
                                                >
                                                        <h2>{armazem.nome}</h2>
                                                        <p>
                                                                <strong>
                                                                        Endereço:
                                                                </strong>{" "}
                                                                {
                                                                        armazem.endereco
                                                                }
                                                        </p>
                                                        <p>
                                                                <strong>
                                                                        Capacidade:
                                                                </strong>{" "}
                                                                {
                                                                        armazem.capacidade
                                                                }
                                                        </p>
                                                        <p className="armazem-id">
                                                                <strong>
                                                                        ID:
                                                                </strong>{" "}
                                                                {armazem._id}
                                                        </p>
                                                        <div className="card-actions">
                                                                <button
                                                                        onClick={() =>
                                                                                navigate(
                                                                                        `/editar_armazem/${armazem._id}`,
                                                                                )
                                                                        }
                                                                        className="edit-button"
                                                                >
                                                                        Editar
                                                                </button>
                                                                <Link
                                                                        to={`/produtos/${armazem._id}`}
                                                                        className="view-products"
                                                                >
                                                                        Ver
                                                                        Produtos
                                                                </Link>
                                                        </div>
                                                </div>
                                        ))}
                                </div>
                        )}
                </div>
        );
};

export default MeusArmazensScreen;
