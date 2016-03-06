var mock = require("./form.mock.json");
module.exports = function () {
    var api = {
        findFormByTitle: findFormByTitle
    };
    return api;

    function findFormByTitle(title) {
        for (var f in mock) {
            if (mock[f].title == title) {
                return mock[f];
            }
        }
        return null;
    }
};