# StockMaster

StockMaster é um sistema de gestão de armazéns que permite às empresas gerir os seus stocks de produtos de forma eficiente. A plataforma facilita o controlo de inventário, registo de movimentações e monitorização de produtos em tempo real.

## Tecnologias Utilizadas

Este projeto segue a arquitetura **cliente-servidor** e é desenvolvido utilizando a **MERN Stack**:
- **MongoDB** – Base de dados NoSQL para armazenamento dos produtos e movimentações.
- **Express.js** – Framework para a API backend.
- **React.js** – Interface do utilizador dinâmica e interativa.
- **Node.js** – Plataforma para execução do servidor backend.

## Funcionalidades

- Registo e autenticação de utilizadores.
- Gestão de produtos e categorias.
- Monitorização do stock em tempo real.
- Registo de entradas e saídas de produtos.
- Relatórios e análises sobre movimentações do armazém.

## Como Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone https://github.com/tskxz/StockMaster.git
cd StockMaster
```

### 2. Instalar Dependências
#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd frontend
npm install
```

### 3. Configurar Variáveis de Ambiente
Criar um ficheiro `.env` na pasta `backend` com as seguintes variáveis:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Iniciar o Servidor Backend
```bash
cd backend
npm start
```

### 5. Iniciar o Cliente Frontend
```bash
cd frontend
npm start
```

## Licença
Este projeto está licenciado sob a **MIT License**.

---
