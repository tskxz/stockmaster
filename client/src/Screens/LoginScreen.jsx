"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/screens/loginscreen.css";

const LoginScreen = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();

        useEffect(() => {
                const token = localStorage.getItem("jwt");
                if (token) {
                        navigate("/meus_armazens");
                }
        }, [navigate]);

        const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                        const response = await fetch(
                                "http://localhost:8000/api/empresas/login",
                                {
                                        method: "POST",
                                        headers: {
                                                "Content-Type":
                                                        "application/json",
                                        },
                                        body: JSON.stringify({
                                                email,
                                                password,
                                        }),
                                },
                        );

                        const data = await response.json();

                        if (response.ok) {
                                localStorage.setItem("jwt", data.token);
                                navigate("/meus_armazens");
                        } else {
                                alert(
                                        data.message ||
                                                "Erro ao entrar a conta. Tente novamente.",
                                );
                        }
                } catch (error) {
                        console.error("Erro ao entrar a conta:", error);
                        alert("Erro ao se conectar com o servidor.");
                }
        };

        if (localStorage.getItem("jwt")) {
                navigate("/meus_armazens");
                return null;
        }

        return (
                <div className="login-container">
                        <div className="login-card">
                                <h1>Login</h1>
                                <form onSubmit={handleSubmit}>
                                        <div className="input-group">
                                                <label htmlFor="email">
                                                        Email
                                                </label>
                                                <input
                                                        id="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) =>
                                                                setEmail(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                        required
                                                        placeholder="Digite seu email"
                                                />
                                        </div>
                                        <div className="input-group">
                                                <label htmlFor="password">
                                                        Senha
                                                </label>
                                                <input
                                                        id="password"
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) =>
                                                                setPassword(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                        required
                                                        placeholder="Digite sua senha"
                                                />
                                        </div>
                                        <button
                                                type="submit"
                                                className="login-button"
                                        >
                                                Entrar
                                        </button>
                                </form>
                                <p className="signup-link">
                                        Ainda não possui uma conta?{" "}
                                        <a href="/signup">Crie uma agora!</a>
                                </p>
                        </div>
                </div>
        );
};

export default LoginScreen;
