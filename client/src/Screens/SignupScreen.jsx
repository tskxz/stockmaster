"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/screens/signinscreen.css";

const SignupScreen = () => {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [passwordConfirm, setPasswordConfirm] = useState("");
        const navigate = useNavigate();

        const handleSubmit = async (e) => {
                e.preventDefault();

                if (password !== passwordConfirm) {
                        alert("As senhas não coincidem!");
                        return;
                }

                try {
                        const response = await fetch(
                                "http://localhost:8000/api/empresas/signup",
                                {
                                        method: "POST",
                                        headers: {
                                                "Content-Type":
                                                        "application/json",
                                        },
                                        body: JSON.stringify({
                                                name,
                                                email,
                                                password,
                                                passwordConfirm,
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
                                                "Erro ao criar a conta. Tente novamente.",
                                );
                        }
                } catch (error) {
                        console.error("Erro ao criar a conta:", error);
                        alert("Erro ao se conectar com o servidor.");
                }
        };

        return (
                <div className="signup-container">
                        <div className="signup-card">
                                <h1>Criar Conta</h1>
                                <form onSubmit={handleSubmit}>
                                        <div className="input-group">
                                                <label htmlFor="name">
                                                        Nome
                                                </label>
                                                <input
                                                        id="name"
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) =>
                                                                setName(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                        required
                                                        placeholder="Digite seu nome"
                                                />
                                        </div>
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
                                        <div className="input-group">
                                                <label htmlFor="passwordConfirm">
                                                        Confirmar Senha
                                                </label>
                                                <input
                                                        id="passwordConfirm"
                                                        type="password"
                                                        value={passwordConfirm}
                                                        onChange={(e) =>
                                                                setPasswordConfirm(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                        required
                                                        placeholder="Confirme sua senha"
                                                />
                                        </div>
                                        <button
                                                type="submit"
                                                className="signup-button"
                                        >
                                                Criar Conta
                                        </button>
                                </form>
                                <p className="login-link">
                                        Já possui uma conta?{" "}
                                        <a href="/login">Faça login agora!</a>
                                </p>
                        </div>
                </div>
        );
};

export default SignupScreen;
