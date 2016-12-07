USE master --placeholder until DB names are finalized
GO

CREATE PROCEDURE dbo.createTourney @tname varchar(255), @numParticipants INT, @hostemail varchar(255), @type INT
AS
	INSERT INTO Tournament(host, size, type, TNAME) VALUES((SELECT uid FROM users WHERE email = @hostemail), @numParticipants, @type, @tname)
	INSERT INTO Participant(tid, uid, PLEVEL, ISACTIVE) VALUES((SELECT MAX(tid) FROM Tournament), (SELECT uid FROM users WHERE email = @hostemail), 0, 1)
	SELECT MAX(tid) AS tid FROM Tournament
GO