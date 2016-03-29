"use strict";
module.exports = function (app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/loggedin", loggedIn);
    app.post("/api/assignment/loggedin", setLoggedIn);
    app.post("/api/assignment/logout", logOut);

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
            userModel.findUserByCredentials(credentials)
                .then(
                    function (user) {
                        res.json(user);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else if (username) {
            userModel.findUserByUsername(username)
                .then(
                    function (user) {
                        res.json(user);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            userModel.findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId).then(
            function (user) {
                res.json(user);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
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

    function setLoggedIn(req, res) {
        var user = req.body;
        req.session.user = user;
        res.send(200);
    }

    function loggedIn(req, res) {
        res.json(req.session.user);
    }

    function logOut(req, res) {
        req.session.destroy();
        res.send(200);
    }
};