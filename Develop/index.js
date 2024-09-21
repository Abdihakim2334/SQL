const inquirer = require('inquirer');
const employee = require('./lib/employee');

async function init() {
    const { action } = await inquirer.prompt({
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
            'Exit',
        ],
    });

    switch (action) {
        case 'View all departments':
            await employee.viewDepartments();
            break;
        case 'View all roles':
            await employee.viewRoles();
            break;
        case 'View all employees':
            await employee.viewEmployees();
            break;
        case 'Add a department':
            const { departmentName } = await inquirer.prompt({
                type: 'input',
                name: 'departmentName',
                message: 'Enter department name:',
            });
            await employee.addDepartment(departmentName);
            console.log(`Added department: ${departmentName}`);
            break;
        case 'Add a role':
            const { roleName, salary, departmentId } = await inquirer.prompt([
                { type: 'input', name: 'roleName', message: 'Enter role name:' },
                { type: 'input', name: 'salary', message: 'Enter salary:' },
                { type: 'input', name: 'departmentId', message: 'Enter department ID:' },
            ]);
            await employee.addRole(roleName, salary, departmentId);
            console.log(`Added role: ${roleName}`);
            break;
        case 'Add an employee':
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                { type: 'input', name: 'firstName', message: 'Enter first name:' },
                { type: 'input', name: 'lastName', message: 'Enter last name:' },
                { type: 'input', name: 'roleId', message: 'Enter role ID:' },
                { type: 'input', name: 'managerId', message: 'Enter manager ID (leave blank if none):' },
            ]);
            await employee.addEmployee(firstName, lastName, roleId, managerId || null);
            console.log(`Added employee: ${firstName} ${lastName}`);
            break;
        case 'Update an employee role':
            const { empId, newRoleId } = await inquirer.prompt([
                { type: 'input', name: 'empId', message: 'Enter employee ID to update:' },
                { type: 'input', name: 'newRoleId', message: 'Enter new role ID:' },
            ]);
            await employee.updateEmployeeRole(empId, newRoleId);
            console.log(`Updated employee ID ${empId} to new role ID ${newRoleId}`);
            break;
        case 'Exit':
            process.exit();
    }
    init(); // Rinitialize the prompt
}

init();
