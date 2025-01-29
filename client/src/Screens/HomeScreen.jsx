import React from "react";
import { Link } from "react-router-dom";
import "../styles/screens/homescreen.css";
import homeimg from "../assets/homimage.png";

const HomeScreen = () => {
        return (
                <div className="app">
                        <div className="app-leftside">
                                <h1>StockMaster</h1>

                                <div className="app-description">
                                        <p>
                                                A sua solução para gestão de
                                                stock empresarial.<br></br>
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
