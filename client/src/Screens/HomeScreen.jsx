import React from "react";
import { Link } from "react-router-dom";
import "../styles/screens/homescreen.css";
import homeimg from "../assets/homeimg.png";

const HomeScreen = () => {
        return (
                <div className="app">
                        <div className="app-leftside">
                                <h1>StockMaster</h1>

                                <div className="app-description">
                                        <p>
                                                A solução completa e eficiente
                                                para a gestão de stock da sua
                                                empresa.
                                                <br />
                                                Otimize processos,reduza
                                                desperdícios e maximize os
                                                lucros com facilidade.
                                                <br />
                                                Comece agora e leve a gestão do
                                                seu negócio para um novo
                                                patamar!
                                        </p>
                                </div>
                                <ul>
                                        <li>
                                                {" "}
                                                <Link
                                                        className="button"
                                                        to={"/meus_armazens"}
                                                >
                                                        Veja os seus
                                                        armazéns{" "}
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
