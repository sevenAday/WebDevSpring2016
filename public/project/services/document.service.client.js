(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .factory("DocumentService", DocumentService);

    function DocumentService() {
        var documents = [
            {
                "_id": 801,
                "userId": 123,
                "lastModified": new Date(2016, 0, 2, 9, 20, 27),
                "title": "Requirement 10001 Explanation",
                "content": "This requirement 10001 requires you to do what is required for the requirement 10001. " +
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
                    "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud " +
                    "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure " +
                    "dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
                    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
                    "mollit anim id est laborum.",
                "like": [345],
                "comment": [1]
            },
            {
                "_id": 702,
                "userId": 345,
                "lastModified": new Date(2016, 1, 2, 15, 6, 23),
                "title": "Requirement 10002 Clarification",
                "content": "This requirement 10002 requires you to do what is not required for requirement 10001. " +
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque " +
                    "laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi " +
                    "architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas " +
                    "sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione " +
                    "voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit " +
                    "amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut " +
                    "labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis " +
                    "nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea " +
                    "commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit " +
                    "esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas " +
                    "nulla pariatur?",
                "like": [123, 234],
                "comment": []
            },
            {
                "_id": 603,
                "userId": 234,
                "lastModified": new Date(2016, 1, 2, 12, 6, 23),
                "title": "Requirement 10002 Design",
                "content": "This design here will design how to do what is not required for requirement 10002. " +
                    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium " +
                    "voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint " +
                    "occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt " +
                    "mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et " +
                    "expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque " +
                    "nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas " +
                    "assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis " +
                    "debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et " +
                    "molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut " +
                    "reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores " +
                    "repellat.",
                "like": [],
                "comment": [2]
            },
            {
                "_id": 225,
                "userId": 456,
                "lastModified": new Date(2016, 1, 17, 10, 50, 36),
                "title": "Requirement 10001 Design",
                "content": "This is not only a design for requirement 10001; it is an artistic interpretation of it. " +
                    "Elit dapibus phasellus nonummy a erat aenean. Magna ante facilisi, scelerisque suspendisse " +
                    "quis at sem, ut lacinia orci lectus proin viverra. Taciti dolor hendrerit dictum et " +
                    "tortor, condimentum elit eu elit eros, vel volutpat enim hac felis, non vitae maecenas " +
                    "cras bibendum, adipiscing ad mattis. Vestibulum ut luctus, suspendisse montes amet elit, " +
                    "ac primis suspendisse elit faucibus rhoncus donec, aliquet per pharetra nunc. Ultricies " +
                    "magnis, praesent ullamcorper cubilia suspendisse massa tellus et, accumsan ipsum. Aliquam " +
                    "libero et purus arcu. Parturient eget, et erat faucibus tincidunt arcu nec curabitur, " +
                    "augue lorem, nibh ac. Et eu.",
                "like": [123, 456, 234],
                "comment": []
            },
            {
                "_id": 126,
                "userId": 567,
                "lastModified": new Date(2016, 0, 18, 10, 0, 1),
                "title": "Requirement 10003 Commands for the Masses",
                "content": "This list of commands here will command people to follow the commands of requirement 10003. " +
                    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium " +
                    "voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint " +
                    "occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt " +
                    "mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et " +
                    "expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque " +
                    "nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas " +
                    "assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis " +
                    "debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et " +
                    "molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut " +
                    "reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores " +
                    "repellat.",
                "like": [],
                "comment": []
            }
        ];

        var service = {
            getAllDocuments: getAllDocuments,
            updateDocumentById: updateDocumentById,
            addNewDocument: addNewDocument,
            getDocumentsModifiedByUserId: getDocumentsModifiedByUserId,
            deleteDocumentById: deleteDocumentById,
            rateDocument: rateDocument
        };
        return service;

        function getAllDocuments(callback) {
            return callback(documents);
        }

        function getDocumentsModifiedByUserId(userId, callback) {
            var foundDocuments = [];
            documents.forEach(function (document) {
               if (document.userId === userId) {
                   foundDocuments.push(document);
               }
            });
            return callback(foundDocuments);
        }

        function updateDocumentById(documentId, newDocument, callback) {
            for (var idx = 0; idx < documents.length; idx++) {
                if (documents[idx]._id === documentId) {
                    documents[idx].userId = newDocument.userId;
                    documents[idx].title = newDocument.title;
                    documents[idx].content = newDocument.content;
                    documents[idx].lastModified = newDocument.lastModified;
                    documents[idx].like = newDocument.like;
                    return callback(documents[idx]);
                }
            }
        }

        function addNewDocument(newDocument, callback) {
            newDocument._id = (new Date()).getTime();
            documents.push(newDocument);
            return callback(newDocument);
        }

        function deleteDocumentById(documentId) {
            var idx = -1;
            for (idx = 0; idx < documents.length; idx++) {
                if (documents[idx]._id === documentId) {
                    break;
                }
            }
            if (idx >= 0) {
                documents.splice(idx, 1);
            }
        }

        function rateDocument(documentId, userId, liked, callback) {
            for (var idx = 0; idx < documents.length; idx++) {
                if (documents[idx]._id === documentId) {
                    if (liked) {
                        documents[idx].like.push(userId);
                    } else {
                        for (var idy = 0; idy < documents[idx].like.length; idy++) {
                            if (documents[idx].like[idy] === userId) {
                                documents[idx].like.splice(idy, 1);
                                break;
                            }
                        }
                    }
                    return callback(documents[idx].like);
                }
            }
        }
    }
}());