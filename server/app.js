const express = require("express");
const empresaRoutes = require("./routes/empresaRoutes");

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/empresas", empresaRoutes);

module.exports = app;