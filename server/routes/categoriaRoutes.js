const express = require("express");
const categoriaController = require("../controllers/categoriaController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect); // Todas as rotas requerem autenticação

router.post("/", categoriaController.criarCategoria);
router.get("/", categoriaController.getCategorias);
router.get("/:categoriaId", categoriaController.getCategoria);
router.put("/:categoriaId", categoriaController.editarCategoria);
router.delete("/:categoriaId", categoriaController.deletarCategoria);

module.exports = router;
