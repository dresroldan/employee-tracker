var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
const { exit } = require("process");

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

//--------------------------- MAIN MENU --------------------//

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
                "Add role",
                "Exit"
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

            case "Exit":
                quit();
                break;
        }

    });

};


// --------------------------------- VIEW ALL EMPLOYEES ---------------------------------------//

function viewAllEmp() {

    let viewAllEmp = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;"

    connection.query(viewAllEmp, function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("-----------------------------------");
        mainMenu();
    });

};

// ------------------------------ VIEW ALL EMPLOYEES BY DEPARTMENT----------------------------------//

function viewAllDepart() {

    let viewAlldep = "SELECT employee.first_name, employee.last_name, department.dept_name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;"

    connection.query(viewAlldep, function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("--------------------------------------------");
        mainMenu();

    })


};

// ------------------------------ VIEW ALL EMPLOYEES BY ROLES -------------------------------------//

function viewAllRoles() {

    let viewAllrole = "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;"
    connection.query(viewAllrole, function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("--------------------------------------------");
        mainMenu();

    })

};


// ---------------------- ROLE SELECTION FOR ADD EMPLOYEE PROMPT AND UPDATE-------------------------//

function roleSelection() {
    let rolesArr = [];
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            rolesArr.push(res[i].title);
        }

    })
    return rolesArr;
}

// ------------------------ MANAGER SELECTION FOR ADD EMPLOYEE PROMPT AND UPDATE---------------------------//

function managerSelection() {
    let managerArr = [];
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id is NULL", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managerArr.push(res[i].first_name);
        }

    })
    return managerArr;
};


/// ------------------------------------- ADD EMPLOYEE ---------------------------------------------//

function addEmployee() {
    inquirer.prompt([{
            name: "firstName",
            type: "input",
            message: "Enter their first name "
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter their last name "
        },
        {
            name: "role",
            type: "rawlist",
            message: "What is their role? ",
            choices: roleSelection()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: managerSelection()
        }
    ]).then(function(response) {

        console.log(response.choice);

        var roleId = roleSelection().indexOf(response.role) + 1
        var managerId = managerSelection().indexOf(response.choice) + 1

        connection.query("INSERT INTO employee SET ?", {
            first_name: response.firstName,
            last_name: response.lastName,
            manager_id: managerId,
            role_id: roleId

        }, function(err) {
            if (err) throw err
            console.table(response)
            mainMenu()
        })

    })

};


/// ------------------------------------- UPDATE EMPLOYEE ---------------------------------------------//

function updateEmp() {


    let viewAllEmp = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;"

    connection.query(viewAllEmp, function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("-----------------------------------");

    });

    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {

        if (err) throw err

        inquirer.prompt([{
                name: "lastName",
                type: "rawlist",
                choices: function() {
                    var lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the Employee's last name? ",
            },
            {
                name: "role",
                type: "rawlist",
                message: "What is the Employees new title? ",
                choices: roleSelection()
            },
        ]).then(function(response) {
            var roleId = roleSelection().indexOf(response.role) + 1
            connection.query("UPDATE employee SET WHERE ?", {
                    last_name: response.lastName,
                    role_id: response.role
                },
                function(err) {
                    if (err) throw err
                    console.table(response)
                    mainMenu();
                })

        });
    });

}





// ------------------------------------- ADD DEPARTMENT---------------------------------------------//

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

// --------------------------------- ADD ROLE ----------------------------------------//

function addRole() {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function(err, res) {
        inquirer.prompt([{
                name: "title",
                type: "input",
                message: "What is the role title?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary?"

            }
        ]).then(function(res) {
            connection.query(
                "INSERT INTO role SET ?", {
                    title: res.title,
                    salary: res.salary,
                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    mainMenu();
                }
            )

        });
    });
}

// ------------------------------------- EXIT ---------------------------------------//

function quit() {
    connection.end();
    process.exit();
}