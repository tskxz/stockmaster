
# **API de Empresas, Armazéns e Produtos**

## **1. Autenticação**

### **POST /api/empresas/signup**
Cria uma nova empresa e retorna um token de autenticação.

#### **Requisição:**
```json
{
  "name": "Nome da Empresa",
  "email": "email@empresa.com",
  "password": "senha123",
  "passwordConfirm": "senha123",
  "role": "empresa"
}
```

#### **Resposta:**
```json
{
  "status": "success",
  "token": "JWT_TOKEN",
  "data": {
    "empresa": {
      "_id": "empresaId",
      "name": "Nome da Empresa",
      "email": "email@empresa.com"
    }
  }
}
```

### **POST /api/empresas/login**
Realiza o login da empresa e retorna um token de autenticação.

#### **Requisição:**
```json
{
  "email": "email@empresa.com",
  "password": "senha123"
}
```

#### **Resposta:**
```json
{
  "status": "success",
  "token": "JWT_TOKEN"
}
```

---

## **2. Empresas**

### **GET /api/empresas**
Obtém todas as empresas.

#### **Resposta:**
```json
{
  "status": "success",
  "results": 5,
  "data": {
    "empresas": [
      {
        "_id": "empresaId1",
        "name": "Empresa 1",
        "email": "email@empresa1.com"
      },
      {
        "_id": "empresaId2",
        "name": "Empresa 2",
        "email": "email@empresa2.com"
      }
    ]
  }
}
```

### **GET /api/empresas/:id**
Obtém os detalhes de uma empresa específica.

#### **Resposta:**
```json
{
  "status": "success",
  "data": {
    "empresa": {
      "_id": "empresaId",
      "name": "Nome da Empresa",
      "email": "email@empresa.com"
    }
  }
}
```

### **PATCH /api/empresas/:id**
Atualiza os dados de uma empresa específica.

#### **Requisição:**
```json
{
  "name": "Novo Nome da Empresa",
  "email": "novoemail@empresa.com"
}
```

#### **Resposta:**
```json
{
  "status": "success",
  "data": {
    "empresa": {
      "_id": "empresaId",
      "name": "Novo Nome da Empresa",
      "email": "novoemail@empresa.com"
    }
  }
}
```

### **DELETE /api/empresas/:id**
Deleta uma empresa específica.

#### **Resposta:**
```json
{
  "status": "success",
  "message": "Empresa deleted successfully"
}
```

---

## **3. Armazéns**

### **POST /api/armazens/criar_armazem**
Cria um novo armazém vinculado à empresa autenticada.

#### **Requisição:**
```json
{
  "nomeArmazem": "Nome do Armazém"
}
```

#### **Resposta:**
```json
{
  "status": "success",
  "data": {
    "armazem": {
      "_id": "armazemId",
      "nome": "Nome do Armazém",
      "empresa": "empresaId"
    }
  }
}
```

### **GET /api/armazens/meus_armazens**
Obtém todos os armazéns associados à empresa autenticada.

#### **Resposta:**
```json
{
  "status": "success",
  "results": 2,
  "data": {
    "armazens": [
      {
        "_id": "armazemId1",
        "nome": "Armazém 1",
        "empresa": "empresaId"
      },
      {
        "_id": "armazemId2",
        "nome": "Armazém 2",
        "empresa": "empresaId"
      }
    ]
  }
}
```

---

## **4. Produtos**

### **POST /api/produtos/criar_produto**
Cria um novo produto associado a um armazém da empresa autenticada.

#### **Requisição:**
```json
{
  "nome": "Produto 1",
  "descricao": "Descrição do Produto",
  "preco": 100.00,
  "stock_total": 50,
  "stock_minimo": 10,
  "armazemId": "armazemId"
}
```

#### **Resposta:**
```json
{
  "status": "success",
  "data": {
    "produto": {
      "_id": "produtoId",
      "nome": "Produto 1",
      "descricao": "Descrição do Produto",
      "preco": 100.00,
      "stock_total": 50,
      "stock_minimo": 10,
      "armazem": "armazemId",
      "empresa": "empresaId"
    }
  }
}
```

### **GET /api/produtos/:armazemId**
Obtém todos os produtos de um armazém específico da empresa autenticada.

#### **Resposta:**
```json
{
  "status": "success",
  "results": 3,
  "data": {
    "produtos": [
      {
        "_id": "produtoId1",
        "nome": "Produto 1",
        "descricao": "Descrição do Produto 1",
        "preco": 100.00
      },
      {
        "_id": "produtoId2",
        "nome": "Produto 2",
        "descricao": "Descrição do Produto 2",
        "preco": 200.00
      }
    ]
  }
}
```

### **GET /api/produtos/produto/:produtoId**
Obtém os detalhes de um produto específico.

#### **Resposta:**
```json
{
  "status": "success",
  "data": {
    "produto": {
      "_id": "produtoId",
      "nome": "Produto 1",
      "descricao": "Descrição do Produto",
      "preco": 100.00,
      "stock_total": 50,
      "stock_minimo": 10,
      "armazem": {
        "_id": "armazemId",
        "nome": "Armazém 1"
      },
      "empresa": {
        "_id": "empresaId",
        "name": "Nome da Empresa"
      }
    }
  }
}
```
