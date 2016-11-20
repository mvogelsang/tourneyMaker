USE master --placeholder until DB names are finalized
GO

CREATE PROCEDURE dbo.registerUser @username varchar(255), @password varchar(255), @email varchar(255)
AS

IF((SELECT UID FROM Users WHERE USERNAME = @username) IS NOT NULL)
		SELECT 0 AS isRegistered
ELSE 
		INSERT INTO Users 
		VALUES (NULL, @email, @username, @password, NULL)
		SELECT 1 AS isRegistered
GO




