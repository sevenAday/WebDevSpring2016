"use strict";
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function (app, userModel) {
    var DPWD = ".........";
    var auth = authenticated;
    var admn = isAdmin;

    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/assignment/loggedin", loggedIn);
    app.post("/api/assignment/logout", logOut);
    app.post("/api/assignment/register", register);

    app.post("/api/assignment/user", admn, createUser);
    app.get("/api/assignment/user", admn, findUser);
    app.get("/api/assignment/user/:id", admn, findUserById);
    app.put("/api/assignment/user/:id", auth, updateUserById);
    app.delete("/api/assignment/user/:id", admn, deleteUserById);
    app.post("/api/assignment/appadmin", createAppAdmin);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ["student"];
        newUser.password = bcrypt.hashSync(newUser.password.trim());
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
        var user = req.body;
        if (!isAdminUser(req.user) || !user.roles) {
            user.roles = ["student"];
        }
        user.password = bcrypt.hashSync(user.password);
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
                    for (var u in users) {
                        users[u].password = DPWD;
                    }
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
            userModel.findUserByUsername(username)
                .then(
                    function (user) {
                        if (user && bcrypt.compareSync(password, user.password)) {
                            res.json(user);
                        } else {
                            res.status(400).send(err);
                        }
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
                        for (var u in users) {
                            users[u].password = DPWD;
                        }
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
        if (user.password == DPWD) {
            user.password = "";
        } else {
            user.password = bcrypt.hashSync(user.password.trim());
        }
        if (!isAdminUser(req.user)) {
            user.roles = "";
        }
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
                    for (var u in users) {
                        users[u].password = DPWD;
                    }
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
                    for (var u in users) {
                        users[u].password = DPWD;
                    }
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedIn(req, res) {
        if (req.isAuthenticated()) {
            req.user.password = DPWD;
        }
        res.json(req.isAuthenticated() ? req.user : null);
    }

    function logOut(req, res) {
        req.logOut();
        res.send(200);
    }

    function createAppAdmin() {
        userModel.findUserByUsername("bob")
            .then(
                function (user) {
                    if (user) {
                        res.json(user);
                    }
                    else {
                        return userModel.createAppAdmin();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, {"username": username});
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function login(req, res) {
        if (req.user.password) {
            req.user.password = DPWD;
            var user = req.user;
            res.json(user);
        } else {
            res.json(null);
        }
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
        if (req.isAuthenticated()) {
            next();
        } else {
            res.send(401);
        }
    }

    function isAdminUser(user) {
        if (user.roles) {
            var userRoles = user.roles.map(function (role) {
                return role.toLowerCase();
            });
            if (userRoles.indexOf("admin") >= 0 || userRoles.indexOf("administrator") >= 0) {
                return true;
            }
            return false;
        }
    }

    function isAdmin(req, res, next) {
        if (req.isAuthenticated()) {
            if (isAdminUser(req.user)) {
                next();
            } else {
                res.send(403);
            }
        } else {
            res.send(403);
        }
    }
};