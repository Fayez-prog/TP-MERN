-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nomcategorie` VARCHAR(255) NOT NULL,
    `imagecategorie` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Articles` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `designation` VARCHAR(255) NOT NULL,
    `reference` VARCHAR(255) NOT NULL,
    `marque` VARCHAR(255) NOT NULL,
    `qtestock` INTEGER NOT NULL,
    `prix` DOUBLE NOT NULL,
    `imageart` VARCHAR(255) NOT NULL,
    `scategorieID` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Scategories` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nomscategorie` VARCHAR(255) NOT NULL,
    `imagescategorie` VARCHAR(191) NOT NULL,
    `categorieID` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Users_username_key`(`username`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Articles` ADD CONSTRAINT `Articles_scategorieID_fkey` FOREIGN KEY (`scategorieID`) REFERENCES `Scategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scategories` ADD CONSTRAINT `Scategories_categorieID_fkey` FOREIGN KEY (`categorieID`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
