USE [master]
GO

/****** Object:  Database [cesitonplat]    Script Date: 16/06/2021 15:02:11 ******/
DROP DATABASE cesitonplat
GO
CREATE DATABASE cesitonplat
GO
USE cesitonplat
GO

/****** Object:  Table [dbo].[users]    Script Date: 14/06/2021 21:52:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE roles(
    id int IDENTITY(1,1) NOT NULL UNIQUE,
    name nvarchar(100) NOT NULL UNIQUE
)
GO

INSERT INTO roles (name)
 VALUES ('USER'), ('RESTAURATEUR'), ('LIVREUR'), ('DEVELOPPEUR'), ('COMMERCIAL'), ('TECHNIQUE');

CREATE TABLE users(
	id int IDENTITY(1,1) NOT NULL UNIQUE,	
	email nvarchar(100) NOT NULL UNIQUE,
	password nvarchar(100) NOT NULL,
	firstname nvarchar(100) NOT NULL,
	lastname nvarchar(100) NOT NULL,
	is_suspended int NOT NULL DEFAULT 0,
    role_id int NOT NULL FOREIGN KEY REFERENCES roles(id),
	created_at datetime NOT NULL default CURRENT_TIMESTAMP,
	updated_at datetime
)
GO

CREATE TABLE restaurants(
	id int IDENTITY(1,1) NOT NULL UNIQUE,
	adress nvarchar(100) NOT NULL,
	city nvarchar(100) NOT NULL,
	menu nvarchar(100) NOT NULL,
    restaurateur_id int NOT NULL FOREIGN KEY REFERENCES users(id),
	created_at datetime NOT NULL default CURRENT_TIMESTAMP,
	updated_at datetime
)
GO

CREATE TABLE types_article(
	id int IDENTITY(1,1) NOT NULL UNIQUE,
    name nvarchar(100) NOT NULL UNIQUE
)
GO

INSERT INTO types_article (name)
 VALUES ('PLAT'), ('BOISSON'), ('SAUCE'), ('ACCOMPAGNEMENT')

CREATE TABLE articles(
	id int IDENTITY(1,1) NOT NULL UNIQUE,
    type_article_id int NOT NULL FOREIGN KEY REFERENCES types_article(id),
	created_at datetime NOT NULL default CURRENT_TIMESTAMP,
	updated_at datetime
)
GO

CREATE TABLE restaurants_menu(
	id int IDENTITY(1,1) NOT NULL UNIQUE,
    restaurant_id int NOT NULL FOREIGN KEY REFERENCES restaurants(id),
    article_id int NOT NULL FOREIGN KEY REFERENCES articles(id)
)
GO

CREATE TABLE orders(
	id int IDENTITY(1,1) NOT NULL UNIQUE,
	is_validated int NOT NULL DEFAULT 0,
	created_at datetime NOT NULL default CURRENT_TIMESTAMP,
	updated_at datetime
)
GO

CREATE TABLE orders_articles(
	id int IDENTITY(1,1) NOT NULL UNIQUE,
    order_id int NOT NULL FOREIGN KEY REFERENCES orders(id),
    article_id int NOT NULL FOREIGN KEY REFERENCES articles(id)
)
GO