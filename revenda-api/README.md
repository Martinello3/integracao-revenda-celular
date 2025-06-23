# 📱 Revenda API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  API REST para sistema de revenda de celulares e acessórios desenvolvida com NestJS, TypeORM e PostgreSQL.
</p>

## 📋 Descrição

Sistema completo para gerenciamento de revenda de celulares e acessórios, incluindo:

- **Gestão de Marcas e Produtos**: Cadastro de marcas, celulares e acessórios
- **Controle de Estoque**: Gerenciamento de estoque de acessórios
- **Gestão de Lojas**: Múltiplas lojas com diferentes status
- **Cadastro de Clientes**: Clientes com diferentes tipos (regular, premium, vip)
- **Sistema de Vendas**: Vendas completas com itens e diferentes formas de pagamento
- **Compatibilidade**: Sistema de compatibilidade entre acessórios e celulares

## 🏗️ Arquitetura

### Entidades Principais:
- **Brands** (Marcas)
- **Phones** (Celulares)
- **Accessories** (Acessórios)
- **Stores** (Lojas)
- **Customers** (Clientes)
- **Sales** (Vendas)
- **SaleItems** (Itens da Venda)

### Tecnologias:
- **NestJS** - Framework Node.js
- **TypeORM** - ORM para TypeScript
- **PostgreSQL** - Banco de dados
- **TypeScript** - Linguagem de programação

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **PostgreSQL** (versão 12 ou superior)
- **npm** ou **yarn**

### 1. Configuração do Banco de Dados

Certifique-se de que o PostgreSQL está rodando e crie o banco de dados:

```sql
CREATE DATABASE revenda;
```

### 2. Configuração das Variáveis de Ambiente

O arquivo `.env` já está configurado com as seguintes credenciais:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=050625gui
DB_DATABASE=revenda

# Application Configuration
PORT=3000
NODE_ENV=development
```

> **Nota**: Ajuste as credenciais conforme sua configuração local do PostgreSQL.

### 3. Instalação das Dependências

```bash
# Usando npm
$ npm install

# Usando yarn
$ yarn install
```

### 4. Executar as Migrations

As migrations criarão toda a estrutura do banco e inserirão dados iniciais:

```bash
# Executar migrations
$ npm run migration:run

# Ou usando yarn
$ yarn migration:run
```

### 5. Iniciar a Aplicação

```bash
# Modo desenvolvimento (com hot reload)
$ npm run start:dev

# Modo desenvolvimento usando yarn
$ yarn start:dev

# Modo produção
$ npm run start:prod
```

A aplicação estará disponível em: **http://localhost:3000**

## 📚 Endpoints da API

### Marcas (Brands)
- `GET /brands` - Listar todas as marcas
- `GET /brands/:id` - Buscar marca por ID
- `POST /brands` - Criar nova marca
- `PATCH /brands/:id` - Atualizar marca
- `DELETE /brands/:id` - Deletar marca

### Celulares (Phones)
- `GET /phones` - Listar todos os celulares
- `GET /phones/:id` - Buscar celular por ID
- `GET /phones/brand/:brandId` - Buscar celulares por marca
- `POST /phones` - Criar novo celular
- `PATCH /phones/:id` - Atualizar celular
- `DELETE /phones/:id` - Deletar celular

### Acessórios (Accessories)
- `GET /accessories` - Listar todos os acessórios
- `GET /accessories/:id` - Buscar acessório por ID
- `GET /accessories/category/:category` - Buscar por categoria
- `GET /accessories/stock/available` - Listar acessórios em estoque
- `POST /accessories` - Criar novo acessório
- `PATCH /accessories/:id` - Atualizar acessório
- `PATCH /accessories/:id/stock` - Atualizar estoque
- `DELETE /accessories/:id` - Deletar acessório

### Lojas (Stores)
- `GET /stores` - Listar todas as lojas
- `GET /stores/:id` - Buscar loja por ID
- `GET /stores/active/list` - Listar lojas ativas
- `POST /stores` - Criar nova loja
- `PATCH /stores/:id` - Atualizar loja
- `DELETE /stores/:id` - Deletar loja

### Clientes (Customers)
- `GET /customers` - Listar todos os clientes
- `GET /customers/:id` - Buscar cliente por ID
- `GET /customers/email/:email` - Buscar cliente por email
- `POST /customers` - Criar novo cliente
- `PATCH /customers/:id` - Atualizar cliente
- `DELETE /customers/:id` - Deletar cliente

### Vendas (Sales)
- `GET /sales` - Listar todas as vendas
- `GET /sales/:id` - Buscar venda por ID
- `GET /sales/customer/:customerId` - Vendas por cliente
- `GET /sales/store/:storeId` - Vendas por loja
- `POST /sales` - Criar nova venda
- `PATCH /sales/:id` - Atualizar venda
- `PATCH /sales/:id/status` - Atualizar status da venda
- `DELETE /sales/:id` - Deletar venda

## 📊 Dados Iniciais

Após executar as migrations, o banco será populado com dados de exemplo:

### Marcas:
- Samsung (Coreia do Sul)
- Apple (Estados Unidos)
- Xiaomi (China)
- Motorola (Estados Unidos)
- LG (Coreia do Sul)

### Celulares:
- Galaxy S23 (Samsung) - R$ 3.999,99
- iPhone 15 Pro (Apple) - R$ 7.999,99
- Redmi Note 12 (Xiaomi) - R$ 1.299,99
- Moto G73 (Motorola) - R$ 1.599,99
- iPhone 14 (Apple) - R$ 5.999,99

### Acessórios:
- Capa Protetora Premium - R$ 89,99
- Carregador Rápido 65W - R$ 149,99
- Película de Vidro 3D - R$ 39,99
- Fone Bluetooth Premium - R$ 299,99
- Cabo USB-C 2m - R$ 29,99

### Lojas:
- Loja Centro (Matriz - São Paulo)
- Loja Shopping (São Paulo)
- Loja Norte (Rio de Janeiro)

### Clientes:
- Ana Silva (Premium)
- Carlos Santos (Regular)
- Fernanda Costa (VIP)
- Roberto Lima (Regular)

## 🛠️ Comandos Úteis

### Migrations:
```bash
# Executar migrations
$ npm run migration:run

# Reverter última migration
$ npm run migration:revert

# Gerar nova migration
$ npm run migration:generate -- src/migrations/NomeDaMigration

# Criar migration vazia
$ npm run migration:create -- src/migrations/NomeDaMigration
```

### Desenvolvimento:
```bash
# Compilar o projeto
$ npm run build

# Executar em modo de desenvolvimento
$ npm run start:dev

# Executar em modo debug
$ npm run start:debug

# Verificar lint
$ npm run lint
```

### Testes:
```bash
# Testes unitários
$ npm run test

# Testes e2e
$ npm run test:e2e

# Cobertura de testes
$ npm run test:cov
```

## 🔧 Estrutura do Projeto

```
src/
├── config/           # Configurações (banco de dados, etc.)
├── db/               # Configurações de banco de dados
│   ├── migrations/   # Migrations do banco de dados
│   └── seeds/        # Seeds com dados iniciais
├── brand/            # Módulo de marcas
│   ├── dto/          # Data Transfer Objects
│   ├── brand.entity.ts
│   ├── brand.controller.ts
│   ├── brand.service.ts
│   └── brand.module.ts
├── phone/            # Módulo de celulares
│   ├── dto/
│   ├── phone.entity.ts
│   ├── phone.controller.ts
│   ├── phone.service.ts
│   └── phone.module.ts
├── accessory/        # Módulo de acessórios
│   ├── dto/
│   ├── accessory.entity.ts
│   ├── accessory.controller.ts
│   ├── accessory.service.ts
│   └── accessory.module.ts
├── store/            # Módulo de lojas
│   ├── dto/
│   ├── store.entity.ts
│   ├── store.controller.ts
│   ├── store.service.ts
│   └── store.module.ts
├── customer/         # Módulo de clientes
│   ├── dto/
│   ├── customer.entity.ts
│   ├── customer.controller.ts
│   ├── customer.service.ts
│   └── customer.module.ts
├── sale/             # Módulo de vendas
│   ├── dto/
│   ├── sale.entity.ts
│   ├── sale-item.entity.ts
│   ├── sale.controller.ts
│   ├── sale.service.ts
│   └── sale.module.ts
├── app.module.ts     # Módulo principal
└── main.ts          # Arquivo de entrada
```

## 📝 Exemplos de Uso

### Criar uma nova venda:
```json
POST /sales
{
  "customerId": 1,
  "storeId": 1,
  "paymentMethod": "pix",
  "seller": "João Vendedor",
  "items": [
    {
      "productId": 1,
      "productType": "phone",
      "quantity": 1,
      "unitPrice": 3999.99,
      "subtotal": 3999.99
    },
    {
      "productId": 1,
      "productType": "accessory",
      "quantity": 2,
      "unitPrice": 89.99,
      "subtotal": 179.98
    }
  ]
}
```

### Buscar celulares por marca:
```bash
GET /phones/brand/1
```

### Atualizar estoque de acessório:
```json
PATCH /accessories/1/stock
{
  "quantity": 10
}
```

## 🚀 Deploy

Para deploy em produção, certifique-se de:

1. Configurar as variáveis de ambiente de produção
2. Executar `npm run build`
3. Executar as migrations no banco de produção
4. Iniciar com `npm run start:prod`

## 📄 Licença

Este projeto está sob a licença MIT.
