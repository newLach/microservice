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
app.get("/api/whoami",	(req, res)	=>{
	var languages	=	req.get('Accept-Language');
	console.log(req.app.engine)
	res.send({ipaddress: req.ip,
	language: languages,
	software: req.get('User-Agent')})
	console.log()
})


app.get("/api/:dateString?",	 (req, res) =>{

		let	dateString	=	req.params.dateString
	let	date;
	if(!dateString){date	=	new	Date()}
	else{
	if(!isNaN(dateString)){date	=	new	Date(parseInt(dateString))}
	
	else{date	=	new	Date(dateString)}
	}
	if(date.toString()	===	'Invalid Date'){res.json({error: date.toString()})}
	
	else{res.json({unix: date.getTime(), utc:date.toUTCString()})}


});



app.listen(process.env.PORT	||	3000)
// listen for requests :)
