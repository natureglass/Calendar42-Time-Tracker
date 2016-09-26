var http = require('http');
var fs = require("fs");
var unirest = require('unirest');

http.createServer(function(request, response) {

	if(request.url === "/index" || request.url === "/"){
		sendFileContent(response, "public/index.html", "text/html");
	}
	else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9\/]*.jpg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/jpeg");
	}
	else if(request.url === '/clientRequest'){

	  request.on('data', function(data) {
	    var returnOBJ = JSON.parse(data);

	    console.log(returnOBJ.data);

	    restAPIcall(returnOBJ, function(result){
	        response.writeHead(200, {"Content-type": "application/json"});
	        response.end(JSON.stringify(result));
	    });
	  });
	}

	else{
		console.log("Requested URL is: " + request.url);
		response.end();
	}
}).listen(8080);

console.log("Server is now listening on http://localhost:8080");

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}

// Connecting with C42 REST API
function restAPIcall(clientOBJ, callback){

  unirest[clientOBJ.type](clientOBJ.uri)
  .headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Token 81d7606d0f0d55ad55a3fff8a8f1d53093c2433b'
  })
  .send(clientOBJ.data)
  .end(function (response) {
    callback(response.body);
  });

}
