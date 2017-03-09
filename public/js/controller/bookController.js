angular.module("theBukz")
    .controller("bookController", function($scope, $stateParams, Auth, Books, Users) {
        $scope.book = "";
        $scope.owner = "";

        Books.getBook($stateParams.bookId).$loaded().then(function(book) {
            $scope.book = book;
            Users.getProfile(book.userId).$loaded().then(function(userInfo){
                $scope.owner = userInfo;
            });
        });
    });