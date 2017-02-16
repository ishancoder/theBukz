angular.module('theBukz')
    .controller("addBookController",function(Auth,$scope, $state, Books){
    console.log("chal ja kute");
      googleObj = Auth.$getAuth();
       $scope.bookPicture ="";
        $scope:userId="";
        $scope.bookName = "";
        $scope.authorName = "";
        $scope.publication = "";
        $scope.price = "";
        $scope.edition = "";
        $scope.error="";
        $scope.file_changed = function(element) {
         $scope.$apply(function(scope) {
         var photofile = element.files[0];
         var reader = new FileReader();
         reader.onload = function(e) {
            console.log("readerdddddddddddddd" +reader);
            console.log("photo"+photofile);
         };
         reader.readAsDataURL(photofile);
         console.log("photo"+photofile);
        });
        };
        $scope.addbukz= function(){
            console.log("add books........");
             if($scope.bookName && $scope.authorName && $scope.publication && $scope.price && $scope.price && $scope.edition &&googleObj.uid) {
                 console.log("Iam in if loop")
                var obj = {
                    bookName: $scope.bookName,
                    authorName: $scope.authorName,
                    publication: $scope.publication,
                    price: $scope.price,
                    edition:$scope.edition,
                    userId:googleObj.uid,
                }
                console.log("object"+obj);
                Books.addBook(obj);
            } else {
                $scope.error = "Please fill all the entries!";
            }
        }
    });