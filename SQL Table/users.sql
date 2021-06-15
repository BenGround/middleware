USE cesitonplat
GO

/****** Object:  Table [dbo].[users]    Script Date: 14/06/2021 21:52:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE users(
	id int IDENTITY(1,1) NOT NULL UNIQUE,
	email nvarchar(100) NOT NULL UNIQUE,
	password nvarchar(100) NOT NULL,
	firstname nvarchar(100) NOT NULL,
	lastname nvarchar(100) NOT NULL
)
GO

