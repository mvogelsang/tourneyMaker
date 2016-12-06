USE master --placeholder until DB names are finalized
GO

CREATE PROCEDURE dbo.updateMatchup @mid INT, @tid INT, @email varchar(255), @player INT
AS
	IF(@player = 1)
		UPDATE Singles SET p1 = (SELECT uid FROM users WHERE email = @email) WHERE mid = @mid AND tid = @tid
	ELSE IF(@player = 2)
		UPDATE Singles SET p2 = (SELECT uid FROM users WHERE email = @email) WHERE mid = @mid AND tid = @tid	
GO