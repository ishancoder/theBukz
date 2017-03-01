angular.module('theBukz')
    .controller("addBookController", function(Auth, $scope, $state, Books) {
        googleObj = Auth.$getAuth();
        $scope.bookPicture = "";
        $scope: userId = "";
        $scope.bookName = "";
        $scope.authorName = "";
        $scope.publication = "";
        $scope.price = "";
        $scope.edition = "";
        $scope.imageUrl = "";
        $scope.downloadUrl = "";
        $scope.pages = "";
        $scope.binding = "";
        $scope.isbn = "";
        $scope.descriptions = "";
        $scope.error = "";

        $scope.hideAddBook = function() {
            $scope.isDisabled = true;
        };

        $scope.file_changed = function(element) {
            $scope.$apply(function(scope) {
                var photofile = element.files[0];
                Books.uploadImage(Auth.$getAuth().uid,photofile, function(url) {
                    $scope.downloadUrl = url;
                });
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#add-book-img-upload').attr('src', e.target.result).width(200).height(200);
                };
                reader.readAsDataURL(photofile);
            });
        };

        $scope.addbukz = function() {
            if ($scope.bookName && $scope.authorName && $scope.publication && $scope.price && $scope.edition && googleObj.uid && $scope.isbn && $scope.pages && $scope.descriptions && $scope.binding) {
                var obj = {
                    bookName: $scope.bookName,
                    authorName: $scope.authorName,
                    publication: $scope.publication,
                    price: $scope.price,
                    edition: $scope.edition,
                    imageUrl: $scope.downloadUrl,
                    pages: $scope.pages,
                    binding: $scope.binding,
                    isbn: $scope.isbn,
                    descriptions: $scope.descriptions,
                    userId: googleObj.uid,
                };
                Books.addBook(obj, googleObj.uid, function() {
                    $state.go("manageBooks");
                });
            } else {
                $scope.error = "Please fill all the entries!";
            }
        }
    });