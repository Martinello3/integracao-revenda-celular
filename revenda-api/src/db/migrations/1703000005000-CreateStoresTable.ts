import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStoresTable1703000005000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stores',
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
            name: 'address',
            type: 'varchar',
            length: '500',
          },
          {
            name: 'city',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'state',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'manager',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'isHeadquarters',
            type: 'boolean',
            default: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'inactive', 'underMaintenance'],
            default: "'active'",
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stores');
  }
}
