USE master --placeholder until we get the DB names finalized
GO 

CREATE PROCEDURE dbo.getUser2 @username VARCHAR(255)
AS

SELECT uid, password, username, email FROM users WHERE username = @username