"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaExchangeAlt, FaPlus, FaSearch } from "react-icons/fa";
import "../styles/screens/movimentacoes.css";

const MovimentacoesScreen = () => {
        const [formData, setFormData] = useState({
                tipo: "",
                quantidade: "",
                produtoId: "",
                armazemId: "",
                observacao: "",
        });
        const [movimentacoes, setMovimentacoes] = useState([]);
        const [mensagem, setMensagem] = useState("");
        const [loading, setLoading] = useState(false);
        const [token] = useState(localStorage.getItem("jwt"));

        const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData((prevState) => ({
                        ...prevState,
                        [name]: value,
                }));
        };

        const handleCreateMovimentacao = async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                        const response = await axios.post(
                                "http://localhost:8000/api/empresas/movimentacao",
                                formData,
                                {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                        },
                                },
                        );
                        setMensagem("Movimentação criada com sucesso!");
                        setFormData({
                                tipo: "",
                                quantidade: "",
                                produtoId: "",
                                armazemId: "",
                                observacao: "",
                        });
                        fetchMovimentacoes();
                } catch (error) {
                        setMensagem("Erro ao criar movimentação");
                } finally {
                        setLoading(false);
                }
        };

        const fetchMovimentacoes = async () => {
                try {
                        const response = await axios.get(
                                "http://localhost:8000/api/empresas/movimentacoes",
                                {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                        },
                                },
                        );
                        setMovimentacoes(response.data.data.movimentacoes);
                } catch (error) {
                        setMensagem("Erro ao carregar movimentações");
                }
        };

        useEffect(() => {
                fetchMovimentacoes();
        }, []);

        return (
                <div className="movimentacoes-screen">
                        <h2>
                                <FaExchangeAlt /> Movimentações
                        </h2>

                        {mensagem && <div className="mensagem">{mensagem}</div>}

                        <div className="movimentacoes-container">
                                <div className="form-section">
                                        <h3>
                                                <FaPlus /> Criar Movimentação
                                        </h3>
                                        <form
                                                onSubmit={
                                                        handleCreateMovimentacao
                                                }
                                        >
                                                <div className="form-group">
                                                        <label htmlFor="tipo">
                                                                Tipo
                                                        </label>
                                                        <select
                                                                id="tipo"
                                                                name="tipo"
                                                                value={
                                                                        formData.tipo
                                                                }
                                                                onChange={
                                                                        handleChange
                                                                }
                                                                required
                                                        >
                                                                <option value="">
                                                                        Selecione
                                                                </option>
                                                                <option value="entrada">
                                                                        Entrada
                                                                </option>
                                                                <option value="saida">
                                                                        Saída
                                                                </option>
                                                        </select>
                                                </div>

                                                <div className="form-group">
                                                        <label htmlFor="quantidade">
                                                                Quantidade
                                                        </label>
                                                        <input
                                                                type="number"
                                                                id="quantidade"
                                                                name="quantidade"
                                                                value={
                                                                        formData.quantidade
                                                                }
                                                                onChange={
                                                                        handleChange
                                                                }
                                                                required
                                                        />
                                                </div>

                                                <div className="form-group">
                                                        <label htmlFor="produtoId">
                                                                ID do Produto
                                                        </label>
                                                        <input
                                                                type="text"
                                                                id="produtoId"
                                                                name="produtoId"
                                                                value={
                                                                        formData.produtoId
                                                                }
                                                                onChange={
                                                                        handleChange
                                                                }
                                                                required
                                                        />
                                                </div>

                                                <div className="form-group">
                                                        <label htmlFor="armazemId">
                                                                ID do Armazém
                                                        </label>
                                                        <input
                                                                type="text"
                                                                id="armazemId"
                                                                name="armazemId"
                                                                value={
                                                                        formData.armazemId
                                                                }
                                                                onChange={
                                                                        handleChange
                                                                }
                                                                required
                                                        />
                                                </div>

                                                <div className="form-group">
                                                        <label htmlFor="observacao">
                                                                Observação
                                                        </label>
                                                        <textarea
                                                                id="observacao"
                                                                name="observacao"
                                                                value={
                                                                        formData.observacao
                                                                }
                                                                onChange={
                                                                        handleChange
                                                                }
                                                        />
                                                </div>

                                                <button
                                                        type="submit"
                                                        className="submit-button"
                                                        disabled={loading}
                                                >
                                                        {loading
                                                                ? "Criando..."
                                                                : "Criar Movimentação"}
                                                </button>
                                        </form>
                                </div>

                                <div className="table-section">
                                        <h3>
                                                <FaSearch /> Movimentações
                                                Registradas
                                        </h3>
                                        <div className="table-container">
                                                <table>
                                                        <thead>
                                                                <tr>
                                                                        <th>
                                                                                Tipo
                                                                        </th>
                                                                        <th>
                                                                                Quantidade
                                                                        </th>
                                                                        <th>
                                                                                Produto
                                                                        </th>
                                                                        <th>
                                                                                Armazém
                                                                        </th>
                                                                        <th>
                                                                                Data
                                                                                do
                                                                                Movimento
                                                                        </th>
                                                                        <th>
                                                                                Observação
                                                                        </th>
                                                                </tr>
                                                        </thead>
                                                        <tbody>
                                                                {movimentacoes.map(
                                                                        (
                                                                                movimentacao,
                                                                        ) => (
                                                                                <tr
                                                                                        key={
                                                                                                movimentacao._id
                                                                                        }
                                                                                >
                                                                                        <td>
                                                                                                {
                                                                                                        movimentacao.tipo
                                                                                                }
                                                                                        </td>
                                                                                        <td>
                                                                                                {
                                                                                                        movimentacao.quantidade
                                                                                                }
                                                                                        </td>
                                                                                        <td>
                                                                                                {
                                                                                                        movimentacao
                                                                                                                .produto
                                                                                                                .nome
                                                                                                }
                                                                                        </td>
                                                                                        <td>
                                                                                                {
                                                                                                        movimentacao
                                                                                                                .armazem
                                                                                                                .nome
                                                                                                }
                                                                                        </td>
                                                                                        <td>
                                                                                                {new Date(
                                                                                                        movimentacao.data_movimento,
                                                                                                ).toLocaleString()}
                                                                                        </td>
                                                                                        <td>
                                                                                                {
                                                                                                        movimentacao.observacao
                                                                                                }
                                                                                        </td>
                                                                                </tr>
                                                                        ),
                                                                )}
                                                        </tbody>
                                                </table>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default MovimentacoesScreen;
