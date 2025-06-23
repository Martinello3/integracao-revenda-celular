import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateSaleItemsTable1703000008000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sale_items',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'sale_id',
            type: 'int',
          },
          {
            name: 'product_id',
            type: 'int',
          },
          {
            name: 'productType',
            type: 'enum',
            enum: ['phone', 'accessory'],
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'unitPrice',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'subtotal',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'sale_items',
      new TableForeignKey({
        columnNames: ['sale_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sales',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sale_items');
  }
}
