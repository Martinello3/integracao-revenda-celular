import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStockToPhones1750743323666 implements MigrationInterface {
    name = 'AddStockToPhones1750743323666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phones" DROP CONSTRAINT "FK_69f500afc2ac9746ea86a027286"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_c51005b2b06cec7aa17462c54f5"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_6c1fae113ae666969a94d79d637"`);
        await queryRunner.query(`ALTER TABLE "sale_items" DROP CONSTRAINT "FK_c210a330b80232c29c2ad68462a"`);
        await queryRunner.query(`ALTER TABLE "accessory_phone_compatibility" DROP CONSTRAINT "FK_c22fb28adffe8d488faa23cc192"`);
        await queryRunner.query(`ALTER TABLE "phones" ADD "stock" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "date" SET DEFAULT now()`);
        await queryRunner.query(`CREATE INDEX "IDX_092cbd2cb8d5c586874a99aed4" ON "accessory_phone_compatibility" ("accessory_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c22fb28adffe8d488faa23cc19" ON "accessory_phone_compatibility" ("phone_id") `);
        await queryRunner.query(`ALTER TABLE "phones" ADD CONSTRAINT "FK_69f500afc2ac9746ea86a027286" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_c51005b2b06cec7aa17462c54f5" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_6c1fae113ae666969a94d79d637" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_items" ADD CONSTRAINT "FK_c210a330b80232c29c2ad68462a" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accessory_phone_compatibility" ADD CONSTRAINT "FK_c22fb28adffe8d488faa23cc192" FOREIGN KEY ("phone_id") REFERENCES "phones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accessory_phone_compatibility" DROP CONSTRAINT "FK_c22fb28adffe8d488faa23cc192"`);
        await queryRunner.query(`ALTER TABLE "sale_items" DROP CONSTRAINT "FK_c210a330b80232c29c2ad68462a"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_6c1fae113ae666969a94d79d637"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_c51005b2b06cec7aa17462c54f5"`);
        await queryRunner.query(`ALTER TABLE "phones" DROP CONSTRAINT "FK_69f500afc2ac9746ea86a027286"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c22fb28adffe8d488faa23cc19"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_092cbd2cb8d5c586874a99aed4"`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "phones" DROP COLUMN "stock"`);
        await queryRunner.query(`ALTER TABLE "accessory_phone_compatibility" ADD CONSTRAINT "FK_c22fb28adffe8d488faa23cc192" FOREIGN KEY ("phone_id") REFERENCES "phones"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sale_items" ADD CONSTRAINT "FK_c210a330b80232c29c2ad68462a" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_6c1fae113ae666969a94d79d637" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_c51005b2b06cec7aa17462c54f5" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "phones" ADD CONSTRAINT "FK_69f500afc2ac9746ea86a027286" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
