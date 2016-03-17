module.exports = function (app, userModel) {
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUser);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", updateUserById);
    app.delete("/api/project/user/:id", deleteUserById);

    function createUser(req, res) {
        var user = req.body;
        var users = userModel.createUser(user);
        res.json(users);
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            var credentials = {"username": username, "password": password};
            var user = userModel.findUserByCredentials(credentials);
            res.json(user);
        } else if (username) {
            var user = userModel.findUserByUsername(username);
            res.json(user);
        } else {
            var users = userModel.findAllUsers();
            res.json(users);
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var users = userModel.updateUserById(userId, user);
        res.json(users);
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var users = userModel.deleteUserById(userId);
        res.json(users);
    }
};