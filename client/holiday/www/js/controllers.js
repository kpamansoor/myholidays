App.controller('appController', function ($scope, $rootScope) {

    $rootScope.serverUrl = "http://localhost:3000/";
    //    $rootScope.serverUrl = "http://13.92.189.238:3000/";
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
    $scope.question = "";
    $scope.answer;
    $scope.confirm_button = false;
    $scope.answer_entered = "";

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
    $scope.validate_answer = function () {
        if ($scope.answer == $scope.answer_entered)
            $scope.confirm_button = true;
    }
    $scope.clear_myleaves = function () {
        localStorage.removeItem("my_leaves");
        $('#clear_myleaves').modal('toggle');
        $scope.confirm_button = false;
        $scope.answer_entered = "";
        $scope.infoSuccess.log("Leaves deleted.");
    }
    $scope.clear_compoff = function () {
        localStorage.removeItem("comp_off");
        $('#clear_compoff').modal('toggle');
        $scope.confirm_button = false;
        $scope.answer_entered = "";
        $scope.infoSuccess.log("Comp off deleted.");
    }
    $scope.generate_capcha = function () {
        var ops = ['+', '-', '*'];
        var min = 0,
            max = 10;

        var random = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
        rnum1 = Math.floor(Math.random() * (max - min + 1)) + min;
        rnum2 = Math.floor(Math.random() * (max - min + 1)) + min;

        var operator = ops[random];
        switch (random) {
            case 0:
                $scope.answer = rnum1 + rnum2;
                break;
            case 1:
                $scope.answer = rnum1 - rnum2;
                break;
            case 2:
                $scope.answer = rnum1 * rnum2;
                break;
        }
        $scope.question = rnum1 + " " + operator + " " + rnum2 + " ?";
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

    $scope.updateProgressBar = function () {
        $scope.compoff = JSON.parse(localStorage.getItem("comp_off"));
        $scope.comp_off_taken = 0;
        if ($scope.compoff != null) {
            for (i = 0; i < $scope.compoff.length; i++) {
                if ($scope.compoff[i].used == true) {
                    $scope.comp_off_taken++;
                }
            }
            $scope.comp_off_percentage = ($scope.comp_off_taken * 100) / $scope.compoff.length;
        }
    }

    $rootScope.titletext = "Comp Off";
    $scope.updateProgressBar();

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
            $scope.infoError.log("Comp off already added");
        } else {
            var duplicate = false;
            $scope.my_leaves = JSON.parse(localStorage.getItem("my_leaves"));
            if ($scope.my_leaves == null)
                $scope.my_leaves = [];

            for (i = 0; i < $scope.my_leaves.length; i++) {
                if ($scope.my_leaves[i].date == d) {
                    duplicate = true;
                    break;
                }
            }
            if (duplicate) {
                $scope.infoError.log("A leave entry exist in the same date");
            } else {
                $scope.comp_off.push({
                    "date": d,
                    "comment": $scope.comment,
                    "used": false
                });
                localStorage.setItem("comp_off", JSON.stringify($scope.comp_off));
                $scope.infoSuccess.log("Comp off added");
                $('#add_comp_off').modal('toggle');
                $scope.updateProgressBar();
                $scope.date = "";
            }
        }

    }

    $scope.delate = function (index) {
        $scope.delete_item = index;
    }
    $scope.confirm_delate = function () {

        $scope.compoff = JSON.parse(localStorage.getItem("comp_off"));
        var item = $scope.compoff[$scope.delete_item].date;
        $scope.compoff.splice($scope.delete_item, 1);
        localStorage.setItem("comp_off", JSON.stringify($scope.compoff));

        // dettaching from leaves taken.
        $scope.my_leaves = JSON.parse(localStorage.getItem("my_leaves"));
        for (i = 0; i < $scope.my_leaves.length; i++) {
            if ($scope.my_leaves[i].comp_adjusted == item) {
                $scope.my_leaves[i].comp_adjusted = ""
                localStorage.setItem("my_leaves", JSON.stringify($scope.my_leaves));
                break;
            }
        }

        $scope.infoSuccess.log("Comp off deleted");
        $('#del_comp_off').modal('toggle');
        $scope.updateProgressBar();
    }



});

App.controller('myLeavesController', function ($scope, $http, $rootScope) {
    $rootScope.titletext = "My Leaves";
    $scope.my_leaves = JSON.parse(localStorage.getItem("my_leaves"));
    if ($scope.my_leaves != null && $scope.my_leaves.length > 0)
        $rootScope.titletext = "My Leaves ( total " + $scope.my_leaves.length + " )";

    $scope.date = "";
    $scope.comment = "";
    $scope.delete_item = "";
    $scope.adj_comp = false;
    $scope.type = "anual";

    // Get not used comp off
    $scope.available_comp_off = [];
    $scope.comp_off = JSON.parse(localStorage.getItem("comp_off"));
    if ($scope.comp_off == null)
        $scope.comp_off = [];

    for (i = 0; i < $scope.comp_off.length; i++) {
        if ($scope.comp_off[i].used == false) {
            $scope.available_comp_off.push($scope.comp_off[i].date);
        }
    }


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
    $('#my_leave_date').attr('max', maxDate);


    $scope.add_my_leaves = function (id) {

        var duplicate = false;
        var d = ($scope.date + "").split('00:00:00')[0].trim();

        // Checking for comp off exist for same day
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
            $scope.infoError.log("A leave exist in the same date");
        } else {
            var duplicate = false;
            $scope.my_leaves = JSON.parse(localStorage.getItem("my_leaves"));
            if ($scope.my_leaves == null)
                $scope.my_leaves = [];

            for (i = 0; i < $scope.my_leaves.length; i++) {
                if ($scope.my_leaves[i].date == d) {
                    duplicate = true;
                    break;
                }
            }
            if (duplicate) {
                $scope.infoError.log("Leave already added");
            } else {
                var comp_date = document.getElementById('comp_adjusted_date').value;
                if ($scope.adj_comp) {
                    $scope.type = "";
                } else
                    comp_date = '';
                $scope.my_leaves.push({
                    "date": d,
                    "comment": $scope.comment,
                    "comp_adjusted": comp_date,
                    "type": $scope.type
                });
                localStorage.setItem("my_leaves", JSON.stringify($scope.my_leaves));
                $scope.infoSuccess.log("Leave added");
                $scope.my_leaves = JSON.parse(localStorage.getItem("my_leaves"));
                $rootScope.titletext = "My Leaves ( total " + $scope.my_leaves.length + " )";
                $('#add_my_leaves').modal('toggle');
                $scope.date = "";
                $scope.comment = "";
                $scope.delete_item = "";
                $scope.adj_comp = false;
                $scope.type = "anual";

                // Change comp off status
                $scope.comp_off = JSON.parse(localStorage.getItem("comp_off"));
                for (i = 0; i < $scope.comp_off.length; i++) {
                    if ($scope.comp_off[i].date == comp_date) {
                        $scope.comp_off[i].used = true;
                        localStorage.setItem("comp_off", JSON.stringify($scope.comp_off));
                    }
                }
            }
        }



    }

    $scope.delate = function (index) {
        $scope.delete_item = index;
    }
    $scope.confirm_delate = function () {

        $scope.my_leaves = JSON.parse(localStorage.getItem("my_leaves"));
        $scope.my_leaves.splice($scope.delete_item, 1);
        localStorage.setItem("my_leaves", JSON.stringify($scope.my_leaves));
        $scope.infoSuccess.log("Leave deleted");
        $scope.my_leaves = JSON.parse(localStorage.getItem("my_leaves"));
        $rootScope.titletext = "My Leaves ( total " + $scope.compoff.length + " )";
        $('#del_my_leaves').modal('toggle');
    }

});
