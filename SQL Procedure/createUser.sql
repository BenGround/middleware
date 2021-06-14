CREATE PROCEDURE InsertUser
	@id int,
	@email nvarchar(100),
	@password nvarchar(100),
	@firstname nvarchar(100),
	@lastname nvarchar(100)
AS
BEGIN 
    INSERT INTO users (id, email, password, firstname, lastname)
    VALUES (@id, @email, @password, @firstname, @lastname)
END
GO
