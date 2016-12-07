USE master --placeholder until DB names are finalized
GO

CREATE PROCEDURE dbo.getAllTourneys @username varchar(255)
AS

SELECT Tou.tid, tname AS NAME, SIZE, ISACTIVE AS COMPLETED  
FROM Tournament AS Tou
JOIN Participant AS par ON Tou.TID = par.TID
WHERE uid = (SELECT uid FROM users WHERE username = @username) 
GO
