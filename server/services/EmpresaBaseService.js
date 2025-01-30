class EmpresaBaseService {
    constructor(model) {
      this.model = model; 
    }
  
    // Método para obter todos os documentos
    async getAll() {
      return await this.model.find();
    }
  
    // Método para obter um único documento por ID
    async getById(id) {
      return await this.model.findById(id);
    }
  
    // Método para criar um novo documento
    async create(dados) {
      return await this.model.create(dados);
    }
  
    // Método para atualizar um documento
    async update(id, dados) {
      return await this.model.findByIdAndUpdate(id, dados, {
        new: true,
        runValidators: true,
      });
    }
  
    // Método para apagar um documento
    async delete(id) {
      return await this.model.findByIdAndDelete(id);
    }
  }
  
  module.exports = EmpresaBaseService;
  