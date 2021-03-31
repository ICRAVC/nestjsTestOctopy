import {MigrationInterface, QueryRunner} from "typeorm";

export class entitiesFix1617155477828 implements MigrationInterface {
    name = 'entitiesFix1617155477828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `status` varchar(8) NOT NULL DEFAULT 'ACTIVE'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `status`");
    }

}
