CREATE DATABASE db_tech2u;
USE db_tech2u;

CREATE TABLE category(
  idCategory INT(11) NOT NULL,
  name VARCHAR (50) NOT NULL,
  PRIMARY KEY (idCategory)
);

ALTER TABLE category
MODIFY idCategory INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


-- PRODUCTS TABLE
CREATE TABLE product (
  idProduct INT(11) NOT NULL,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  idCategory INT(11) NOT NULL ,
  url_image VARCHAR(100) NULL,
  idImage VARCHAR(30) NULL,
  update_at datetime NULL,
  qty INT DEFAULT(0) NOT NULL ,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_category FOREIGN KEY(idCategory) REFERENCES category(idCategory),
  PRIMARY KEY (idProduct)
);

ALTER TABLE product
  MODIFY idProduct INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


-- CART TABLE
CREATE TABLE cart(
  idCart INT(11) NOT NULL,
  idProduct INT(11) NOT NULL,
  qty INT(10),
  total DECIMAL(10,2),  
  CONSTRAINT fk_product FOREIGN KEY(idProduct) REFERENCES product(idProduct),
  PRIMARY KEY (idCart)
);

ALTER TABLE cart
  MODIFY idCart INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

-- Table Users
CREATE TABLE users (
  idUser INT(11) NOT NULL,
  email VARCHAR(30) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullName VARCHAR(100) NOT NULL,
  userType BOOLEAN NOT NULL DEFAULT 0,
  idCart INT(11) NULL,
  token VARCHAR (200) NULL,
  expiration DATETIME NULL ,
  CONSTRAINT fk_cart FOREIGN KEY(idCart) REFERENCES cart(idCart)
);
ALTER TABLE users
  ADD PRIMARY KEY (idUser);

ALTER TABLE users
MODIFY idUser INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
DESCRIBE users;

CREATE TABLE image(
  idImage VARCHAR(50) NOT NULL,
  filename VARCHAR(70) NOT NULL,
  path VARCHAR(100) NOT NULL,
  originalname VARCHAR(60) NOT NULL,
  mimetype VARCHAR (60) NOT NULL,
  size INT NOT NULL,
  PRIMARY KEY (idImage)
);

-- CREATE TABLE UserAddress(
--   idAdress INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
--   adress VARCHAR(150) NOT NULL,
--   city VARCHAR (60) NOT NULL,
--   department VARCHAR (60) NOT NULL,
--   cellphone INT(8) NOT NULL,
-- )
-- ALTER TABLE UserAddress
--   ADD PRIMARY KEY (idAdress);








