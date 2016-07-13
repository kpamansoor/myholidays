App.controller('appController', function ($scope) {

    $scope.serverUrl = "http://localhost:3000/";
    $scope.loader = false;

    $scope.infoSuccess = humane.create({
        baseCls: 'humane-jackedup',
        addnCls: 'humane-jackedup-success'
    });
    $scope.infoError = humane.create({
        baseCls: 'humane-jackedup',
        addnCls: 'humane-jackedup-error'
    });
    $scope.infoWarn = humane.create({
        baseCls: 'humane-jackedup',
        addnCls: 'humane-jackedup-warning'
    });

});
App.controller('homeController', function ($scope) {

});

App.controller('settingsController', function ($scope, $http) {

    $scope.countryList = [];

    $scope.init = function () {
        $scope.loader = true;
        var data = {};
        var config = {
            headers: {}
        }
        $http.get($scope.serverUrl + 'getCountryList', data, config)
            .success(function (data, status, headers, config) {
                $scope.countryList = data;
                $scope.loader = false;
            })
            .error(function (data, status, header, config) {
                $scope.loader = false;
                $scope.infoError.log("Unable to fetch details");
            });
    }
    $scope.update_country_list = function () {
        $scope.loader = true;

    }

});
