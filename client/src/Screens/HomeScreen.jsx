import React from "react";
import { Link } from "react-router-dom";
import "../styles/screens/homescreen.css";
import homeimg from "../assets/homeimg.png";

const HomeScreen = () => {
        return (
                <div className="app">
                        <div className="app-leftside">
                                <h1>Stock</h1>
                                <h1>Master</h1>

                                <div className="app-description">
                                        <p>
                                                A sua solução para gestão de
                                                stock empresarial.
                                        </p>

                                        <p>
                                                📦 Controle Total do Stock
                                                Organize, monitore e otimize os
                                                níveis de stock da sua empresa
                                                com facilidade.
                                        </p>
                                        <p>
                                                📊 Relatórios e Insights Tome
                                                decisões estratégicas com base
                                                em dados precisos e relatórios
                                                detalhados.
                                        </p>
                                        <p>
                                                ⚙️ Eficiência e Agilidade Reduza
                                                erros e melhore a produtividade
                                                com ferramentas intuitivas e
                                                automatizadas.
                                        </p>
                                        <p>
                                                Comece agora e leve a gestão da
                                                sua empresa para o próximo
                                                nível!
                                        </p>
                                </div>
                                <ul>
                                        <li>
                                                {" "}
                                                <Link
                                                        className="button"
                                                        to={"/meus_armazens"}
                                                >
                                                        Veja os seus armazéns{" "}
                                                </Link>
                                        </li>
                                </ul>
                        </div>

                        <div className="app-rightside">
                                <img src={homeimg} alt="homeimg"></img>
                        </div>
                </div>
        );
};

export default HomeScreen;
