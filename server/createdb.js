var mysql = require('mysql');
//var express = require("express");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mansoor',
    database: 'holipers'
});
//var app = express();
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

//app.get("/", function (req, res) {
//
//});
//
//app.listen(3000);



var list = [{
    "Day": "Sunday",
    "Date": "January 01\n   Jan 1",
    "Year": "2017",
    "Holiday": "New Years Day",
    "Comments": ""
}, {
    "Day": "Monday",
    "Date": "January 16\n   Jan 16",
    "Year": "2017",
    "Holiday": "Martin Luther King Day",
    "Comments": "3rd Monday in January"
}, {
    "Day": "Monday",
    "Date": "February 20\n   Feb 20",
    "Year": "2017",
    "Holiday": "Presidents Day",
    "Comments": "3rd Monday in February. Not all states"
}, {
    "Day": "Monday",
    "Date": "April 17\n   Apr 17",
    "Year": "2017",
    "Holiday": "Emancipation Day",
    "Comments": "Washington DC Only. Weekday closest to April 16th"
}, {
    "Day": "Sunday",
    "Date": "May 14\n   May 14",
    "Year": "2017",
    "Holiday": "Mothers Day",
    "Comments": "2nd Sunday in May. Not a public holiday"
}, {
    "Day": "Monday",
    "Date": "May 29\n   May 29",
    "Year": "2017",
    "Holiday": "Memorial Day",
    "Comments": "Last Monday in May"
}, {
    "Day": "Sunday",
    "Date": "June 18\n   Jun 18",
    "Year": "2017",
    "Holiday": "Fathers Day",
    "Comments": "3rd Sunday in June. Not a public holiday"
}, {
    "Day": "Tuesday",
    "Date": "July 04\n   Jul 4",
    "Year": "2017",
    "Holiday": "Independence Day",
    "Comments": ""
}, {
    "Day": "Monday",
    "Date": "September 04\n   Sep 4",
    "Year": "2017",
    "Holiday": "Labor Day",
    "Comments": "1st Monday in September"
}, {
    "Day": "Monday",
    "Date": "October 09\n   Oct 9",
    "Year": "2017",
    "Holiday": "Columbus Day",
    "Comments": "2nd Monday in October"
}, {
    "Day": "Friday",
    "Date": "November 10\n   Nov 10",
    "Year": "2017",
    "Holiday": "Veterans Day (observed)",
    "Comments": ""
}, {
    "Day": "Thursday",
    "Date": "November 23\n   Nov 23",
    "Year": "2017",
    "Holiday": "Thanksgiving",
    "Comments": "4th Thursday in November"
}, {
    "Day": "Friday",
    "Date": "November 24\n   Nov 24",
    "Year": "2017",
    "Holiday": "Day after Thanksgiving",
    "Comments": "Day after 4th Thursday in November"
}, {
    "Day": "Monday",
    "Date": "December 25\n   Dec 25",
    "Year": "2017",
    "Holiday": "Christmas Day",
    "Comments": ""
}];
var i = 0;
var max = list.length;
insert(i);

function insert(i) {


    connection.query("INSERT INTO `holipers`.`holidays` (`day`, `date`, `holiday`, `comment`, `country`, `year`) VALUES ('" + list[i].Day + "', '" + list[i].Date.split('\n')[1].trim() + "', '" + list[i].Holiday + "', '" + list[i].Comments + "', 'United states', '2017')", function (err, rows, fields) {
        //        connection.end();
        if (!err) {
            if (i < max) {
                i++;
                insert(i);
            }

        } else
            console.log('Error while performing Query.');
    });
}
