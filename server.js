const inquirer = require("inquirer");
const mysql = require("mysql2");
const express = require("express");
const cTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
      db.query("SELECT * FROM department", function (err, results) {
        // console.log(results);
        console.table(results);
      });
      navigation();
    }
    if (response.nav === "View All Roles") {
      db.query("SELECT * FROM role", function (err, results) {
        // console.log(results);
        console.table(results);
      });
      navigation();
    }
    if (response.nav === "View All Employees") {
      db.query("SELECT * FROM employee", function (err, results) {
        // console.log(results);
        console.table(results);
      });
      navigation();
    }
  });
}

navigation();

// db.query("SELECT * FROM employee", function (err, results) {
//   console.log(results);
//   console.table(results);
// });

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
