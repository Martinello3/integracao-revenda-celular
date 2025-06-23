import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAccessoriesTable1703000003000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accessories',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'category',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'image',
            type: 'varchar',
            length: '500',
          },
          {
            name: 'stock',
            type: 'int',
            default: 0,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accessories');
  }
}
