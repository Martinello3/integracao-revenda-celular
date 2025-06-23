# 🚀 Revenda API - Todas as Requisições Postman

## 📋 Base URL
```
http://localhost:3000
```

## 🎯 Índice de Endpoints

### 🏷️ 1. BRANDS (Marcas)
- **POST** `/brands` - Criar marca
- **GET** `/brands` - Listar todas
- **GET** `/brands/:id` - Buscar por ID
- **PATCH** `/brands/:id` - Atualizar
- **DELETE** `/brands/:id` - Deletar

### 📱 2. PHONES (Celulares)
- **POST** `/phones` - Criar celular
- **GET** `/phones` - Listar todos
- **GET** `/phones/:id` - Buscar por ID
- **GET** `/phones/brand/:brandId` - Buscar por marca
- **PATCH** `/phones/:id` - Atualizar
- **DELETE** `/phones/:id` - Deletar

### 🔌 3. ACCESSORIES (Acessórios)
- **POST** `/accessories` - Criar acessório
- **GET** `/accessories` - Listar todos
- **GET** `/accessories/:id` - Buscar por ID
- **GET** `/accessories/category/:category` - Buscar por categoria
- **GET** `/accessories/stock/available` - Listar em estoque
- **PATCH** `/accessories/:id` - Atualizar
- **PATCH** `/accessories/:id/stock` - Atualizar estoque
- **DELETE** `/accessories/:id` - Deletar

### 🏪 4. STORES (Lojas)
- **POST** `/stores` - Criar loja
- **GET** `/stores` - Listar todas
- **GET** `/stores/:id` - Buscar por ID
- **GET** `/stores/active/list` - Listar ativas
- **PATCH** `/stores/:id` - Atualizar
- **DELETE** `/stores/:id` - Deletar

### 👥 5. CUSTOMERS (Clientes)
- **POST** `/customers` - Criar cliente
- **GET** `/customers` - Listar todos
- **GET** `/customers/:id` - Buscar por ID
- **GET** `/customers/email/:email` - Buscar por email
- **PATCH** `/customers/:id` - Atualizar
- **DELETE** `/customers/:id` - Deletar

### 💰 6. SALES (Vendas)
- **POST** `/sales` - Criar venda
- **GET** `/sales` - Listar todas
- **GET** `/sales?status=:status` - Filtrar por status
- **GET** `/sales/:id` - Buscar por ID
- **GET** `/sales/customer/:customerId` - Vendas por cliente
- **GET** `/sales/store/:storeId` - Vendas por loja
- **PATCH** `/sales/:id` - Atualizar
- **PATCH** `/sales/:id/status` - Atualizar status
- **DELETE** `/sales/:id` - Deletar

---

## 🧪 Sequência de Testes Recomendada

### 1️⃣ Primeiro: Entidades Base (sem dependências)
1. **Brands** - Criar marcas
2. **Stores** - Criar lojas  
3. **Customers** - Criar clientes

### 2️⃣ Segundo: Entidades com Dependências
4. **Phones** - Criar celulares (precisa de brands)
5. **Accessories** - Criar acessórios

### 3️⃣ Terceiro: Entidades Complexas
6. **Sales** - Criar vendas (precisa de customers, stores, phones/accessories)

---

## 📊 Dados de Teste Rápido

### Criar Marca
```json
POST /brands
{
  "name": "OnePlus",
  "country": "China"
}
```

### Criar Loja
```json
POST /stores
{
  "name": "Loja Teste",
  "address": "Rua Teste, 123",
  "city": "São Paulo",
  "state": "SP",
  "phone": "(11) 1234-5678",
  "manager": "João Silva",
  "isHeadquarters": false,
  "status": "active"
}
```

### Criar Cliente
```json
POST /customers
{
  "name": "João Silva",
  "email": "joao.silva@email.com",
  "phone": "(11) 99999-1111",
  "birthDate": "1990-01-01",
  "address": "Rua A, 123",
  "customerType": "regular",
  "active": true
}
```

---

## 🚨 **Regras de Negócio Implementadas**

### **10 Regras com Exceptions Específicas:**

#### **Principais (3 entidades com 3 regras cada):**
1. **Customer CREATE**: Não permitir emails duplicados → `409 Conflict`
2. **Customer UPDATE**: Não permitir downgrade VIP→regular → `400 Bad Request`
3. **Customer DELETE**: Não permitir deletar clientes com vendas → `400 Bad Request`
4. **Phone CREATE**: Não permitir modelos duplicados na mesma marca → `409 Conflict`
5. **Phone UPDATE**: Não permitir redução de preço > 50% → `400 Bad Request`
6. **Phone DELETE**: Não permitir deletar phones em vendas → `400 Bad Request`
7. **Accessory CREATE**: Não permitir preço negativo → `400 Bad Request`
8. **Accessory READ**: Erro quando não há acessórios em estoque → `400 Bad Request`
9. **Accessory UPDATE**: Não reduzir estoque abaixo de 0 → `400 Bad Request`

#### **Adicional:**
10. **Brand CREATE**: Não permitir marcas duplicadas → `409 Conflict`

### **Novos Endpoints para Regras:**
- `GET /accessories/stock/only-available` - Erro se sem estoque
- `GET /stores/active/only` - Erro se sem lojas ativas

