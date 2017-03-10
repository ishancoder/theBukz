angular.module('theBukz')
    .controller('homeController', function($scope, Auth, Books) {
        $scope.books = Books.getAllBooks();
    });