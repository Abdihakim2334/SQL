
const db = require('./db');

async function viewDepartments() {
    const res = await db.query('SELECT * FROM department');
    console.table(res.rows);
}

async function viewRoles() {
    const res = await db.query(`
        SELECT role.id, title, salary, department.name AS department
        FROM role
        JOIN department ON role.department_id = department.id`);
    console.table(res.rows);
}

async function viewEmployees() {
    const res = await db.query(`
        SELECT employee.id, 
               employee.first_name, 
               employee.last_name, 
               role.title AS title, 
               department.name AS department, 
               role.salary, 
               CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `);
    console.table(res.rows);
}

async function addDepartment(name) {
    await db.query('INSERT INTO department (name) VALUES ($1)', [name]);
}

async function addRole(title, salary, departmentId) {
    await db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
}

async function addEmployee(firstName, lastName, roleId, managerId) {
    await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
}

async function updateEmployeeRole(employeeId, roleId) {
    await db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
}

async function updateEmployeeName(empId, newFirstName, newLastName) {
    await db.query('UPDATE employee SET first_name = $1, last_name = $2 WHERE id = $3', [newFirstName, newLastName, empId]);
}

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeName, // Export the new function
};
