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
        });
}]);
