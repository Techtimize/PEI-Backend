BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[PeiCompany] (
    [id] NVARCHAR(1000) NOT NULL,
    [pei_pb_id] VARCHAR(20) NOT NULL,
    [pei_swift_client_number] VARCHAR(20) NOT NULL,
    [pei_gmdm_id] VARCHAR(10) NOT NULL,
    [pei_dgmf_id] VARCHAR(10) NOT NULL,
    [pei_duns_number] VARCHAR(10) NOT NULL,
    [pei_swift_client_name] NVARCHAR(255) NOT NULL,
    [pei_gmdm_legal_name] NVARCHAR(255) NOT NULL,
    [view_type] VARCHAR(50) NOT NULL,
    [tableau_inclusion_status] VARCHAR(50) NOT NULL,
    [requested_by_team] VARCHAR(50) NOT NULL,
    [contact_email] VARCHAR(50) NOT NULL,
    [priority_for_feedback] BIT NOT NULL,
    [reporting_team] VARCHAR(50) NOT NULL,
    [fy_period_added] VARCHAR(20) NOT NULL,
    [date_added] DATETIME NOT NULL CONSTRAINT [PeiCompany_date_added_df] DEFAULT CURRENT_TIMESTAMP,
    [last_update_date] DATETIME NOT NULL CONSTRAINT [PeiCompany_last_update_date_df] DEFAULT CURRENT_TIMESTAMP,
    [last_updated_by] VARCHAR(50) NOT NULL,
    [pei_pb_name] VARCHAR(50) NOT NULL,
    [sources] VARCHAR(50) NOT NULL,
    [isDeleted] BIT NOT NULL CONSTRAINT [PeiCompany_isDeleted_df] DEFAULT 0,
    [date_deleted] DATETIME,
    CONSTRAINT [PeiCompany_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
