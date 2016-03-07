var mock = require("./user.mock.json");
module.exports = function () {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById
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

    function findUserById(userId) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return mock;
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

    function findAllUsers() {
        return mock;
    }

    function updateUserById(userId, user) {
        var foundUser = finduserById(userId);
        if (foundUser) {
            foundUser.firstName = user.firstName;
            foundUser.lastName = user.lastName;
            foundUser.username = user.username;
            foundUser.password = user.password;
        }
        return mock;
    }

    function deleteUserById(userId) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                mock.splice(u, 1);
                break;
            }
        }
        return users;
    }
};