var mysql = require('mysql');
var express = require("express");
var config = require("./config");

var pool = mysql.createPool(config.mySqlDbSettings);
var app = express();

app.get("/getHolidayList", function (req, res) {
    getHolidayList(req, res);

});
app.get("/getCountryList", function (req, res) {
    getCountryList(req, res);
});
app.get("/version", function (req, res) {
    res.json({
        version: 1
    });

});

function getHolidayList(req, res) {

    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({
                "code": 100,
                "status": "Error in connection database"
            });
            return;
        }

        connection.query("SELECT day,date,holiday,comment FROM `holidays` WHERE country = '" + req.query.country + "' AND year='" + req.query.year + "'", function (err, rows, fields) {
            connection.release();
            if (!err) {
                res.json(rows);

            } else {
                console.log('Error while performing Query.');
                res.json("Unable to fetch details");
            }
        });

        connection.on('error', function (err) {
            res.json({
                "code": 100,
                "status": "Error in connection database"
            });
            return;
        });
    });
}

function getCountryList(req, res) {

    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({
                "code": 100,
                "status": "Error in connection database"
            });
            return;
        }

        connection.query("SELECT DISTINCT country FROM `holidays`", function (err, rows, fields) {
            connection.release();
            if (!err) {
                res.json(rows);

            } else {
                console.log('Error while performing Query.');
                res.json("Unable to fetch details");
            }
        });

        connection.on('error', function (err) {
            res.json({
                "code": 100,
                "status": "Error in connection database"
            });
            return;
        });
    });
}

app.listen(3000);
