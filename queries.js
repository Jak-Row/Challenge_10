import { pool } from './db.js';

export const viewDepartments = async () => {
  const result = await pool.query('SELECT * FROM department');
  console.table(result.rows);
};

export const viewRoles = async () => {
  const result = await pool.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id');
  console.table(result.rows);
};

export const viewEmployees = async () => {
  const result = await pool.query(`
    SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `);
  console.table(result.rows);
};

export const addDepartment = async (name) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log(`Department "${name}" added successfully!`);
};

export const addRole = async (title, salary, departmentId) => {
  await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
  console.log(`Role "${title}" added successfully!`);
};

export const addEmployee = async (firstName, lastName, roleId, managerId) => {
  await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
  console.log(`${firstName} ${lastName} added successfully!`);
};

export const updateEmployeeRole = async (employeeId, newRoleId) => {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
  console.log(`Employee's role updated successfully!`);
};
