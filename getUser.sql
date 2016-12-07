USE master --placeholder until we get the DB names finalized
GO 

CREATE PROCEDURE dbo.getUser @email VARCHAR(255)
AS

SELECT uid, password, username FROM users WHERE email = @email