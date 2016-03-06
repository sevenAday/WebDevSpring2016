var mock = require("./user.mock.json");
module.exports = function () {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        createUser: createUser
    };
    return api;

    function findUserByUsername(username) {
        for (var u in mock) {
            if (mock[u].username == username) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function findUserByCredentials(credentials) {
        for (var u in mock) {
            if (mock[u].username == credentials.username &&
                mock[u].password == credentials.password) {
                return mock[u];
            }
        }
        return null;
    }
};