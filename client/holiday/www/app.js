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

App.run(function ($location, $rootScope) {
    document.addEventListener("backbutton", function (e) {
        if ($location.path() == "/business") {
            e.preventDefault();
            navigator.app.exitApp();
        } else {
            $('.modal-backdrop').remove();
            navigator.app.backHistory();
        }

    }, false);

    $rootScope.admobid = {};
    if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
        $rootScope.admobid = {
            banner: 'ca-app-pub-xxx/xxx', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-1243068719441957/7002728227'
        };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
        $rootScope.admobid = {
            banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-xxx/kkk'
        };
    } else { // for windows phone
        $rootScope.admobid = {
            banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-xxx/kkk'
        };
    }
});
