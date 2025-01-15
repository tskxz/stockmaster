Entidade: Empresa
-----------------
id (PK)  
nome  
email  
palavra_passe  

Entidade: Armazém
-----------------
id (PK)  
nome  
empresa_id (FK → Empresa.id)  

Entidade: Produto
-----------------
id (PK)  
nome  
descricao  
preco  
stock_total  
stock_minimo  
armazem_id (FK → Armazém.id)  

Entidade: Movimentação
-----------------------
id (PK)  
tipo (entrada, saída)  
quantidade  
data_movimento  
observacao  
produto_id (FK → Produto.id)  
