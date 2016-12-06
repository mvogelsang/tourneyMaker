USE [TourneyMakerDB]
GO

/****** Object:  Table [dbo].[Participant]    Script Date: 12/6/2016 4:07:05 PM ******/

/*
DROP TABLES
*/

DROP TABLE [dbo].[Participant]
DROP TABLE [dbo].[Singles]
DROP TABLE [dbo].[Tournament]
DROP TABLE [dbo].[Users]

/*
CREATE TABLES
*/

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- CREATE dbo.Users
CREATE TABLE [dbo].[Users](
	[UID] [int] IDENTITY(1,1) NOT NULL,
	[NAME] [varchar](255) NULL,
	[EMAIL] [varchar](255) NULL,
	[USERNAME] [varchar](255) NULL,
	[PASSWORD] [varchar](255) NULL,
	[BIO] [varchar](255) NULL,
	[isRegistered] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[UID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

-- CREATE dbo.Tournament
CREATE TABLE [dbo].[Tournament](
	[TID] [int] IDENTITY(1,1) NOT NULL,
	[HOST] [int] NOT NULL,
	[SIZE] [int] NOT NULL,
	[TYPE] [int] NOT NULL,
	[NAME] [varchar](255) NULL,
	[COMPLETED] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[TID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

-- CREATE dbo.Singles 
CREATE TABLE [dbo].[Singles](
	[MID] [int] NOT NULL,
	[TID] [int] NOT NULL,
	[P1] [int] NULL,
	[P2] [int] NULL,
	[P1SCORE] [int] NULL,
	[P2SCORE] [int] NULL,
	[WINNER] [int] NULL,
 CONSTRAINT [PK_Singles] PRIMARY KEY CLUSTERED 
(
	[TID] ASC,
	[MID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO

ALTER TABLE [dbo].[Singles]  WITH CHECK ADD FOREIGN KEY([TID])
REFERENCES [dbo].[Tournament] ([TID])
GO

-- CREATE dbo.Participant 
CREATE TABLE [dbo].[Participant](
	[TID] [int] NOT NULL,
	[UID] [int] NOT NULL,
	[PLEVEL] [int] NOT NULL,
	[ISACTIVE] [bit] NOT NULL,
 CONSTRAINT [PK_TID] PRIMARY KEY CLUSTERED 
(
	[TID] ASC,
	[UID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO

ALTER TABLE [dbo].[Participant]  WITH CHECK ADD FOREIGN KEY([TID])
REFERENCES [dbo].[Tournament] ([TID])
GO

ALTER TABLE [dbo].[Participant]  WITH CHECK ADD FOREIGN KEY([UID])
REFERENCES [dbo].[Users] ([UID])
GO



GO


