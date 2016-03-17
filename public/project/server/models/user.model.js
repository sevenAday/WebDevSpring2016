var mock = require("./user.mock.json");
module.exports = function (uuid) {
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
            if (mock[u]._id == userId) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = uuid.v4();
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
        var foundUser = findUserById(userId);
        if (foundUser) {
            if (user.firstName) {
                foundUser.firstName = user.firstName;
            }
            if (user.lastName) {
                foundUser.lastName = user.lastName;
            }
            foundUser.username = user.username;
            foundUser.password = user.password;
            foundUser.email = user.email;
            if (user.roles) {
                foundUser.roles = user.roles;
            }
            if (user.commentedOn) {
                foundUser.commentedOn = user.commentedOn;
            }
        }
        return mock;
    }

    function deleteUserById(userId) {
        for (var u in mock) {
            if (mock[u]._id == userId) {
                mock.splice(u, 1);
                break;
            }
        }
        return mock;
    }
};