const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const navQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
    ],
    name: "nav",
  },
];

const addPrompt = [
  {
    type: "input",
    message:
      "Please enter the name of the Department that you would like to add:",
    name: "department",
  },
];

const addRole = [
  {
    type: "input",
    message: "What is the name of the new Role that you would like to add?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the salary of this new role?",
    name: "salary",
  },
  {
    type: "list",
    message: "Which Department would you like to add this role to?",
    choices: ["Offense", "Defense", "Special Teams"],
    name: "role",
  },
];

const addEmployee = [
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "first",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "last",
  },
  {
    type: "list",
    message: "What Role would you like to assign to the selected Employee?",
    choices: [
      "Quarter Back",
      "Running Back",
      "Wide Receiver",
      "Defensive End",
      "Linebacker",
      "Safety",
      "Kicker",
      "Punter",
      "Offensive Coordinator",
      "Defensive Coordinator",
      "Special Teams Coordinator",
    ],
    name: "role",
  },
  {
    type: "list",
    message: "Who is the Employees Manager?",
    choices: ["None", "Bill Walsh", "Bill Belichick", "Scott O'Brien"],
    name: "manager",
  },
];

const updateEmployee = [
  {
    type: "list",
    message: "Which Employee's role would you like to update?",
    choices: [
      "John Elway",
      "Barry Sanders",
      "Jerry Rice",
      "Von Miller",
      "Ray Lewis",
      "Ed Reed",
      "Jason Elam",
      "Ray Guy",
      "Bill Walsh",
      "Bill Belichick",
      "Scott O'Brien",
    ],
    name: "employee",
  },
  {
    type: "list",
    message: "What Role would you like to assign to the selected Employee?",
    choices: [
      "Quarter Back",
      "Running Back",
      "Wide Receiver",
      "Defensive End",
      "Linebacker",
      "Safety",
      "Kicker",
      "Punter",
      "Offensive Coordinator",
      "Defensive Coordinator",
      "Special Teams Coordinator",
    ],
    name: "role",
  },
];

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_tracker_db",
  }
  //   console.log(`Connected to the employee_tracker_db database.`)
);

function navigation() {
  inquirer.prompt(navQuestion).then((response) => {
    if (response.nav === "View All Departments") {
      db.query(
        `SELECT department.name AS "Department", department.id AS "Department id" FROM department`,
        function (err, results) {
          if (err) {
            console.log(err);
            throw new Error("Something went wrong!");
          }
          // console.log(results);
          console.table(results);
          navigation();
        }
      );
    }
    if (response.nav === "View All Roles") {
      db.query(
        `SELECT role.title AS "Job Title", role.id AS "Role id", department.name AS "Department", role.salary AS "Salary" FROM department, role WHERE department.id=role.department_id`,
        function (err, results) {
          //   console.log(results);
          console.table(results);
          navigation();
        }
      );
    }
    if (response.nav === "View All Employees") {
      db.query(
        ` SELECT e.id AS "Employee id", e.first_name AS "First Name", e.last_name AS "Last Name", role.title AS "Job Title", department.name AS "Department",
        role.salary AS "Salary", m.last_name AS "Manager"
        FROM department
        JOIN role
        ON department.id=role.department_id
        JOIN employee e
        ON role.id=e.role_id
        LEFT JOIN employee m
        ON e.manager_id = m.id`,
        function (err, results) {
          // console.log(results);
          console.table(results);
          navigation();
        }
      );
    }
    if (response.nav === "Add a Department") {
      inquirer.prompt(addPrompt).then((response) => {
        db.query(
          `INSERT INTO department (name) VALUES ("${response.department}");`,
          function (err, results) {
            if (err) {
              console.log(err);
              throw new Error("Something went wrong!");
            }
            console.log(
              `${response.department} has been added to Departments!`
            );
            navigation();
          }
        );
      });
    }
    if (response.nav === "Add a Role") {
      inquirer.prompt(addRole).then((response) => {
        let deptChoice = 0;
        if (response.role === "Offense") {
          deptChoice = 1;
        } else if (response.role === "Defense") {
          deptChoice = 2;
        } else {
          deptChoice = 3;
        }
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES 
            ("${response.name}", ${response.salary}, ${deptChoice});`,
          function (err, results) {
            if (err) {
              console.log(err);
              throw new Error("Something went wrong!");
            }
            console.log(`${response.name} has been added to Roles!`);
            navigation();
          }
        );
      });
    }
    if (response.nav === "Add an Employee") {
      inquirer.prompt(addEmployee).then((response) => {
        let roleChoice = 0;
        if (response.role === "Quarter Back") {
          roleChoice = 1;
        } else if (response.role === "Running Back") {
          roleChoice = 2;
        } else if (response.role === "Wide Receiver") {
          roleChoice = 3;
        } else if (response.role === "Defensive End") {
          roleChoice = 4;
        } else if (response.role === "Linebacker") {
          roleChoice = 5;
        } else if (response.role === "Safety") {
          roleChoice = 6;
        } else if (response.role === "Kicker") {
          roleChoice = 7;
        } else if (response.role === "Punter") {
          roleChoice = 8;
        } else if (response.role === "Offensive Coordinator") {
          roleChoice = 9;
        } else if (response.role === "Defensive Coordinator") {
          roleChoice = 10;
        } else {
          roleChoice = 11;
        }
        let managerChoice = 0;
        if (response.manager === "Bill Walsh") {
          managerChoice = 9;
        } else if (response.manager === "Bill Belichick") {
          managerChoice = 10;
        } else if (response.manager === "Bill O'Brien") {
          managerChoice = 11;
        } else {
          managerChoice = null;
        }
        db.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
              ("${response.first}", "${response.last}", ${roleChoice}, ${managerChoice});`,
          function (err, results) {
            if (err) {
              console.log(err);
              throw new Error("Something went wrong!");
            }
            console.log(`Employee has been added!`);
            navigation();
          }
        );
      });
    }
    if (response.nav === "Update an Employee Role") {
      inquirer.prompt(updateEmployee).then((response) => {
        const firstName = response.employee.split(" ")[0];
        const lasttName = response.employee.split(" ")[1];
        let roleChoice = 0;
        let roleSalary = 0;
        let roleManager = 0;
        if (response.role === "Quarter Back") {
          roleChoice = 1;
          roleSalary = 200000;
          roleManager = 9;
        } else if (response.role === "Running Back") {
          roleChoice = 2;
          roleSalary = 150000;
          roleManager = 9;
        } else if (response.role === "Wide Receiver") {
          roleChoice = 3;
          roleSalary = 100000;
          roleManager = 9;
        } else if (response.role === "Defensive End") {
          roleChoice = 4;
          roleSalary = 160000;
          roleManager = 10;
        } else if (response.role === "Linebacker") {
          roleChoice = 5;
          roleSalary = 140000;
          roleManager = 10;
        } else if (response.role === "Safety") {
          roleChoice = 6;
          roleSalary = 100000;
          roleManager = 10;
        } else if (response.role === "Kicker") {
          roleChoice = 7;
          roleSalary = 60000;
          roleManager = 11;
        } else if (response.role === "Punter") {
          roleChoice = 8;
          roleSalary = 50000;
          roleManager = 11;
        } else if (response.role === "Offensive Coordinator") {
          roleChoice = 9;
          roleSalary = 90000;
          roleManager = null;
        } else if (response.role === "Defensive Coordinator") {
          roleChoice = 10;
          roleSalary = 80000;
          roleManager = null;
        } else {
          roleChoice = 11;
          roleSalary = 70000;
          roleManager = null;
        }
        db.query(
          `UPDATE employee 
            SET first_name = "${firstName}",
             last_name = "${lasttName}",
             role_id = ${roleChoice},
             manager_id = ${roleManager}
            WHERE first_name = "${firstName}";`,
          function (err, results) {
            if (err) {
              console.log(err);
              throw new Error("Something went wrong!");
            }

            console.log(`Employee Role has been updated!`);
            navigation();
          }
        );
      });
    }
  });
}

navigation();
