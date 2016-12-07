USE master --placeholder until we get the DB names finalized
GO 

CREATE PROCEDURE dbo.updateManager @email VARCHAR(255), @tid INT
AS

IF((SELECT COUNT(uid) FROM Participant WHERE tid = @tid AND uid = (SELECT uid FROM users WHERE email = @email)) = 0)
	INSERT INTO Participant(tid, uid, PLEVEL, ISACTIVE) VALUES(@tid, (SELECT uid FROM users WHERE email = @email), 1, 1)
ELSE
	UPDATE Participant SET PLEVEL = 1 WHERE tid = @tid AND uid = (SELECT uid FROM users WHERE email = @email)