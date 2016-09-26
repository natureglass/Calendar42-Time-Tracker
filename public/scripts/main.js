
var startTime = '', stopTime = '', count = 0, myTimer = null;

// init Buttons
$( ":button" ).button();

// init Dialog
$( "#dialog" ).dialog({
	autoOpen: false, width: 400,
	buttons: [{
		text: "Got it!", click: function() {
			$( this ).dialog( "close" );
		}
	}]
});

// Start - Stop (Timer Button action)
function startStopTimer(){
	if(myTimer === null){
		startTime = getNow();
		$('#timerBtn').addClass('animColor').html('<b>Click to Beem up!</b>');
		myTimer = setInterval(function(){ updateTimer(); }, 1000);

	} else {
		stopTimer();
	}
}

// Stoping timer
function stopTimer(){

	stopTime = getNow();

	$('#timerBtn').removeClass('animColor').html('<b>Start Counting!</b>');

	clearInterval(myTimer);

	var msg = "";
	if(count <= 10){
		msg = "<h3>We hitched a lift!</h3> <p>The best cooks, the best drink mixers. They don’t give a wet slap about anything else! They will always help hitch-hikers on board, partly because they like the company, but mostly because it annoys the Vogons.</p>";
	} else {
		msg = "<h3>Sorry, you ran out of time!</h3> <p>Next time don't forget a towel!</p><small>A towel is about the most massively useful thing an interstellar hitch hiker can have...</small>";
	}

  // Posting Our Times at C42 REST API
	postData(startTime, stopTime);

	$( "#dialog" ).html(msg).dialog( "open" );

	count = 0;
	myTimer = null;
	gauge.setValue( 0 );

}

// Updating timer
function updateTimer(){
	count++;
	gauge.setValue( count );

	if(count === 11){ $('#timerBtn').html('<b>You are out of time..</b>'); }
	if(count >= 60){ stopTimer(); }
}

// Showing Instructions
function showInstr(){
	var msg = "<h3>Instructions</h3><p>The Vogons are sailing away. <p>Only <b>10 seconds to hitch that ride</b> once you start the timer!</p>";
	$( "#dialog" ).html(msg).dialog( "open" );
}

// Connecting with C42 REST API
function postData(startTime, stopTime) {

	// For now we do Just an Update on exising event ID
	var id = "b8be5e7efdd61283bb512bfb57155f14_14748831615445";

  // This data could be obtained with Geolocation!
  var data = {
    "event_type": "normal",
    "title": "Time Tracker Test Update",
    "start": startTime,
    "start_timezone": "Europe/Amsterdam",
    "end": stopTime,
    "end_timezone": "Europe/Amsterdam",
    "rsvp_status": "attending"
  };

  restAction('put', 'https://demo.calendar42.com/api/v2/events/' + id + '/', data);

}

// XMLHttpRequest to Our NodeJS server
var xmlhttp = new XMLHttpRequest();
function restAction(type, uri, data) {
  var payload = { uri: uri, type: type, data: data };

  xmlhttp.open('post', '/clientRequest', true);
  xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200){

      var string = JSON.parse(xmlhttp.responseText);

			console.log(string);

			$( "#dialog" ).append('<p style="color: red;">' +
				'Start: ' + string.data[0].start + '<br>' +
				'End: ' + string.data[0].end + '<br>' +
				'Modified: ' + string.data[0].modified + '<br>'
			);

    }
  };

  xmlhttp.send(JSON.stringify(payload));

}

// Getting Formated Time
function getNow(){
  var d = new Date(), month = d.getMonth() + 1,
  		datetime = d.getFullYear() + "-" + month + "-" + d.getDate() +
			"T" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "Z";

	console.log(datetime);
  
  return datetime;
}
