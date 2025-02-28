"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaBox, FaSave } from "react-icons/fa";
import "../styles/screens/adicionarproduto.css";

const AdicionarProdutoScreen = () => {
        const { armazemId } = useParams();
        const [formData, setFormData] = useState({
                nome: "",
                descricao: "",
                preco: "",
                stockTotal: "",
                stockMinimo: "",
                categoriaId: "",
        });
        const [categorias, setCategorias] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const navigate = useNavigate();

        useEffect(() => {
                const fetchCategorias = async () => {
                        try {
                                const token = localStorage.getItem("jwt");
                                const response = await axios.get(
                                        "http://localhost:8000/api/categorias",
                                        {
                                                headers: {
                                                        Authorization: `Bearer ${token}`,
                                                },
                                        },
                                );
                                setCategorias(response.data.data.categorias);
                        } catch (err) {
                                setError("Erro ao carregar categorias.");
                        }
                };
                fetchCategorias();
        }, []);

        const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData((prevState) => ({
                        ...prevState,
                        [name]: value,
                }));
        };

        const handleSubmit = async (e) => {
                e.preventDefault();
                if (!formData.nome || !formData.preco || !formData.stockTotal) {
                        setError("Nome, preço e stock total são obrigatórios");
                        return;
                }

                try {
                        setLoading(true);
                        setError(null);
                        const token = localStorage.getItem("jwt");
                        const response = await axios.post(
                                `http://localhost:8000/api/empresas/criar_produto`,
                                { ...formData, armazemId },
                                {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                        },
                                },
                        );

                        if (response.status === 201) {
                                navigate(`/produtos/${armazemId}`);
                        }
                } catch (err) {
                        setError(
                                err.response?.data?.message ||
                                        "Ocorreu um erro inesperado.",
                        );
                } finally {
                        setLoading(false);
                }
        };

        return (
                <div className="adicionar-produto-screen">
                        <div className="adicionar-produto-container">
                                <h2>
                                        <FaBox /> Adicionar Produto
                                </h2>
                                {error && (
                                        <div className="error-message">
                                                {error}
                                        </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                                <label htmlFor="nome">
                                                        Nome
                                                </label>
                                                <input
                                                        type="text"
                                                        id="nome"
                                                        name="nome"
                                                        value={formData.nome}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Digite o nome do produto"
                                                />
                                        </div>

                                        <div className="form-group">
                                                <label htmlFor="descricao">
                                                        Descrição
                                                </label>
                                                <textarea
                                                        id="descricao"
                                                        name="descricao"
                                                        value={
                                                                formData.descricao
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Digite a descrição do produto"
                                                />
                                        </div>

                                        <div className="form-row">
                                                <div className="form-group">
                                                        <label htmlFor="preco">
                                                                Preço
                                                        </label>
                                                        <input
                                                                type="number"
                                                                id="preco"
                                                                name="preco"
                                                                value={
                                                                        formData.preco
                                                                }
                                                                onChange={
                                                                        handleChange
                                                                }
                                                                required
                                                                placeholder="Digite o preço"
                                                        />
                                                </div>

                                                <div className="form-group">
                                                        <label htmlFor="stockTotal">
                                                                Stock Total
                                                        </label>
                                                        <input
                                                                type="number"
                                                                id="stockTotal"
                                                                name="stockTotal"
                                                                value={
                                                                        formData.stockTotal
                                                                }
                                                                onChange={
                                                                        handleChange
                                                                }
                                                                required
                                                                placeholder="Digite o Stock total"
                                                        />
                                                </div>
                                        </div>

                                        <div className="form-row">
                                                <div className="form-group">
                                                        <label htmlFor="stockMinimo">
                                                                Stock Mínimo
                                                        </label>
                                                        <input
                                                                type="number"
                                                                id="stockMinimo"
                                                                name="stockMinimo"
                                                                value={
                                                                        formData.stockMinimo
                                                                }
                                                                onChange={
                                                                        handleChange
                                                                }
                                                                placeholder="Digite o Stock mínimo"
                                                        />
                                                </div>

                                                <div className="form-group">
                                                        <label htmlFor="categoriaId">
                                                                Categoria
                                                        </label>
                                                        <select
                                                                id="categoriaId"
                                                                name="categoriaId"
                                                                value={
                                                                        formData.categoriaId
                                                                }
                                                                onChange={
                                                                        handleChange
                                                                }
                                                        >
                                                                <option value="">
                                                                        Selecione
                                                                        uma
                                                                        categoria
                                                                </option>
                                                                {categorias.map(
                                                                        (
                                                                                categoria,
                                                                        ) => (
                                                                                <option
                                                                                        key={
                                                                                                categoria._id
                                                                                        }
                                                                                        value={
                                                                                                categoria._id
                                                                                        }
                                                                                >
                                                                                        {
                                                                                                categoria.nome
                                                                                        }
                                                                                </option>
                                                                        ),
                                                                )}
                                                        </select>
                                                </div>
                                        </div>

                                        <button
                                                type="submit"
                                                className="submit-button"
                                                disabled={loading}
                                        >
                                                {loading ? (
                                                        "Adicionando..."
                                                ) : (
                                                        <>
                                                                <FaSave />{" "}
                                                                Adicionar
                                                                Produto
                                                        </>
                                                )}
                                        </button>
                                </form>
                        </div>
                </div>
        );
};

export default AdicionarProdutoScreen;
