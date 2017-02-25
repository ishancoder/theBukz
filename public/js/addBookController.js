angular.module('theBukz')
    .controller("addBookController",function(Auth,$scope, $state, Books){
      googleObj = Auth.$getAuth();
       $scope.bookPicture ="";
        $scope:userId="";
        $scope.bookName = "";
        $scope.authorName = "";
        $scope.publication = "";
        $scope.price = "";
        $scope.edition = "";
        $scope.imageUrl="";
        $scope.error="";
        $scope.downloadUrl= "";

        $scope.hideAddBook=function(){
            $scope.isDisabled = true;
        };

        $scope.file_changed = function(element) {
         $scope.$apply(function(scope) {
            var photofile = element.files[0];
            Books.uploadImage(photofile, function(url) {
                $scope.downloadUrl = url;
            });
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#blah')
                        .attr('src', e.target.result)
                        .width(200)
                        .height(200);
            };
            reader.readAsDataURL(photofile);
            });
        };

        $scope.addbukz= function(){
            console.log("add books........");
             if($scope.bookName && $scope.authorName && $scope.publication && $scope.price  && $scope.edition &&googleObj.uid ) {
                 console.log("Iam in if loop")
                var obj = {
                    bookName: $scope.bookName,
                    authorName: $scope.authorName,
                    publication: $scope.publication,
                    price: $scope.price,
                    edition:$scope.edition,
                    imageUrl: $scope.downloadUrl,
                    userId:googleObj.uid,
                };
                Books.addBook(obj, googleObj.uid,function(){
                    $state.go("manageBooks");
                });
            } else {
                $scope.error = "Please fill all the entries!";
            }
        }
    });