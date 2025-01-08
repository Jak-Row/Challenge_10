DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER REFERENCES department(id)
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER REFERENCES role(id),
  manager_id INTEGER REFERENCES employee(id)
);

INSERT INTO department (name) VALUES
  ('Sales'), ('Engineering'), ('Marketing'), ('HR');

INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 50000, 1),
  ('Engineer', 70000, 2),
  ('Marketing Manager', 60000, 3),
  ('HR Specialist', 45000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Alice', 'Brown', 3, 1),
  ('Bob', 'White', 4, NULL);
