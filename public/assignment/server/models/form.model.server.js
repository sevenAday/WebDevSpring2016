"use strict";
var q = require("q");

module.exports = function (db, mongoose) {
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model("Form", FormSchema);

    var api = {
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId,
        findFormById: findFormById,
        deleteFormById: deleteFormById,
        addFormWithUserId: addFormWithUserId,
        updateFormById: updateFormById,
        getMongooseModel: getMongooseModel
    };
    return api;

    function getMongooseModel() {
        return FormModel;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel
            .findOne({"title": title},
                function (err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form);
                    }
                }
            );
        return deferred.promise;
    }

    function findFormsByUserId(userId) {
        var deferred = q.defer();
        FormModel
            .find({"userId": userId},
                function (err, forms) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(forms);
                    }
                }
            );
        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();
        FormModel
            .findById(formId,
                function (err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form);
                    }
                }
            );
        return deferred.promise;
    }

    function findFormByIdAndUserId(userId, formId) {
        var deferred = q.defer();
        FormModel
            .findOne({"_id": formId, "userId": userId},
                function (err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form);
                    }
                }
            );
        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();
        FormModel
            .remove(
                {"_id": formId},
                function (err, stats) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(stats);
                    }
                }
            );
        return deferred.promise;
    }

    function addFormWithUserId(userId, form) {
        form.userId = userId;
        var deferred = q.defer();
        FormModel
            .create(form,
                function (err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form);
                    }
                });
        return deferred.promise;
    }

    function updateFormById(formId, newForm) {
        var foundForm = findFormById(formId);
        if (foundForm) {
            foundForm.title = form.title;
            if (form.userId) {
                foundForm.userId = form.userId;
            }
            if (form.fields) {
                foundForm.fields = form.fields;
            }
        }
        return foundForm;
        var deferred = q.defer();
        FormModel
            .findById(formId,
                function (err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        form.title = newForm.title;
                        if (newForm.userId) {
                            form.userId = newForm.userId;
                        }
                        if (newForm.fields) {
                            form.fields = newForm.fields;
                        }
                        form.save(function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        });
                    }
                }
            );
        return deferred.promise;
    }
};