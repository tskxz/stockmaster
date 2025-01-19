const express = require("express");
const Empresa = require("../models/Empresa");
const empresaController = require("../controllers/empresaController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

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