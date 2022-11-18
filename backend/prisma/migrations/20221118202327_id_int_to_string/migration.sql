/*
  Warnings:

  - The primary key for the `Accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_creditedAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_debitedAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_accountId_fkey";

-- AlterTable
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Accounts_id_seq";

-- AlterTable
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "debitedAccountId" SET DATA TYPE TEXT,
ALTER COLUMN "creditedAccountId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transactions_id_seq";

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "accountId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Users_id_seq";

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_creditedAccountId_fkey" FOREIGN KEY ("creditedAccountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_debitedAccountId_fkey" FOREIGN KEY ("debitedAccountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
