class ArmazemBaseService {
    constructor(model) {
      this.model = model;  
    }
  
    // Método para obter todos os armazéns
    async getAll() {
      return await this.model.find();
    }
  
    // Método para obter um armazém pelo ID
    async getById(id) {
      return await this.model.findById(id);
    }
  
    // Método para criar um novo armazém
    async create(dados) {
      return await this.model.create(dados);
    }
  
    // Método para atualizar um armazém
    async update(id, dados) {
      return await this.model.findByIdAndUpdate(id, dados, {
        new: true,
        runValidators: true,
      });
    }
  
    // Método para excluir um armazém
    async delete(id) {
      return await this.model.findByIdAndDelete(id);
    }
  }
  
module.exports = ArmazemBaseService;
  