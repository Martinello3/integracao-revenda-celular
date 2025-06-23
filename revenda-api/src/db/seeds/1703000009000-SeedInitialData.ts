import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedInitialData1703000009000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Seed Brands
    await queryRunner.query(`
      INSERT INTO brands (name, country) VALUES
      ('Samsung', 'Coreia do Sul'),
      ('Apple', 'Estados Unidos'),
      ('Xiaomi', 'China'),
      ('Motorola', 'Estados Unidos'),
      ('LG', 'Coreia do Sul');
    `);

    // Seed Stores
    await queryRunner.query(`
      INSERT INTO stores (name, address, city, state, phone, manager, "isHeadquarters", status) VALUES
      ('Loja Centro', 'Rua das Flores, 123', 'São Paulo', 'SP', '(11) 1234-5678', 'João Silva', true, 'active'),
      ('Loja Shopping', 'Av. Paulista, 456', 'São Paulo', 'SP', '(11) 2345-6789', 'Maria Santos', false, 'active'),
      ('Loja Norte', 'Rua do Norte, 789', 'Rio de Janeiro', 'RJ', '(21) 3456-7890', 'Pedro Costa', false, 'active');
    `);

    // Seed Phones
    await queryRunner.query(`
      INSERT INTO phones (model, image, "releaseDate", price, category, brand_id) VALUES
      ('Galaxy S23', 'https://example.com/galaxy-s23.jpg', '2023-02-01', 3999.99, 'Smartphone', 1),
      ('iPhone 15 Pro', 'https://example.com/iphone-15-pro.jpg', '2023-09-15', 7999.99, 'Smartphone', 2),
      ('Redmi Note 12', 'https://example.com/redmi-note-12.jpg', '2023-01-15', 1299.99, 'Smartphone', 3),
      ('Moto G73', 'https://example.com/moto-g73.jpg', '2023-03-10', 1599.99, 'Smartphone', 4),
      ('iPhone 14', 'https://example.com/iphone-14.jpg', '2022-09-16', 5999.99, 'Smartphone', 2);
    `);

    // Seed Accessories
    await queryRunner.query(`
      INSERT INTO accessories (name, description, price, category, image, stock) VALUES
      ('Capa Protetora Premium', 'Capa resistente a quedas com proteção militar', 89.99, 'Capa', 'https://example.com/capa-premium.jpg', 50),
      ('Carregador Rápido 65W', 'Carregador ultra rápido com cabo USB-C', 149.99, 'Carregador', 'https://example.com/carregador-65w.jpg', 30),
      ('Película de Vidro 3D', 'Proteção completa da tela com bordas curvadas', 39.99, 'Película', 'https://example.com/pelicula-3d.jpg', 100),
      ('Fone Bluetooth Premium', 'Fone sem fio com cancelamento de ruído', 299.99, 'Fone', 'https://example.com/fone-bluetooth.jpg', 25),
      ('Cabo USB-C 2m', 'Cabo reforçado para carregamento e dados', 29.99, 'Cabo', 'https://example.com/cabo-usbc.jpg', 80);
    `);

    // Seed Customers
    await queryRunner.query(`
      INSERT INTO customers (name, email, phone, "birthDate", address, "customerType", active) VALUES
      ('Ana Silva', 'ana.silva@email.com', '(11) 99999-1111', '1990-05-15', 'Rua A, 123', 'premium', true),
      ('Carlos Santos', 'carlos.santos@email.com', '(11) 99999-2222', '1985-08-20', 'Rua B, 456', 'regular', true),
      ('Fernanda Costa', 'fernanda.costa@email.com', '(21) 99999-3333', '1992-12-10', 'Rua C, 789', 'vip', true),
      ('Roberto Lima', 'roberto.lima@email.com', '(11) 99999-4444', '1988-03-25', 'Rua D, 321', 'regular', true);
    `);

    // Seed Accessory-Phone Compatibility
    await queryRunner.query(`
      INSERT INTO accessory_phone_compatibility (accessory_id, phone_id) VALUES
      (1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
      (2, 1), (2, 3), (2, 4),
      (3, 1), (3, 2), (3, 3), (3, 4), (3, 5),
      (4, 1), (4, 2), (4, 3), (4, 4), (4, 5),
      (5, 1), (5, 3), (5, 4);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM accessory_phone_compatibility');
    await queryRunner.query('DELETE FROM customers');
    await queryRunner.query('DELETE FROM accessories');
    await queryRunner.query('DELETE FROM phones');
    await queryRunner.query('DELETE FROM stores');
    await queryRunner.query('DELETE FROM brands');
  }
}
