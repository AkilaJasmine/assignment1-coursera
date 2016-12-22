(function() {
    'use strict';
    angular.module("lunchCheck", [])
        .controller("lunchCheckController", lunchCheckController);
    lunchCheckController.$inject = ['$scope'];

    function lunchCheckController($scope) {
        $scope.validateInput = function() {
                $scope.msg = "";
                var isEmptyInput = checkIsEmpty($scope.items);

                if (isEmptyInput == false) {
                    $scope.msgClass = "error";
                    $scope.textBorder = "textBoxError";
                    $scope.msg = "Please Enter Data First!";
                } else {
                    var listOfItems = $scope.items.split(",");
                    if (listOfItems.length > 0) {
                        itemsCountCheck(checkValidInput(listOfItems));
                    }
                }
            }
            // function to check whether entered input is empty or not.
        function checkIsEmpty(input) {
            if (input == undefined) {
                return false;
            } else {
                return true;
            }
        }
        // function to check the input has only alphabets. i.e, it wont consider an input as valid if the input has special characters and numbers.
        // E.g: Valid - Choco Pie,Apple Invalid - , , 6523978,;'.<>?'
        function checkValidInput(listOfItems) {
            var pattern = /^[a-z]+\s*[a-z]+$/i;
            var count = listOfItems.length;
            for (var i = 0; i < listOfItems.length; i++) {
                var str = trim(listOfItems[i]);
                if (str != "") {
                    listOfItems[i] = str;
                }
                if (listOfItems[i] == "" || !pattern.test(listOfItems[i])) {
                    count--;
                }
            }
            return count;
        }
        // function to trim the input.
        function trim(str) {
            return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        }
        // function to display the message based on the no of items.
        function itemsCountCheck(count) {
            if (count == 0) {
                $scope.msgClass = "error";
                $scope.textBorder = "textBoxError";
                $scope.msg = "Please enter valid input";
            } else if (count > 0 && count <= 3) {
                $scope.msgClass = "valid";
                $scope.textBorder = "textBoxValid";
                $scope.msg = "Enjoy!";
            } else {
                $scope.msgClass = "valid";
                $scope.textBorder = "textBoxValid";
                $scope.msg = "Too Much!";
            }
        }
    };
})();