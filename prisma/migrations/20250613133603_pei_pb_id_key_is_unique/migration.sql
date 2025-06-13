/*
  Warnings:

  - A unique constraint covering the columns `[pei_pb_id]` on the table `PeiCompany` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[PeiCompany] ADD CONSTRAINT [PeiCompany_pei_pb_id_key] UNIQUE NONCLUSTERED ([pei_pb_id]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
