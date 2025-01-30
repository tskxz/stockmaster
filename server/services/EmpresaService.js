const EmpresaBaseService = require('./EmpresaBaseService');
const EmpresaModel = require('../models/Empresa');

class EmpresaService extends EmpresaBaseService {
  constructor() {
    super(EmpresaModel); 
  }

  // Método para criar uma empresa com validação de palavra passe
  async createEmpresa(dados) {
    const { password, passwordConfirm } = dados;

    // Validação inicial no controlador (antes do Mongoose)
    if (!password || password.length < 8) {
      throw new Error("A palavra-passe deve ter pelo menos 8 caracteres.");
    }

    if (password !== passwordConfirm) {
      throw new Error("As palavras-passes não coincidem.");
    }

    // Criação na base de dados
    return await this.create(dados);  // Chama o método da classe base
  }

  // Método para buscar uma empresa pela ID e verificar se existe
  async getEmpresa(id) {
    const empresa = await this.getById(id);
    if (!empresa) {
      throw new Error("Empresa não encontrada");
    }
    return empresa;
  }

  // Método para editar a empresa com validações específicas
  async updateEmpresa(id, dados) {
    return await this.update(id, dados);
  }

  // Método para excluir a empresa
  async deleteEmpresa(id) {
    return await this.delete(id);
  }
}

module.exports = new EmpresaService();
