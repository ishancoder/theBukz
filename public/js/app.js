(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAxsLrH4d5FTGAOkOnwIcoL6TsTFKNIfSg",
        authDomain: "thebukz-4e719.firebaseapp.com",
        databaseURL: "https://thebukz-4e719.firebaseio.com",
        storageBucket: "thebukz-4e719.appspot.com",
        messagingSenderId: "890378695485"
    };
    firebase.initializeApp(config);

    var app = angular.module("theBukz", ['ui.router']);

    app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'homeController'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: '/dashboard.html',
                controller: 'dashboardController'
            })
            .state('aboutus', {
                url: '/aboutus',
                templateUrl: '/aboutus.html',
                controller: 'aboutusController'
            });

        $urlRouterProvider.otherwise('home');
    });

    app.controller('homeController', function() {
        
    });

})();