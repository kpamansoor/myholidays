App.controller('appController', function ($scope, $rootScope) {

    $rootScope.serverUrl = "http://localhost:3000/";
    //    $scope.serverUrl = "http://13.92.189.238:3000/";
    $rootScope.loader = false;
    $rootScope.titletext = "";

    $rootScope.infoSuccess = humane.create({
        baseCls: 'humane-jackedup',
        addnCls: 'humane-jackedup-success'
    });
    $rootScope.infoError = humane.create({
        baseCls: 'humane-jackedup',
        addnCls: 'humane-jackedup-error'
    });
    $rootScope.infoWarn = humane.create({
        baseCls: 'humane-jackedup',
        addnCls: 'humane-jackedup-warning'
    });

});
App.controller('homeController', function ($scope, $rootScope) {
    $rootScope.titletext = "";
});

App.controller('settingsController', function ($scope, $http, $rootScope) {
    $rootScope.titletext = "Settings";
    $scope.countryList = [];
    $scope.country = "";

    $scope.init = function () {
        $rootScope.loader = true;
        var data = {};
        var config = {
            headers: {}
        }
        $http.get($rootScope.serverUrl + 'getCountryList', data, config)
            .success(function (data, status, headers, config) {
                $scope.countryList = data;
                $rootScope.loader = false;
            })
            .error(function (data, status, header, config) {
                $rootScope.loader = false;
                $rootScope.infoError.log("Unable to fetch details");
            });
    }

    $scope.update_country_list = function () {
        $rootScope.loader = true;
        var config = {
            headers: {}
        }
        $http.get($rootScope.serverUrl + 'getHolidayList?country=' + $scope.country + '&year=' + new Date().getFullYear(), config)
            .success(function (data, status, headers, config) {
                localStorage.setItem("holiday_list", JSON.stringify(data));
                localStorage.setItem("country", $scope.country + "(" + new Date().getFullYear() + ")");
                $rootScope.loader = false;
                $rootScope.infoSuccess.log("Holiday list updated");
            })
            .error(function (data, status, header, config) {
                $scope.loader = false;
                $scope.infoError.log("Unable to fetch details");
            });
    }

});

App.controller('publicHolidayController', function ($scope, $http, $rootScope) {
    $rootScope.titletext = "Public holiday - " + localStorage.getItem("country");
    $scope.holidays = JSON.parse(localStorage.getItem("holiday_list"));

    $scope.select = function (id) {
        $scope.selected = $scope.holidays[id];
    }

});

App.controller('compOffController', function ($scope, $http, $rootScope) {
    $rootScope.titletext = "Comp Off";
    $scope.compoff = JSON.parse(localStorage.getItem("comp_off"));
    if ($scope.compoff != null && $scope.compoff.length > 0)
        $rootScope.titletext = "Comp Off ( total " + $scope.compoff.length + " )";

    $scope.date = "";
    $scope.comment = "";
    $scope.delete_item = "";

    // Setting date field max to today
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    $('#comp_date').attr('max', maxDate);


    $scope.add_comp_of = function (id) {

        var duplicate = false;
        var d = ($scope.date + "").split('00:00:00')[0].trim();

        $scope.comp_off = JSON.parse(localStorage.getItem("comp_off"));
        if ($scope.comp_off == null)
            $scope.comp_off = [];

        for (i = 0; i < $scope.comp_off.length; i++) {
            if ($scope.comp_off[i].date == d) {
                duplicate = true;
                break;
            }
        }
        if (duplicate) {
            $scope.infoError.log("Date already added");
        } else {
            $scope.comp_off.push({
                "date": d,
                "comment": $scope.comment
            });
            localStorage.setItem("comp_off", JSON.stringify($scope.comp_off));
            $scope.infoSuccess.log("Comp off added");
            $scope.compoff = JSON.parse(localStorage.getItem("comp_off"));
            $rootScope.titletext = "Comp Off ( total " + $scope.compoff.length + " )";
            $('#add_comp_off').modal('toggle');
        }

    }

    $scope.delate = function (index) {
        $scope.delete_item = index;
    }
    $scope.confirm_delate = function () {

        $scope.compoff = JSON.parse(localStorage.getItem("comp_off"));
        $scope.compoff.splice($scope.delete_item, 1);
        localStorage.setItem("comp_off", JSON.stringify($scope.compoff));
        $scope.infoSuccess.log("Comp off deleted");
        $scope.compoff = JSON.parse(localStorage.getItem("comp_off"));
        $rootScope.titletext = "Comp Off ( total " + $scope.compoff.length + " )";
        $('#del_comp_off').modal('toggle');
    }

});
