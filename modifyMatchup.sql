USE master --placeholder until DB names are finalized
GO

CREATE PROCEDURE dbo.modifyMatchup @tid INT, @mid INT, @p2score INT, @p1score INT, @winner INT
AS

UPDATE Singles SET P2SCORE = @p2score, P1SCRORE = @p1score, WINNER = @winner WHERE tid = @tid AND mid = @mid
GO