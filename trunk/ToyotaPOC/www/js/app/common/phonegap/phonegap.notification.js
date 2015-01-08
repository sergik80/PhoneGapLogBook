angular.module('phonegap.notification', [])
.factory('NotificationService', ['$rootScope', function ($rootScope) {
    return {
        alert: function (message, title, buttonText, buttonAction) {
            navigator.notification.alert(message,
                function () {
                    if (buttonAction && typeof buttonAction == 'function') {
                        $rootScope.$apply(function () {
                            buttonAction();
                        })
                    }
                },
                title,
                buttonText);
        }
    }
}]);
