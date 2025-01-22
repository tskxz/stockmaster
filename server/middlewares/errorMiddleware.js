const errorMiddleware = (err, req, res, next) => {
    console.error("Erro capturado:", err);
  
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({
        status: "fail",
        message: `Erro de validação: ${messages.join(", ")}`,
      });
    }
  
    res.status(500).json({
      status: "error",
      message: "Erro inesperado no servidor. Estamos investigando.",
    });
  };
  
  module.exports = errorMiddleware;
  