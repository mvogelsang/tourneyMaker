USE master --placeholder until DB names are finalized
GO

CREATE PROCEDURE dbo.checkUser @username varchar(255)
AS

IF((SELECT COUNT(*) FROM users WHERE username = @username) = 0)
	SELECT 1 AS isAvailable 
ELSE 
	SELECT 0 AS isAvailable 
GO