CREATE DATABASE db_tech2u;
USE db_tech2u;

CREATE TABLE users (
  idUser INT(11) NOT NULL,
  userName VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullName VARCHAR(100) NOT NULL,
  userType INT(2) NOT NULL
);
ALTER TABLE users
  ADD PRIMARY KEY (idUser);

ALTER TABLE users
  MODIFY idUser INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;
 
-- CATEGORIES TABLE
CREATE TABLE categories (
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT
);
ALTER TABLE categories
  ADD PRIMARY KEY (id);

ALTER TABLE categories
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE categories;

-- PRODUCTS TABLE
CREATE TABLE products (
  idProduct INT(11) NOT NULL,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  price DOUBLE NOT NULL,
  productStatus VARCHAR(50) NOT NULL ,
  quantity INT(5) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (idProduct)
);

ALTER TABLE products
  MODIFY idProduct INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
---------------

--PAGE USER TABLE
CREATE TABLE pageUsers(
  idUser INT(11) NOT NULL,
  userName VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  name VARCHAR (30) NOT NULL,
  lastName VARCHAR (30) NOT NULL,
  PRIMARY KEY (idUser)
);

ALTER TABLE pageUsers
  MODIFY idUser INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

--PRODUCTORDER TABLE
CREATE TABLE orders(
  idOrder INT(11) NOT NULL,
  idProduct INT(11) NOT NULL,
  price DOUBLE NOT NULL,
  quantity INT(5) NOT NULL,
  PRIMARY KEY (idOrder),
  CONSTRAINT fk_product FOREIGN KEY(idProduct) REFERENCES products(idProduct)
);

ALTER TABLE orders
  MODIFY idOrder INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


--CART TABLE
CREATE TABLE cart(
  idSale INT(11) NOT NULL,
  idOrder INT(11) NOT NULL,
  idUser INT(11) NOT NULL,
  discount DOUBLE NOT NULL,
  PRIMARY KEY (idSale),
  CONSTRAINT fk_order FOREIGN KEY(idOrder) REFERENCES orders(idOrder),
  CONSTRAINT fk_user FOREIGN KEY(idUser) REFERENCES pageUsers(idUser)
);

ALTER TABLE cart
  MODIFY idSale INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;



