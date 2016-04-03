"use strict";
module.exports = function (app, userModel, documentModel) {
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUser);
    app.get("/api/project/loggedin", loggedIn);
    app.post("/api/project/loggedin", setLoggedIn);
    app.post("/api/project/logout", logOut);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", updateUserById);
    app.delete("/api/project/user/:id", deleteUserById);
    app.post("/api/project/user/:id/commentedon/:documentId", addCommentedOnByUserId);
    app.delete("/api/project/user/:id/commentedon/:documentId", removeCommentedOnIdByUserId);
    app.post("/api/project/user/:id/like/:documentId", addLikeByUserId);
    app.delete("/api/project/user/:id/like/:documentId", removeLikeIdByUserId);
    app.get("/api/project/user/:id/commentedon", getCommentedOnByUserId);
    app.get("/api/project/user/:id/like", getLikeByUserId);

    function createUser(req, res) {
        var user = req.body;
        if (req.session.user) {
            if (req.session.user.roles.indexOf("admin") == -1) {
                user.roles = ["newcomer"];
            }
        } else {
            user.roles = ["newcomer"];
        }
        userModel.createUser(user)
            .then(
                function (doc) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
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
        userModel.findUserById(userId)
            .then(
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
        userModel.updateUserById(userId, user)
            .then(
                function (doc) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel.deleteUserById(userId)
            .then(
                function (stats) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addCommentedOnByUserId(req, res) {
        var userId = req.params.id;
        var documentId = req.params.documentId;
        userModel.addCommentedOnByUserId(userId, documentId)
            .then(
                function (doc) {
                    return userModel.findUserById(userId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (req.session.user._id == userId) {
                        req.session.user.commentedOn = user.commentedOn;
                    }
                    res.json(user.commentedOn);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function removeCommentedOnIdByUserId(req, res) {
        var userId = req.params.id;
        var documentId = req.params.documentId;
        userModel.removeCommentedOnIdByUserId(userId, documentId)
            .then(
                function (doc) {
                    return userModel.findUserById(userId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (req.session.user._id == userId) {
                        req.session.user.commentedOn = user.commentedOn;
                    }
                    res.json(user.commentedOn);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addLikeByUserId(req, res) {
        var userId = req.params.id;
        var documentId = req.params.documentId;
        userModel.addLikeByUserId(userId, documentId)
            .then(
                function (doc) {
                    return userModel.findUserById(userId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (req.session.user._id == userId) {
                        req.session.user.likes = user.likes;
                    }
                    res.json(user.likes);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function removeLikeIdByUserId(req, res) {
        var userId = req.params.id;
        var documentId = req.params.documentId;
        userModel.removeLikeIdByUserId(userId, documentId)
            .then(
                function (doc) {
                    return userModel.findUserById(userId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (req.session.user._id == userId) {
                        req.session.user.likes = user.likes;
                    }
                    res.json(user.likes);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getCommentedOnByUserId(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        var documents = documentModel.getDocumentsByIds(user.commentedOn);
        res.json(documents);
    }

    function getLikeByUserId(req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(
                function (user) {
                    return documentModel.getDocumentsByIds(user.likes);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (documents) {
                    res.json(documents);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
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