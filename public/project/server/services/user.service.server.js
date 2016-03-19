module.exports = function (app, userModel) {
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

    function createUser(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        res.json(user);
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
        user = userModel.updateUserById(userId, user);
        if (req.session.user._id == userId) {
            req.session.user = user;
        }
        res.json(user);
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var users = userModel.deleteUserById(userId);
        res.json(users);
    }

    function loggedIn(req, res) {
        res.json(req.session.user);
    }

    function logOut(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function addCommentedOnByUserId(req, res) {
        var userId = req.params.id;
        var documentId = req.params.documentId;
        var commentedOn = userModel.addCommentedOnByUserId(userId, documentId);
        if (req.session.user._id == userId) {
            req.session.user.commentedOn = commentedOn;
        }
        res.json(commentedOn);
    }

    function removeCommentedOnIdByUserId(req, res) {
        var userId = req.params.id;
        var documentId = req.params.documentId;
        var commentedOn = userModel.removeCommentedOnIdByUserId(userId, documentId);
        if (req.session.user._id == userId) {
            req.session.user.commentedOn = commentedOn;
        }
        res.json(commentedOn);
    }

    function setLoggedIn(req, res) {
        var user = req.body;
        req.session.user = user;
        res.send(200);
    }
};