const express = require("express");
var cors = require('cors')

const empresaRoutes = require("./routes/empresaRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors())

// Routes
app.use("/api/empresas", empresaRoutes);
app.use("/api/categorias", categoriaRoutes);

// Middleware para erros
app.use(errorMiddleware);

module.exports = app;
