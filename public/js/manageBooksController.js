angular.module('theBukz')
    .controller('manageBooksController', function ($scope, Auth, Books) {
        $scope.books = [];
        $scope.bookAboutToDelete = null;

        // edit book modal
        Books.getAllBooksFromUserId(Auth.$getAuth().uid, function (books) {
            $scope.books = books;
        });
        $scope.deleteBook = function (bookid) {
            $scope.bookAboutToDelete = bookid;
        };
        $scope.myPreBook = function (event_id) {
            console.log("book id");
            console.log(event_id);
            bookId = event_id;
            //console.log(Books.getBook(event_id));
            Books.preBook(event_id, function callback(bookObject) {
                $scope.bookObject = bookObject;
                $scope.bookName = bookObject.bookName,
                    $scope.authorName = bookObject.authorName,
                    $scope.publication = bookObject.publication;
                $scope.price = bookObject.price;
                $scope.edition = bookObject.edition;
                $scope.imageUrl = bookObject.imageUrl;
                $scope.bookPicture = bookObject.imageUrl;
                $scope.pages = bookObject.pages;
                $scope.binding = bookObject.binding;
                $scope.isbn = bookObject.isbn;
                $scope.descriptions = bookObject.descriptions;
                $scope.error = "";
            });
        }
        $scope.deleteBookConfirm = function () {
            var uid = Auth.$getAuth().uid;
            if ($scope.bookAboutToDelete && uid) {
                Books.removeBook(uid, $scope.bookAboutToDelete, function () {
                    Books.getAllBooksFromUserId(uid, function (books) {
                        $scope.books = books;
                    });
                });
                $scope.bookAboutToDelete = null;
            } else {
                console.log("Authentication required for deletion.");
            }
        };

        var downloadUrl = "";
        $scope.file_changed = function (element) {
            $scope.$apply(function (scope) {
                var photofile = element.files[0];
                Books.uploadImage(Auth.$getAuth().uid, photofile, function (snapshot) {
                    downloadUrl = snapshot;
                });
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#blah')
                        .attr('src', e.target.result)
                        .width(150)
                        .height(200);
                };
                reader.readAsDataURL(photofile);
            });
        };

        $scope.editBukz = function () {
            if ($scope.bookName && $scope.authorName && $scope.publication && $scope.price && $scope.edition && $scope.pages) {
                var obj = {
                    bookName: $scope.bookName,
                    authorName: $scope.authorName,
                    publication: $scope.publication,
                    price: $scope.price,
                    edition: $scope.edition,
                    imageUrl: downloadUrl,
                    pages: $scope.pages,
                    binding: $scope.binding,
                    isbn: $scope.isbn,
                    descriptions: $scope.descriptions,

                    userId: Auth.$getAuth().uid,
                };
                console.log(obj);
                if (bookId != "") {
                    console.log(bookId);
                    Books.updateBook(obj, bookId);
                }
            } else {
                $scope.error = "Please fill all the entries!";
            }
        };
        $scope.cancel = function () {
            //  $modalInstance.close();
        };
    });