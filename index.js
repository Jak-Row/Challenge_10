import inquirer from 'inquirer';
import { connectToDb } from './db.js';
import * as queries from './queries.js';

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Quit'
      ]
    }
  ]);

  switch (action) {
    case 'View all departments':
      await queries.viewDepartments();
      break;
    case 'View all roles':
      await queries.viewRoles();
      break;
    case 'View all employees':
      await queries.viewEmployees();
      break;
    case 'Add a department':
      const { departmentName } = await inquirer.prompt([
        { type: 'input', name: 'departmentName', message: 'Enter department name:' }
      ]);
      await queries.addDepartment(departmentName);
      break;
    case 'Add a role':
      const { roleName, salary, departmentId } = await inquirer.prompt([
        { type: 'input', name: 'roleName', message: 'Enter role name:' },
        { type: 'input', name: 'salary', message: 'Enter role salary:' },
        { type: 'input', name: 'departmentId', message: 'Enter department ID for the role:' }
      ]);
      await queries.addRole(roleName, salary, departmentId);
      break;
    case 'Add an employee':
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'Enter first name:' },
        { type: 'input', name: 'lastName', message: 'Enter last name:' },
        { type: 'input', name: 'roleId', message: 'Enter role ID:' },
        { type: 'input', name: 'managerId', message: 'Enter manager ID (if applicable):' }
      ]);
      await queries.addEmployee(firstName, lastName, roleId, managerId || null);
      break;
    case 'Update an employee role':
      const { employeeId, newRoleId } = await inquirer.prompt([
        { type: 'input', name: 'employeeId', message: 'Enter employee ID:' },
        { type: 'input', name: 'newRoleId', message: 'Enter new role ID:' }
      ]);
      await queries.updateEmployeeRole(employeeId, newRoleId);
      break;
    case 'Quit':
      console.log('Goodbye!');
      return;
    default:
      console.log('Invalid action.');
  }

  await mainMenu(); // Show the main menu again
};

// Start the application
const init = async () => {
  await connectToDb();
  await mainMenu();
};

init();
