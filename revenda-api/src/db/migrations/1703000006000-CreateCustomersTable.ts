import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCustomersTable1703000006000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
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
            name: 'email',
            type: 'varchar',
            length: '200',
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'birthDate',
            type: 'date',
          },
          {
            name: 'address',
            type: 'varchar',
            length: '500',
          },
          {
            name: 'customerType',
            type: 'enum',
            enum: ['regular', 'premium', 'vip'],
            default: "'regular'",
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers');
  }
}
