angular.module("theBukz")
    .controller('registerController', function(Auth, $scope, $state, Users) {
        googleObj = Auth.$getAuth();
        
        $scope.userPicture = googleObj.photoURL;
        $scope.userName = googleObj.displayName;
        $scope.userCity = "";
        $scope.userAddress = "";
        $scope.userPhone = "";
        $scope.error = "";

        $scope.register = function() {
            console.log("register..");
            if($scope.userName && $scope.userCity && $scope.userAddress && $scope.userPhone) {
                var obj = {
                    userName: googleObj.displayName,
                    userCity: $scope.userCity,
                    userAddress: $scope.userAddress,
                    userPhone: $scope.userPhone,
                    userPicture: googleObj.photoURL
                }

                Users.updateProfile(googleObj.uid, obj);
                $state.go('home');
            } else {
                $scope.error = "Please fill all the entries!";
            }
        }
    });