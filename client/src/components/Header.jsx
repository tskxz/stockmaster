import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/stockmaster.png";
import "../styles/components/Header.css";

const Header = () => {
        const navigate = useNavigate();

        // Verifica se o usuário está autenticado (token JWT presente no localStorage)
        const token = localStorage.getItem("jwt");

        // Função de logout
        const handleLogout = () => {
                localStorage.removeItem("jwt"); // Remove o token
                navigate("/login"); // Redireciona para a página de login
        };

        return (
                <header>
                        <Navbar className="navbar" expand="lg" collapseOnSelect>
                                <Container>
                                        <Navbar.Brand href="/">
                                                <img
                                                        src={logo}
                                                        alt="StockMaster"
                                                        width="105"
                                                />
                                        </Navbar.Brand>
                                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                        <Navbar.Collapse id="basic-navbar-nav">
                                                <Nav className="ms-auto">
                                                        {/* Se o usuário não estiver autenticado, exibe o link de Login */}
                                                        {!token ? (
                                                                <Nav.Link href="/login">
                                                                        <FaUser
                                                                                style={{
                                                                                        color: "#1a6dd9",
                                                                                        height: "25px",
                                                                                        width: "25px",
                                                                                }}
                                                                        />{" "}
                                                                </Nav.Link>
                                                        ) : (
                                                                // Se o usuário estiver autenticado, exibe o link de Logout
                                                                <Nav.Link
                                                                        onClick={
                                                                                handleLogout
                                                                        }
                                                                >
                                                                        <FaUser />{" "}
                                                                        Logout
                                                                </Nav.Link>
                                                        )}
                                                </Nav>
                                        </Navbar.Collapse>
                                </Container>
                        </Navbar>
                </header>
        );
};

export default Header;
