DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;


CREATE TABLE department (
id INT AUTO_INCREMENT NOT NULL,
dept_name VARCHAR(30) NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
CONSTRAINT FK_department_id FOREIGN KEY (department_id)
REFERENCES department(id)
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
roles_id INT NOT NULL,
CONSTRAINT FK_roles_id FOREIGN KEY (roles_id)
REFERENCES roles(id), 
manager_id INT,
CONSTRAINT FK_manager_id FOREIGN KEY (manager_id)
REFERENCES employee(id)
PRIMARY KEY (id)
);


