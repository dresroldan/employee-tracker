var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

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
    mainMenu();
});

function mainMenu() {

    inquirer
        .prompt({

            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by department",
                "View all employees by roles",
                "Add employee",
                "Update employee",
                "Add department",
                "Add Role"
            ]
        })

    .then((answer) => {

        switch (answer.action) {
            case "View all employees":
                viewAllEmp();
                break;

            case "View all employees by department":
                viewAllDepart();
                break;

            case "View all employees by roles":
                viewAllRoles();
                break;

            case "Add employee":
                addEmployee();
                break;

            case "Update employee":
                updateEmp();
                break;

            case "Add department":
                addDep();
                break;

            case "Add role":
                addRole();
                break;

        }

    });

};

function viewAllEmp() {

    let viewAllEmp = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;"

    connection.query(viewAllEmp, function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("-----------------------------------");
        mainMenu();
    });
};


function viewAllDepart() {

    let viewAlldep = "SELECT employee.first_name, employee.last_name, department.dept_name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;"

    connection.query(viewAlldep, function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("--------------------------------------------");
        mainMenu();

    })


};


function viewAllRoles() {
    let viewAllrole = "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;"
    connection.query(viewAllrole, function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("--------------------------------------------");
        mainMenu();

    })



};


function selectRole() {
    let rolesArr = [];
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            rolesArr.push(res[i].title);
        }

    })
    return rolesArr;
}



function selectManager() {
    let managerArr = [];
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id is NULL", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managerArr.push(res[i].first_name);
        }

    })
    return managerArr;
};


function addEmployee() {
    inquirer.prompt([

        {
            name: "firstname",
            type: "input",
            message: "Enter their first name"
        },

        {
            name: "lastname",
            type: "input",
            message: "Enter their last name "
        },

        {
            name: "role",
            type: "list",
            message: "What is their role?",
            choices: selectRole()
        },

        {
            name: "choice",
            type: "rawlist",
            message: "What's their managers name?",
            choices: selectManager()
        }

    ]).then(function(response) {
        var roleId = selectRole().indexOf(response.role) + 1
        var managerId = selectManager().indexOf(response.choice) + 1
        connection.query("INSERT INTO employee SET ?",

            {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: roleId,
                manager_id: managerId,


            },
            function(err) {
                if (err) throw err
                console.table(response);
                mainMenu();


            })







    });



};

function updateEmp() {};

function addDep() {

    inquirer.prompt([{
        name: "dept_name",
        type: "input",
        message: "What department would you like to add?"

    }]).then(function(res) {
        connection.query("INSERT INTO department SET ?", { dept_name: res.dept_name },

            function(err) {
                if (err) throw err
                console.table(res)
                mainMenu();
            }



        )



    })


};

function addRole() {};