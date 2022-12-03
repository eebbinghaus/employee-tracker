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
    name: "role",
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
    message: "What is the employees roll?",
    choices: ["Offense", "Defense", "Special Teams"],
    name: "role",
  },
  {
    type: "list",
    message: "Who is the Employees Manager?",
    choices: ["Bill Walsh", "Bill Belichick", "Scott O'Brien"],
    name: "manager",
  },
];

const updateEmployee = [
  {
    type: "list",
    message: "Which Employee's role would you like to update?",
    choces: [
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
        ` SELECT employee.id AS "Employee id", employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS "Job Title", department.name AS "Department",
      role.salary AS "Salary", employee.manager_id AS "Manager"
      FROM department
      JOIN role
      ON department.id=role.department_id
      JOIN employee
      ON role.id=employee.role_id`,
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
  });
}

navigation();
