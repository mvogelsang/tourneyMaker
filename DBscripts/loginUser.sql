USE master --placeholder until we get the DB names finalized.
GO

CREATE PROCEDURE dbo.loginUser @username varchar(255), @password varchar(255)
AS

IF((SELECT PASSWORD FROM Users WHERE USERNAME = @username) = @password)
		SELECT 1 AS authorized, PASSWORD, EMAIL, UID as uid FROM Users WHERE USERNAME = @username
ELSE 
		SELECT 0 AS authorized, 0 AS password, 'login@failed.com' AS email, 0 AS uid