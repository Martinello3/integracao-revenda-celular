import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateSalesTable1703000007000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sales',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'date',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'customer_id',
            type: 'int',
          },
          {
            name: 'store_id',
            type: 'int',
          },
          {
            name: 'totalValue',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'paymentMethod',
            type: 'enum',
            enum: ['pix', 'debit', 'credit'],
            default: "'pix'",
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'completed', 'canceled'],
            default: "'pending'",
          },
          {
            name: 'seller',
            type: 'varchar',
            length: '200',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'sales',
      new TableForeignKey({
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'sales',
      new TableForeignKey({
        columnNames: ['store_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stores',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sales');
  }
}
