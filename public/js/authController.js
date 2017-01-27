angular.module('theBukz')
    .controller('authController', function($scope, $state, Auth, Users) {
        $scope.userCredential = null;
        $scope.signUpError = null;
        $scope.displayName = "";
        
        $scope.signInWithGoogle = function() {
            console.log("Signing in....");
            Auth.$signInWithRedirect("google")
            .catch(function(err) {
                console.log("Error :", err);
                $scope.signUpError = err;
            });
        };
        
        $scope.signInWithFacebook = function() {
            console.log("Signing in....");
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
                        console.log(data);
                        if(data.userName) {
                            console.log("logged in");
                        } else {
                            $state.go('register');
                        }
                    })
                    .catch(function(err) {
                        console.log("Error :", err);
                    })
            } else {
                console.log("Sign Out!");
                $scope.displayName = "";
            }
        });

        $scope.getAuth = Auth.$getAuth;

        $scope.signOut = Auth.$signOut;
    });