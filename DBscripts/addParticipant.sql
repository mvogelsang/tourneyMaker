USE master --placeholder until DB names are finalized
GO

CREATE PROCEDURE dbo.addParticipant @email varchar(255), @tid INT
AS
	INSERT INTO Participant(tid, uid, PLEVEL, ISACTIVE) VALUES(@tid, (SELECT uid FROM users WHERE email = @email), 2, 1)
GO