//This for database setup.

var sqlite3 = require('sqlite3').verbose(),
    table = 'users',
    db;


function initDB() {
    console.log('Starting Database.');
    db = new sqlite3.Database('mannco.sqlite3', dumpTable);
}

function dumpTable() {
    console.log('Dropping previous ' + table + ' table if there was one.');
    db.run("DROP TABLE users", createTable);
}

function createTable() {
    console.log('Create Table users.');
    db.run("CREATE TABLE IF NOT EXISTS " + table + " (Username TEXT, FavoriteClass TEXT, description TEXT)");
}

function insertData(data) {
    console.log('Inserting data into ' + table );
    db.run("INSERT INTO users VALUES('admin', 'motherfucking spys')");
}

function closeDBAndShutdown() {
    console.log('Dropping users table and shutting down.');
    db.run("DROP TABLE users");
    db.close();
    process.exit(0);
}

function authUser(user, pass, res) {
    var sql = "select username from users where username = '" + user + "' and password = '" + pass + "';";
    var secret = 'fiiiiiignuts';

    db.get(sql, function(error, row) {
        if (error) {
            throw error;
        }
        if (row != undefined) {
            res.render('auth', {
                title : 'Mann Co.',
                user : user,
                answer : secret
            });
        } else {
            res.render('index', {
                title : 'Mann Co.Administration',
                error : 'Permission Denied'
            });
        }
    });
}

exports.initDB = initDB;
exports.authUser = authUser;
exports.closeDBAndShutdown = closeDBAndShutdown;
