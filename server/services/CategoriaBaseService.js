class CategoriaBaseService {
    constructor(model) {
      this.model = model;
    }
  
    // Método para obter todas as categorias
    async getAll() {
      return await this.model.find();
    }
  
    // Método para obter uma categoria por ID
    async getById(id) {
      return await this.model.findById(id);
    }
  
    // Método para criar uma nova categoria
    async create(data) {
      return await this.model.create(data);
    }
  
    // Método para atualizar uma categoria
    async update(id, data) {
      return await this.model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    }
  
    // Método para excluir uma categoria
    async delete(id) {
      return await this.model.findByIdAndDelete(id);
    }
  
    // Método para verificar se existe uma categoria com o mesmo nome
    async existsByName(name, empresaId) {
      return await this.model.findOne({ nome: name, empresa: empresaId });
    }
  }
  
  module.exports = CategoriaBaseService;
  