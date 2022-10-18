var fs = require("fs");

function check_login(credentials) {
    let users = JSON.parse(fs.readFileSync(__dirname + "./../data/" + "data.json", 'utf8'));

    for (var i = 0; i < users.length; i++) {
        if (users[i].username == credentials.username && users[i].password == credentials.password) {
            return true;
        }
    }

    return false;
}

module.exports = {
    check_login: check_login
}