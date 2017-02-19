angular.module("theBukz")
    .factory('Books', function($firebaseObject, $firebaseArray) {
        var bookRef = firebase.database().ref('books');
        var bookImageRef = firebase.storage().ref('bookImage');
        var userBooks = firebase.database().ref('userBooks');
        var bookArray = $firebaseArray(bookRef);
        var bookSnapshot;
        var bookId;
        var Book = {
           
            getAllBooksFromUserId:function(uid, callback){
                var bookArray = $firebaseArray(userBooks.child(uid)).$loaded();
                var self= this;
                bookArray.then(function(bookArray) {
                    var books = [];
                    for(var i=0; i < bookArray.length; i++) {
                        var bookId = bookArray[i];
                        books.push(self.getBook(bookId.$value));
                    }   
                    console.log(books);
                    callback(books);
                });
            },
            removeBook:function(uid,bookId){
             bookRef.child(bookId).remove();
               //var book=  $firebaseArray(bookRef.child(bookId)).$loaded();
             var bookArray = $firebaseArray(userBooks.child(uid)).$loaded();
             var userBookId;
             bookArray.then(function(bookArray){
                    for(var i= 0; i<bookArray.length ; i++){
                        var bookValue = bookArray[i];
                        if (bookValue.$value==bookId){
                            userBookId=bookValue.$id;
                        }
                    }
                userBooks.child(uid).child(userBookId).remove();
             });
            },
            updateBook:function(newValue,bookId){
                bookRef.child(bookId).set(newValue);
            },
            getAllBook:function(){
                return $firebaseObject(bookRef);
            },
            getBook: function(bookId) {
                return $firebaseObject(bookRef.child(bookId));
            },
            addBook:function(newValue, uid){
             var ref = bookRef.push();
             bookId = ref.key;
             var self = this;
             ref.set(newValue).then(function() {
                 self.addUserBook(uid);
             });
            },
             addUserBook:function(uid){
                 var userBookArray = $firebaseArray(userBooks.child(uid));
                 userBookArray.$add(bookId);
            },
            uploadImage:function(file, callback){
                bookImageRef.child(file.name).put(file).on('state_changed',
                    function progress(snapshot) {
                        bookSnapshot = snapshot;
                        console.log(snapshot.downloadURL);
                    },

                    function error(err) {
                        console.error(err);
                    },

                    function complete() {
                        callback(bookSnapshot.downloadURL);
                        console.log("Completed uploading!");
                        
                    }
                );
            }
        };
        return Book;
    });