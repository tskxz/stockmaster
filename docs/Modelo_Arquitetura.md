# StockMaster

## Arquitetura: Cliente-Servidor

| **Camada**          | **Descrição**                                                                 |
|----------------------|-------------------------------------------------------------------------------|
| **CLIENTE**          |                                                                               |
| - **ReactJS**        | Interface de utilizador                                                      |
| - **Screens**        | Componentes React usados:                                                    |
|   - AdicionarProdutoScreen.jsx                                                                      |
|   - CriarArmazemScreen.jsx                                                                          |
|   - EditarArmazemScreen.jsx                                                                         |
|   - EditarProdutoScreen.jsx                                                                         |
|   - HomeScreen.jsx                                                                                  |
|   - LoginScreen.jsx                                                                                 |
|   - MeusArmazensScreen.jsx                                                                          |
|   - ProdutosScreen.jsx                                                                              |
|   - SignupScreen.jsx                                                                                |
| - **Comunicação**    | Envio de requisições e respostas ao servidor via API (HTTP/REST).            |
|----------------------|-------------------------------------------------------------------------------|
| **SERVIDOR (Backend)**|                                                                             |
| - **Tecnologia**     | Node.js com ExpressJS: Servidor Web                                          |
| - **Estrutura de Pastas** |                                                                         |
|   - `app.js` e `server.js`                                                                          |
|   - **controllers**                                                                                 |
|       - armazemController.js                                                                        |
|       - authController.js                                                                           |
|       - empresaController.js                                                                        |
|       - produtoController.js                                                                        |
|   - **middlewares**  | Funções auxiliares                                                          |
|   - **models**       | Estrutura de dados MongoDB:                                                  |
|       - Armazem.js                                                                                  |
|       - Empresa.js                                                                                  |
|       - Produto.js                                                                                  |
|   - **routes**       | Definição de rotas HTTP:                                                     |
|       - empresaRoutes.js                                                                            |
| - **Base de Dados**  | Ligações com MongoDB via Mongoose.                                           |
|----------------------|-------------------------------------------------------------------------------|
| **BASE DE DADOS (MongoDB)** |                                                                       |
| - **Coleções**       | Estruturas de armazenamento:                                                 |
|   - Empresas         | Dados das empresas registadas                                               |
|   - Armazéns         | Informações dos armazéns                                                    |
|   - Produtos         | Dados dos produtos de cada armazém                                          |
