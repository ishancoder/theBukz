angular.module("theBukz")
    .factory('Books', function($firebaseObject, $firebaseArray) {
        var bookRef = firebase.database().ref('books');
        var bookImageRef = firebase.storage().ref('bookImage');
        var bookArray = $firebaseArray(bookRef);

        var Book = {
            getAllBooks:function(){
                return $firebaseArray(bookRef);
            },
            getBook: function(uid) {
                return $firebaseObject(userRef.child(uid));
            },
            addBook:function(newValue){
                bookRef.push().set(newValue);
            },
            uploadImage:function(uid,file){
                bookImageRef.child(uid).put(file).then(function(snapshot){
                    console.log(snapshot);
                });
            }
        };
        return Book;
    });