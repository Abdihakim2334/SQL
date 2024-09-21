INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('HR');

INSERT INTO role (title, salary, department_id) VALUES 
('Sales Representative', 60000, 1),
('Software Engineer', 80000, 2),
('HR Manager', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Ippo', 'Mako', 1, NULL),
('Takamura', 'Mamo', 2, 1),
('Miyata', 'ichiro', 3, 1);
