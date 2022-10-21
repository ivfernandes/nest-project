/*
  Warnings:

  - You are about to drop the column `role_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_role_id_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `role_id`,
    ADD COLUMN `role` ENUM('ADMIN', 'PROFESSOR', 'MONITOR', 'ALUNO') NOT NULL DEFAULT 'ALUNO';

-- DropTable
DROP TABLE `roles`;
