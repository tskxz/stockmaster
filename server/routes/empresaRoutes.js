const express = require("express");
const multer = require("multer");
const Empresa = require("../models/Empresa");
const empresaController = require("../controllers/empresaController");
const authController = require("../controllers/authController");
const armazemController = require("../controllers/armazemController");
const produtoController = require("../controllers/produtoController");
const movimentacaoController = require("../controllers/movimentacaoController");
const relatorioController = require("../controllers/relatorioController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Pasta para as imagens
  },
  filename: (req, file, cb) => {
    cb(null, `empresa-${req.empresa._id}-${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });


router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/minha_empresa", authController.protect, empresaController.minha_empresa);

router.post(
  "/criar_armazem",
  authController.protect, // Garante que a empresa está autenticada
  armazemController.criarArmazem
);

router.get(
  "/meus_armazens",
  authController.protect,
  armazemController.getArmazensPorEmpresaAutenticada
);

router.post(
  "/criar_produto",
  authController.protect,
  produtoController.criarProduto
);

router.get(
  "/produtos/:armazemId",
  authController.protect,
  produtoController.getProdutosByArmazem
);

router.get(
  "/produto/:produtoId",
  authController.protect,
  produtoController.getProduto
);

router.get(
  "/armazem/:armazemId",
  authController.protect,
  armazemController.getArmazem
);

router.put(
  "/editar_produto/:produtoId",
  authController.protect,
  produtoController.editarProduto
)

// Rota para upload da imagem
router.put(
  "/atualizar_imagem",
  authController.protect,
  upload.single("imagem"),
  empresaController.atualizarImagemEmpresa
);

router.put('/editar_armazem/:armazemId', authController.protect, armazemController.editarArmazem);


router.post(
  "/movimentacao",
  authController.protect,
  movimentacaoController.criarMovimentacao
);

router.get(
  "/movimentacoes",
  authController.protect,
  movimentacaoController.getMovimentacoes
);

router.get(
  "/relatorio_inventario",
  authController.protect,
  relatorioController.getRelatorioInventario
);

router.use(authController.protect, authController.restrictTo("admin"));

router
  .route("/")
  .get(empresaController.getAllEmpresas)
  .post(empresaController.createEmpresa);
router
  .route("/:id")
  .get(empresaController.getEmpresa)
  .patch(empresaController.updateEmpresa)
  .delete(empresaController.deleteEmpresa);

module.exports = router;
