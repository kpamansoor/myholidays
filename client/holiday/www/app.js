var App = angular.module('holiday', ['ui.router']);

App.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, send to /business
    $urlRouterProvider.otherwise("/business")

    $stateProvider
        .state('/', { //State demonstrating Nested views
            url: "/business",
            templateUrl: "pages/home.html",
            controller: "homeController"
        })
        .state('/settings', { //State demonstrating Nested views
            url: "/settings",
            templateUrl: "pages/settings.html",
            controller: "settingsController"
        })
        .state('/public_holiday', { //State demonstrating Nested views
            url: "/public_holiday",
            templateUrl: "pages/public_holiday.html",
            controller: "publicHolidayController"
        })
        .state('/comp_off', { //State demonstrating Nested views
            url: "/comp_off",
            templateUrl: "pages/comp_off.html",
            controller: "compOffController"
        })
        .state('/my_leaves', { //State demonstrating Nested views
            url: "/my_leaves",
            templateUrl: "pages/my_leaves.html",
            controller: "myLeavesController"
        });
}]);

App.run(function ($location) {
    document.addEventListener("backbutton", function (e) {
        if ($location.path() == "/business") {
            e.preventDefault();
            navigator.app.exitApp();
        } else {
            $('.modal-backdrop').remove();
            navigator.app.backHistory();
        }

    }, false);
});
