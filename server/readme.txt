README
-------

1. Get holyday list of a particular country in particular yar in html table form http://www.officeholidays.com/countries/index.php
2. Copy html table and past it into http://jsfiddle.net/Mottie/4E2L6/9/
3. Generate json and past it in the createdb.js file against list array.
4. Edit country name and year in the code.
5. Run "node createdb.js" file to insert into the database.


Run server "node server.js" and access "http://13.92.189.238:3000/version"
Access holiday list using "http://13.92.189.238:3000/getHolidayList?country=India&year=2017"
