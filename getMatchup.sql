USE master --placeholder until DB names are finalized
GO

CREATE PROCEDURE dbo.getMatchups @tid INT
AS
	SELECT mid, p1, p2 FROM Singles WHERE tid = @tid
GO