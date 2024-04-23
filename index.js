// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



app.get("/api/:date?", (req, res) => {
  date = {}
  if(req.params.date == null){
    date = {
      "unix": new Date().valueOf(),
      "utc": new Date().toUTCString()
    }
    res.json(date)
  }
  else{
      if(new Date(parseInt(req.params.date)).toString() == "Invalid Date"){
        res.json({
          "error": "Invalid Date"
        })
      }
      else{
        // Checks if the given date is a unix timestamp in milliseconds
        if(isNaN(new Date(req.params.date).valueOf()) || new Date(req.params.date).toUTCString == "Invalid Date"){
          date = {
            "unix": new Date(parseInt(req.params.date)).valueOf(),
            "utc": new Date(parseInt(req.params.date)).toUTCString()
          }
        }
        // Else the date is in normal utc timestamp
        else{
          date = {
            "unix": new Date(req.params.date).valueOf(),
            "utc": new Date(req.params.date).toUTCString()
          }
        }
        res.json(date)
      }
  }
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
