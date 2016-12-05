USE master --placeholder until we get the DB names finalized.
GO

CREATE PROCEDURE dbo.loginUser @username varchar(255), @password varchar(255)
AS

IF((SELECT PASSWORD FROM Users WHERE USERNAME = @username) = @password)
		SELECT 1 AS authorized, PASSWORD, EMAIL FROM Users WHERE USERNAME = @username
ELSE 
		SELECT 0 AS authorized