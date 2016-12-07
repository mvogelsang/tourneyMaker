USE master --placeholder until DB names are finalized
GO

CREATE PROCEDURE dbo.addMatchup @mid INT, @tid INT
AS
	INSERT INTO Singles(mid, tid) VALUES(@mid, @tid)
GO