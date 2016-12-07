USE master --placeholder until DB names are finalized
GO

CREATE PROCEDURE dbo.getAllTourneys @email varchar(255)
AS

SELECT tid FROM Participant WHERE uid = (SELECT uid FROM users WHERE email = @email)
GO