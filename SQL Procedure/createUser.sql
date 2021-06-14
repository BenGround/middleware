DROP PROCEDURE InsertUser
GO 

CREATE PROCEDURE InsertUser
	@email nvarchar(100),
	@password nvarchar(100),
	@firstname nvarchar(100),
	@lastname nvarchar(100)
AS
BEGIN 
    INSERT INTO users (email, password, firstname, lastname)
    VALUES (@email, @password, @firstname, @lastname)
END
GO
