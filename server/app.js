const express = require("express");
var cors = require('cors')

const empresaRoutes = require("./routes/empresaRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors())

// Routes
app.use("/api/empresas", empresaRoutes);

module.exports = app;