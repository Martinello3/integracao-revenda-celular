import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePhonesTable1703000002000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'phones',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'model',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'image',
            type: 'varchar',
            length: '500',
          },
          {
            name: 'releaseDate',
            type: 'date',
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
            name: 'brand_id',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'phones',
      new TableForeignKey({
        columnNames: ['brand_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'brands',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('phones');
  }
}
