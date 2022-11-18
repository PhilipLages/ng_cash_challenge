/*
  Warnings:

  - The primary key for the `Accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Accounts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `debitedAccountId` on the `Transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `creditedAccountId` on the `Transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `accountId` on the `Users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_creditedAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_debitedAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_accountId_fkey";

-- AlterTable
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "debitedAccountId",
ADD COLUMN     "debitedAccountId" INTEGER NOT NULL,
DROP COLUMN "creditedAccountId",
ADD COLUMN     "creditedAccountId" INTEGER NOT NULL,
ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "accountId",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_accountId_key" ON "Users"("accountId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_creditedAccountId_fkey" FOREIGN KEY ("creditedAccountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_debitedAccountId_fkey" FOREIGN KEY ("debitedAccountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
