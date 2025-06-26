/*
  Warnings:

  - You are about to drop the column `Sources` on the `PortfolioCompany` table. All the data in the column will be lost.
  - Added the required column `sources` to the `PortfolioCompany` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[PortfolioCompany] DROP COLUMN [Sources];
ALTER TABLE [dbo].[PortfolioCompany] ADD [sources] VARCHAR(50) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
