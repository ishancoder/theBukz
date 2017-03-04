angular.module('theBukz')
    .controller('authController', function($scope, $state, Auth, Users) {
        $scope.userCredential = null;
        $scope.signUpError = null;
        $scope.displayName = "";
        
        $scope.signInWithGoogle = function() {
            Auth.$signInWithRedirect("google")
            .catch(function(err) {
                console.log("Error :", err);
                $scope.signUpError = err;
            });
        };
        
        $scope.signInWithFacebook = function() {
            Auth.$signInWithRedirect("facebook").catch(function(err) {
                console.log("Error :", err);
                $scope.signUpError = err;
            });
        };

        Auth.$onAuthStateChanged(function(firebaseUser) {
            if(firebaseUser) {
                $scope.displayName = firebaseUser.displayName;
                Users.getProfile(firebaseUser.uid).$loaded()
                    .then(function(data) {
                        if(!data.userName) {
                            $state.go('register');
                        }
                    })
                    .catch(function(err) {
                        console.log("Error :", err);
                    })
            } else {
                console.log("Sign Out!");
                $scope.displayName = "";
                $state.go('home');
            }
        });

        $scope.getAuth = Auth.$getAuth;

        $scope.signOut = Auth.$signOut;
    });