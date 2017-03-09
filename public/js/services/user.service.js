angular.module("theBukz")
    .factory('Users', function($firebaseObject, $firebaseArray) {
        var userRef = firebase.database().ref('users');
        var userArray = $firebaseArray(userRef);

        var User = {
            getProfile: function(uid) {
                return $firebaseObject(userRef.child(uid));
            },
            updateProfile: function(uid, newValue) {
                userRef.child(uid).set(newValue);
            }
        };

        return User;
    });