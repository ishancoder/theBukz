angular.module("theBukz")
    .factory('Books', function($firebaseObject, $firebaseArray) {
        var bookRef = firebase.database().ref('books');
        var bookImageRef = firebase.storage().ref('bookImage');
        var userBooks = firebase.database().ref('userBooks');
        var bookArray = $firebaseArray(bookRef);
        var bookSnapshot;
        var bookId;
        var imageId;
        var Book = {
            getAllBooks: function() {
                return $firebaseArray(bookRef);
            },

            getAllBooksFromUserId: function(uid, callback) {
                var bookArray = $firebaseArray(userBooks.child(uid)).$loaded();
                var self = this;
                bookArray.then(function(bookArray) {
                    var books = [];
                    books.dataDifferenceArray = [];
                    for (var i = 0; i < bookArray.length; i++) {
                        var bookId = bookArray[i];

                        books.push(self.getBook(bookId.$value));
                    }
                    callback(books);
                });
            },
            removeBook: function(uid, bookId, callback) {
                bookRef.child(bookId).remove().then(function() {
                    var bookArray = $firebaseArray(userBooks.child(uid)).$loaded();
                    var userBookId;
                    bookArray.then(function(bookArray) {
                        for (var i = 0; i < bookArray.length; i++) {
                            var bookValue = bookArray[i];
                            if (bookValue.$value == bookId) {
                                userBooks.child(uid).child(bookValue.$id).remove().then(function() {
                                    callback();
                                });
                                break;
                            }
                        }
                    });
                });
            },
            updateBook: function(newValue, bookId) {
                bookRef.child(bookId).set(newValue);
            },
            getAllBook: function() {
                return $firebaseObject(bookRef);
            },
            preBook: function(bookId, callback) {
                var object = this.getBook(bookId).$loaded();
                object.then(function(object) {
                    callback(object);
                });

            },
            getBook: function(bookId) {
                return $firebaseObject(bookRef.child(bookId));
            },
            addBook: function(newValue, uid, callback) {
                var ref = bookRef.push();
                bookId = ref.key;
                var self = this;
                ref.set(newValue).then(function() {
                    self.addUserBook(uid, callback);
                });
            },
            addUserBook: function(uid, callback) {
                var userBookArray = $firebaseArray(userBooks.child(uid));
                userBookArray.$add(bookId).then(
                    function() {
                        callback();
                    }
                );
            },
            uploadImage: function(uid, file, callback) {
                imageId = file.name;
                var random = Math.floor((Math.random() * 1000000) + 1);
                var effectiveImagePath = uid + "/" + random.toString() + file.name;
                var downloadURL = "";
                var imageStorageRef = bookImageRef.child(effectiveImagePath);
                imageStorageRef.put(file).on('state_changed',
                    function progress(snapshot) {
                        bookSnapshot = snapshot;
                        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        uploader.value = percentage;
                        downloadURL = snapshot.downloadURL;
                    },

                    function error(err) {
                        console.error(err);
                    },

                    function complete() {
                        console.log("Completed uploading!");
                        imageStorageRef.getDownloadURL().then(function(url) {
                            callback(url);
                        });
                    }
                );
            },
            removeImage: function(imageUrl) {
                var imageRef = firebase.storage().refFromURL(imageUrl);
                imageRef.child(imageId).delete().then(function() {
                    console.log("deleted succesfully");
                }).catch(function() {
                    console.log(error);
                });
            }
        };
        return Book;
    });