CREATE DATABASE db_tech2u;
USE db_tech2u;

--Table Users
CREATE TABLE users (
  idUser INT(11) NOT NULL,
  email VARCHAR(30) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullName VARCHAR(100) NOT NULL,
  userType INT(2) NOT NULL
  idCart INT(11) NULL
  CONSTRAINT fk_cart FOREIGN KEY(idCart) REFERENCES cart(idCart)
);
ALTER TABLE users
  ADD PRIMARY KEY (idUser);

ALTER TABLE users
MODIFY idUser INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
DESCRIBE users;


-- PRODUCTS TABLE
CREATE TABLE product (
  idProduct INT(11) NOT NULL,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(25) NOT NULL,
  url VARCHAR(30) NULL,
  upldated_update_at_url_image timestamp NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (idProduct)
);

ALTER TABLE products
  MODIFY idProduct INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


--CART TABLE
CREATE TABLE cart(
  idCart INT(11) NOT NULL,
  idProduct INT(11) NOT NULL,
  qty INt(10),
  total DECIMAL(10,2)
  PRIMARY KEY (idCart),
  CONSTRAINT fk_product FOREIGN KEY(idProduct) REFERENCES product(idProduct)
);

ALTER TABLE cart
  MODIFY idCart INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;






