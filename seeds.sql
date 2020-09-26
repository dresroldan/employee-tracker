USE employee_trackerDB;

INSERT INTO department (id, dept_name)
VALUES (1, "Sales");
INSERT INTO department (id, dept_name)
VALUES (2, "Engineering");
INSERT INTO department (id, dept_name)
VALUES (3, "Finance");
INSERT INTO department (id, dept_name)
VALUES (4, "Legal");

USE employee_trackerDB;

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1);
INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Salesperson", 80000, 1);
INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Lead Engineer", 150000, 2);
INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Software Engineer", 120000, 2);
INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Accountant", 125000, 3);
INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Legal Team Lead", 250000, 4);
INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Lawyer", 190000, 4);

USE employee_trackerDB;
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Robert", "Rodriguez", 3, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Malia", "Brown", 5, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Sarah", "Lourd", 6, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Goodman", 1, NULL );
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Jackie", "Chan", 2, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Kevin", "Bacon", 4, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Tim", "Allen", 7, 6);