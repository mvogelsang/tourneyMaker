USE master --placeholder until DB names are finalized
GO

CREATE PROCEDURE dbo.getHost @tid INT
AS
	SELECT password, email, uid, username FROM users WHERE uid = (SELECT HOST FROM Tournament WHERE tid = @tid)  
GO