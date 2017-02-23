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
           
            getAllBooksFromUserId:function(uid, callback){
                var bookArray = $firebaseArray(userBooks.child(uid)).$loaded();
                var self= this;
                bookArray.then(function(bookArray) {
                    var books=[];
                    books.dataDifferenceArray = [];
                    //$scope.books = [];
                    for(var i=0; i < bookArray.length; i++) {
                        var bookId = bookArray[i];

                        books.push(self.getBook(bookId.$value));
                    }   
                    console.log(books);
                    callback(books);
                });
            },
            removeBook:function(uid,bookId){
                var self = this;
                console.log("book Id remove");
                console.log(bookId);
                var objectBook = self.getBook(bookId);
                console.log(objectBook);
                for(var i=0;i<objectBook.length;i++){
                    var obk = objectBook[i];
                    console.log(obk);
                }
           console.log(obk);
           //this.removeImage(obk.imageUrl);
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
                console.log("userBookId");
                console.log(userBookId);
                userBooks.child(uid).child(userBookId).remove();
             });
            },
            updateBook:function(newValue,bookId){
                console.log("new value");
                console.log(newValue);
                bookRef.child(bookId).set(newValue);
            },
            getAllBook:function(){
                return $firebaseObject(bookRef);
            },
            preBook:function(bookId,callback){
                var object = this.getBook(bookId).$loaded();
                object.then(function(object){
                        callback(object);
                });
                
            },
            getBook: function(bookId) {
                return $firebaseObject(bookRef.child(bookId));
            },
            addBook:function(newValue, uid,callback){
             var ref = bookRef.push();
             bookId = ref.key;
             var self = this;
             ref.set(newValue).then(function() {
                 self.addUserBook(uid,callback);
             });
            },
             addUserBook:function(uid,callback){
                 var userBookArray = $firebaseArray(userBooks.child(uid));
                 userBookArray.$add(bookId).then(
                     function(){
                         callback();
                     }
                 );
            },
            uploadImage:function(file, callback){
                imageId = file.name;
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
            },
            removeImage:function(imageUrl){
              console.log("imageUrl");
              console.log(imageUrl);
              var imageRef = firebase.storage().refFromURL(imageUrl);
                imageRef.child(imageId).delete().then(function(){
                    console.log("deleted succesfully");
                }).catch(function(){
                    console.log(error);
                });
            }
        };
        return Book;
    });