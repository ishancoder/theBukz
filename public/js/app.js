(function() {
    var app = angular.module("theBukz", ['ui.router', 'firebase']);

    app.config(function($stateProvider, $urlRouterProvider) {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAxsLrH4d5FTGAOkOnwIcoL6TsTFKNIfSg",
            authDomain: "thebukz-4e719.firebaseapp.com",
            databaseURL: "https://thebukz-4e719.firebaseio.com",
            storageBucket: "thebukz-4e719.appspot.com",
            messagingSenderId: "890378695485"
        };
        firebase.initializeApp(config);

        //routes
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'homeController'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/register.html',
                controller: 'registerController',
                resolve: {
                    auth: function(Auth, $state) {
                        return Auth.$requireSignIn().catch(function() {
                            $state.go("home");
                        });
                    }
                }
            })
            .state('bookinfo', {
                url: '/book/{bookId}',
                templateUrl: '/book.html',
                controller: 'bookController'
            })
            .state('addbukz',{
                url:"/addbukz",
                templateUrl:"/addBook.html",
                controller:'addBookController',
                  resolve: {
                    auth: function(Auth, $state) {
                        return Auth.$requireSignIn().catch(function() {
                            $state.go("home");
                        });
                    }
                }
            })
            .state('manageBooks', {
                url: '/dashboard/manage-books',
                templateUrl: '/manage-books.html',
                controller: 'manageBooksController',
                resolve: {
                    auth: function(Auth, $state) {
                        return Auth.$requireSignIn().catch(function() {
                            $state.go("home");
                        });
                    }
                }
            })
            .state('about', {
                url: '/about',
                templateUrl: '/about.html',
            });

        $urlRouterProvider.otherwise('home');
    });

    app.controller('homeController', function($scope, $firebaseAuth) {

    });

    app.factory('Auth', function($firebaseAuth) {
        return $firebaseAuth();
    });

})();