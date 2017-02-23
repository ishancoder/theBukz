angular.module('theBukz')
    .controller('manageBooksController', function($scope, Auth, Books) {
        $scope.books = "";
        Books.getAllBooksFromUserId(Auth.$getAuth().uid,function(books) {
            $scope.books = books;
        });
        // edit book modal
          
        var bookId = "";
        $scope.myBookId=function(event_id){
            bookId = event_id;
        };
        $scope.myPreBook= function(event_id){
            console.log("book id");
            console.log(event_id);
            bookId = event_id;
            //console.log(Books.getBook(event_id));
         Books.preBook(event_id,function callback(bookObject){
                $scope.bookObject = bookObject;
                $scope.bookName = bookObject.bookName,
                $scope.authorName = bookObject.authorName,
                $scope.publication = bookObject.publication;
                $scope.price = bookObject.price;
                $scope.edition = bookObject.edition;
                $scope.imageUrl= bookObject.imageUrl;
                $scope.error="";
         });
        }
        $scope.deleteBook = function(){
            if (bookId != ""){
                Books.removeBook(Auth.$getAuth().uid,bookId);
            }
    else{
        console.log("Ooops ");
    }
        };
         
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
        
        console.log("book object");
     
     $scope.editBukz=function(){
             if($scope.bookName && $scope.authorName && $scope.publication && $scope.price  && $scope.edition ) {
                 console.log("Iam in edit if loop")
                var obj = {
                    bookName: $scope.bookName,
                    authorName: $scope.authorName,
                    publication: $scope.publication,
                    price: $scope.price,
                    edition:$scope.edition,
                    imageUrl:downloadUrl,
                    userId:Auth.$getAuth().uid,
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