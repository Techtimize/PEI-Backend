/*
  Warnings:

  - Made the column `portfolio_pb_id` on table `PortfolioCompany` required. This step will fail if there are existing NULL values in that column.
  - Made the column `portfolio_swift_client_number` on table `PortfolioCompany` required. This step will fail if there are existing NULL values in that column.
  - Made the column `portfolio_gmdm_id` on table `PortfolioCompany` required. This step will fail if there are existing NULL values in that column.
  - Made the column `portfolio_dgmf_id` on table `PortfolioCompany` required. This step will fail if there are existing NULL values in that column.
  - Made the column `portfolio_swift_client_name` on table `PortfolioCompany` required. This step will fail if there are existing NULL values in that column.
  - Made the column `portfolio_gmdm_legal_name` on table `PortfolioCompany` required. This step will fail if there are existing NULL values in that column.
  - Made the column `portfolio_pb_name` on table `PortfolioCompany` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Sources` on table `PortfolioCompany` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[PortfolioCompany] ALTER COLUMN [portfolio_pb_id] VARCHAR(20) NOT NULL;
ALTER TABLE [dbo].[PortfolioCompany] ALTER COLUMN [portfolio_swift_client_number] VARCHAR(20) NOT NULL;
ALTER TABLE [dbo].[PortfolioCompany] ALTER COLUMN [portfolio_gmdm_id] VARCHAR(10) NOT NULL;
ALTER TABLE [dbo].[PortfolioCompany] ALTER COLUMN [portfolio_dgmf_id] VARCHAR(10) NOT NULL;
ALTER TABLE [dbo].[PortfolioCompany] ALTER COLUMN [portfolio_swift_client_name] NVARCHAR(255) NOT NULL;
ALTER TABLE [dbo].[PortfolioCompany] ALTER COLUMN [portfolio_gmdm_legal_name] NVARCHAR(255) NOT NULL;
ALTER TABLE [dbo].[PortfolioCompany] ALTER COLUMN [portfolio_pb_name] VARCHAR(255) NOT NULL;
ALTER TABLE [dbo].[PortfolioCompany] ALTER COLUMN [Sources] VARCHAR(50) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
