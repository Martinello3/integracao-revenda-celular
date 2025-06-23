import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateAccessoryPhoneCompatibilityTable1703000004000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accessory_phone_compatibility',
        columns: [
          {
            name: 'accessory_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'phone_id',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'accessory_phone_compatibility',
      new TableForeignKey({
        columnNames: ['accessory_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'accessories',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'accessory_phone_compatibility',
      new TableForeignKey({
        columnNames: ['phone_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'phones',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accessory_phone_compatibility');
  }
}
