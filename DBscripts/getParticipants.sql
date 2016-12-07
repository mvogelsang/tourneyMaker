USE master --placeholder until DB names are finalized
GO

CREATE PROCEDURE dbo.getParticipants @tid INT
AS
	SELECT users.uid, email, username, password, PLEVEL FROM Participant JOIN users ON Participant.uid = users.uid WHERE tid = @tid
GO