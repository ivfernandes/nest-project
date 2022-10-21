/*
  Warnings:

  - The primary key for the `courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `course_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_course_id_fkey`;

-- DropIndex
DROP INDEX `courses_code_key` ON `courses`;

-- AlterTable
ALTER TABLE `courses` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`code`);

-- AlterTable
ALTER TABLE `users` DROP COLUMN `course_id`,
    ADD COLUMN `course_code` VARCHAR(191) NOT NULL DEFAULT 'IE17';

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_course_code_fkey` FOREIGN KEY (`course_code`) REFERENCES `courses`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
