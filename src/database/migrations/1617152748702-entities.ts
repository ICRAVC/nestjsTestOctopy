import {MigrationInterface, QueryRunner} from "typeorm";

export class entities1617152748702 implements MigrationInterface {
    name = 'entities1617152748702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`userId` int NOT NULL AUTO_INCREMENT, `userName` varchar(25) NOT NULL, `userEmail` varchar(255) NOT NULL, `userPassword` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_da5934070b5f2726ebfd3122c8` (`userName`), PRIMARY KEY (`userId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `roles` (`roleId` int NOT NULL AUTO_INCREMENT, `roleName` varchar(20) NOT NULL, `roleDescription` text NOT NULL, `roleStatus` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`roleId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users_roles` (`userUserId` int NOT NULL, `rolesRoleId` int NOT NULL, INDEX `IDX_c0d99e820504d74dadf726beef` (`userUserId`), INDEX `IDX_950527e39663c7971b2981ebc9` (`rolesRoleId`), PRIMARY KEY (`userUserId`, `rolesRoleId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users_roles` ADD CONSTRAINT `FK_c0d99e820504d74dadf726beefe` FOREIGN KEY (`userUserId`) REFERENCES `user`(`userId`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users_roles` ADD CONSTRAINT `FK_950527e39663c7971b2981ebc9b` FOREIGN KEY (`rolesRoleId`) REFERENCES `roles`(`roleId`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users_roles` DROP FOREIGN KEY `FK_950527e39663c7971b2981ebc9b`");
        await queryRunner.query("ALTER TABLE `users_roles` DROP FOREIGN KEY `FK_c0d99e820504d74dadf726beefe`");
        await queryRunner.query("DROP INDEX `IDX_950527e39663c7971b2981ebc9` ON `users_roles`");
        await queryRunner.query("DROP INDEX `IDX_c0d99e820504d74dadf726beef` ON `users_roles`");
        await queryRunner.query("DROP TABLE `users_roles`");
        await queryRunner.query("DROP TABLE `roles`");
        await queryRunner.query("DROP INDEX `IDX_da5934070b5f2726ebfd3122c8` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
