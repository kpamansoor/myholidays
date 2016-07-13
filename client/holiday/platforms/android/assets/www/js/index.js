/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        //        window.sqlitePlugin.openDatabase({
        //            name: 'holiday.db',
        //            location: 'default'
        //        }, function (db) {
        //
        //            db.executeSql("CREATE TABLE holiday(date text PRIMARY KEY,day TEXT,comment text,holiday text);", [], function (resultSet) {
        //                db.close();
        //            }, function (error) {
        //                console.log('SELECT error: ' + error.message);
        //                db.close();
        //            });
        //
        //
        //        }, function (err) {
        //            console.log('Open database ERROR: ' + JSON.stringify(err));
        //        });
        var db = window.sqlitePlugin.openDatabase({
            name: 'holiday.db',
            location: 'default'
        });
        db.transaction(function (tx) {
            tx.executeSql("CREATE TABLE holiday(date text PRIMARY KEY,day TEXT,comment text,holiday text);", [], function (tx, res) {

            });
        }, function (error) {
            // OK to close here:
            console.log('transaction error: ' + error.message);
            db.close();
        }, function () {
            // OK to close here:
            console.log('transaction ok');
            db.close(function () {
                console.log('database is closed ok');
            });
        });
    }
};

app.initialize();
