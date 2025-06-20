BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[PortfolioCompany] (
    [portfolio_duns_number] VARCHAR(10) NOT NULL,
    [portfolio_pb_id] VARCHAR(20),
    [portfolio_swift_client_number] VARCHAR(20),
    [portfolio_gmdm_id] VARCHAR(10),
    [portfolio_dgmf_id] VARCHAR(10),
    [portfolio_swift_client_name] NVARCHAR(255),
    [portfolio_gmdm_legal_name] NVARCHAR(255),
    [date_added] DATETIME NOT NULL CONSTRAINT [PortfolioCompany_date_added_df] DEFAULT CURRENT_TIMESTAMP,
    [last_update_date] DATETIME NOT NULL CONSTRAINT [PortfolioCompany_last_update_date_df] DEFAULT CURRENT_TIMESTAMP,
    [last_updated_by] VARCHAR(50) NOT NULL,
    [portfolio_pb_name] VARCHAR(255),
    [Sources] VARCHAR(50),
    CONSTRAINT [PortfolioCompany_pkey] PRIMARY KEY CLUSTERED ([portfolio_duns_number])
);

-- AddForeignKey
ALTER TABLE [dbo].[PortfolioCompany] ADD CONSTRAINT [PortfolioCompany_last_updated_by_fkey] FOREIGN KEY ([last_updated_by]) REFERENCES [dbo].[User]([microsoftId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
