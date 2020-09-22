var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "moonsafari91!",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;

    console.log("Welcome to Employee Tracker!")
    MainMenu();
});


function MainMenu() {
    inquirer
        .prompt({

            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by department",
                "View all employees by Manager",
                "Add employee",
                "Remove employee",
                "Update employee role",
                "Update employee manager"
            ]
        })

    .then((answer) => {

        switch (answer.action) {
            case "View all employees":
                viewAllEmp();
                break;

            case "View all employees by department":
                viewAllEmpByDepart();
                break;

            case "View all employees by manager":
                viewAllEmpByManager();
                break;

            case "Add employee":
                addEmployee();
                break;

            case "Remove employee":
                removeEmployee();
                break;

            case "Update employee role":
                updateEmployRole();
                break;

            case "Update employee manager":
                updateEmployMan();
                break;

        }





    });

};