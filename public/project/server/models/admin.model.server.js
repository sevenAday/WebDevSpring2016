"use strict";
var q = require("q");

module.exports = function (db, mongoose) {

    var AdminSchema = require("./admin.schema.server.js")(mongoose);
    var AdminModel = mongoose.model("Admin", AdminSchema);

    var api = {
        createAdminSettings: createAdminSettings,
        getAllAdminSettings: getAllAdminSettings,
        saveAdminAlertMessage: saveAdminAlertMessage,
        saveNumberOfPages: saveNumberOfPages,
        saveNumberOfActivities: saveNumberOfActivities
    };
    return api;

    function createAdminSettings() {
        var deferred = q.defer();
        AdminModel
            .create({"alertMessage": ""},
                function (err, adminRecord) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(adminRecord);
                    }
                });
        return deferred.promise;
    }

    function getAllAdminSettings() {
        var deferred = q.defer();
        AdminModel
            .findOne({},
                function (err, adminRecord) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(adminRecord);
                    }
                });
        return deferred.promise;
    }

    function saveAdminAlertMessage(alertMessage) {
        var deferred = q.defer();
        AdminModel
            .update({}, {"$set": {"alertMessage": alertMessage, "upsert": true}},
                function (err, adminRecord) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(adminRecord);
                    }
                });
        return deferred.promise;
    }

    function saveNumberOfPages(numberOfPages) {
        var deferred = q.defer();
        AdminModel
            .update({}, {"$set": {"numberOfPages": numberOfPages, "upsert": true}},
                function (err, adminRecord) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(adminRecord);
                    }
                });
        return deferred.promise;
    }

    function saveNumberOfActivities(numberOfActivities) {
        var deferred = q.defer();
        AdminModel
            .update({}, {"$set": {"numberOfActivities": numberOfActivities, "upsert": true}},
                function (err, adminRecord) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(adminRecord);
                    }
                });
        return deferred.promise;
    }
};