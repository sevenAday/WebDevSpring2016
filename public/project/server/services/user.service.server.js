"use strict";
//var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, userModel, documentModel) {
    var auth = authenticated;

    //app.post("/api/project/login", passport.authenticate('local'), login);
    app.get("/api/project/loggedin", loggedIn);
    app.post("/api/project/logout", logOut);
    app.post("/api/project/register", register);

    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUser);
    app.post("/api/project/loggedin", setLoggedIn);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", updateUserById);
    app.delete("/api/project/user/:id", deleteUserById);
    app.post("/api/project/user/:id/commentedon/:documentId", addCommentedOnByUserId);
    app.delete("/api/project/user/:id/commentedon/:documentId", removeCommentedOnIdByUserId);
    app.post("/api/project/user/:id/like/:documentId", addLikeByUserId);
    app.delete("/api/project/user/:id/like/:documentId", removeLikeIdByUserId);
    app.get("/api/project/user/:id/commentedon", getCommentedOnByUserId);
    app.get("/api/project/user/:id/like", getLikeByUserId);

    /*passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);*/

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ["newcomer"];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        if (!req.session.isAdminUser) {
            newUser.roles = ["newcomer"];
        }
        userModel.createUser(newUser)
            .then(
                function (user) {
                    if (req.session.isAdminUser) {
                        return userModel.findAllUsers();
                    } else {
                        return user;
                    }
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
        var newUser = req.body;
        userModel.updateUserById(userId, newUser)
            .then(
                function (user) {
                    if (req.session.isAdminUser) {
                        return userModel.findAllUsers();
                    } else {
                        return user;
                    }
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
                function (commentedOn) {
                    if (req.session.user._id == userId) {
                        req.session.user.commentedOn = commentedOn;
                    }
                    res.json(commentedOn);
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
                function (likes) {
                    if (req.session.user._id == userId) {
                        req.session.user.likes = likes;
                    }
                    res.json(likes);
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
                function (likes) {
                    if (req.session.user._id == userId) {
                        req.session.user.likes = likes;
                    }
                    res.json(likes);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getCommentedOnByUserId(req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(
                function (user) {
                    return documentModel.getDocumentsByIds(user.commentedOn);
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
        req.session.isAdminUser = false;
        if (req.session.user.roles.indexOf("admin") >= 0 || req.session.user.roles.indexOf("administrator") >= 0) {
            req.session.isAdminUser = true;
        }
        res.send(200);
    }

    function loggedIn(req, res) {
        res.json(req.isAuthenticated() ? req.user : null);
    }

    function logOut(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({"username": username, "password": password})
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function authenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };
};