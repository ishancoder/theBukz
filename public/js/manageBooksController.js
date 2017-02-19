angular.module('theBukz')
    .controller('manageBooksController', function($scope, Auth, Books) {
        $scope.books = "";
        Books.getAllBooksFromUserId(Auth.$getAuth().uid,function(books) {
            $scope.books = books;
        });
        // edit book modal
        var bookId = "";
        $scope.myBookId = function(event_id){
            console.log("book id");
            console.log(event_id);
            bookId = event_id;
            console.log(Books.getBook(event_id));
        }
        $scope.deleteBook = function(bookId){
            if (bookId != ""){
                Books.removeBook(Auth.$getAuth().uid,bookId);
            }
    else{
        console.log("Ooops ");
    }
        };
            $scope.bookName = "aaa",
         $scope.authorName = "dsd",
         $scope.publication = "ddddd";
         $scope.price = 89;
         $scope.edition = "sdfasdf";
         $scope.error="";
        var self = this;
        $scope.editBook=function(unique_book_id){
         var bookObject = Books.getBook(unique_book_id);
        console.log("book object");
        console.log(bookObject);
         $scope.bookName = bookObject.bookName,
         $scope.authorName = bookObject.authorName,
         $scope.publication = bookObject.publication;
         $scope.price = bookObject.price;
         $scope.edition = bookObject.edition;
         $scope.imageUrl= bookObject.imageUrl;
         $scope.error="";
         var downloadUrl= "";
         $scope.file_changed = function(element) {
         $scope.$apply(function(scope) {
         var photofile = element.files[0];
         Books.uploadImage(photofile, function(snapshot) {
             downloadUrl = snapshot;
         });
         var reader = new FileReader();
         reader.onload = function(e) {
         };
         reader.readAsDataURL(photofile);
        });
        };
        };
        //var bookObject = Books.getBook(bookId);
        console.log("book object");
        //console.log(bookObject);
     
     $scope.editBukz=function(){
             if($scope.bookName && $scope.authorName && $scope.publication && $scope.price  && $scope.edition ) {
                 console.log("Iam in edit if loop")
                var obj = {
                    bookName: $scope.bookName,
                    authorName: $scope.authorName,
                    publication: $scope.publication,
                    price: $scope.price,
                    edition:$scope.edition,
                };
                console.log(obj);
                if(bookId!=""){
                    console.log("book id maje le rhi h");
                    console.log(bookId);
                Books.updateBook(obj,bookId);
                }
            } else {
                $scope.error = "Please fill all the entries!";
            }
         };
    });