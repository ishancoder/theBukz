angular.module("theBukz")
    .factory('Users', function($firebaseObject, $firebaseArray) {
        /********************
         * Firebase Reference
         ********************/
        var userRef = firebase.database().ref('users');
        var userArray = $firebaseArray(userRef);

        var User = {

            /*******************
             * Function to get user profile
             * @param{id} uid
             *******************/
            getProfile: function(uid) {
                return $firebaseObject(userRef.child(uid));
            },

            /*******************
             * Function to update user profile
             * @param{id} uid
             * @param{object} newValue
             *******************/
            updateProfile: function(uid, newValue) {
                userRef.child(uid).set(newValue);
            }
            
        };

        return User;
    });