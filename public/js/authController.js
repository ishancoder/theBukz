angular.module('theBukz')
    .controller('authController', function($scope, $state, Auth) {
        $scope.userCredential = null;
        $scope.signUpError = null;
        
        $scope.signInWithGoogle = function() {
            console.log("Signing in....");
            Auth.$signInWithPopup("google").catch(function(err) {
                console.log("Error :", err);
                $scope.signUpError = err;
            });
        };

        Auth.$onAuthStateChanged(function(firebaseUser) {
            if(firebaseUser) {
                console.log(firebaseUser.uid);
            } else {
                console.log("Sign Out!");
            }
        });

        $scope.getAuth = Auth.$getAuth;

        $scope.signOut = Auth.$signOut;
    });