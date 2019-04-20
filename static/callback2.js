function TalkdeskApi(DataString){

	// var optionRequest = new XMLHttpRequest();	
	// optionRequest.open("OPTIONS", "*"); 
	// optionRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
	// optionRequest.setRequestHeader("Host", "https://tdcu.talkdeskid.com/oauth/token");
	// optionRequest.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8;application/json");
	// optionRequest.setRequestHeader("Accept-Language", "en-us,en;q=0.5");
	// optionRequest.setRequestHeader("Accept-Encoding", "gzip,deflate");
	// optionRequest.setRequestHeader("Accept-Charset", "ISO-8859-1,utf-8;q=0.7,*;q=0.7");
	// optionRequest.setRequestHeader("Connection", 'keep-alive'); 
	// optionRequest.setRequestHeader("Origin", 'https://ac8c483d.ngrok.io'); 
	// optionRequest.setRequestHeader("Access-Control-Request-Method", "POST");
	// optionRequest.setRequestHeader("Access-Control-Request-Headers", 'X-PINGOTHER, Content-Type'); 

	// optionRequest.onreadystatechange = function () {

		// if (optionRequest.readyState === XMLHttpRequest.DONE && optionRequest.status === 200)
		// {

			console.log(DataString);

			var secret = "ZmI0NDNhM2JkMWQ0NDczMWJhM2FmYzRjZDE0ZmE3ODc6Z0s1YVAwck5fZWVGdHdjd0ZhTzRzRXUyNDhVZlptcUZCNUI1YkFJNTFacHdwclFCTVY0dkhOeThiUjRBQXpscUM4NjVUZXF2LW95c2ZFbHNEalByX2c="; // client id for authorization
			var TokenUrl = "https://tdcu.talkdeskid.com/oauth/token"; // url to generate token
			var scope = "scope=callback%3Awrite&grant_type=client_credentials"; // data to send 

			var CallbackUrl = "https://api.talkdeskapp.com/calls/callback"; // url for api call

			var request = new XMLHttpRequest(); // first http request
			request.open("POST", TokenUrl, true); // open request with post method
			request.setRequestHeader("Authorization", "Basic "+ secret); // basic authorization with client id
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // content type that is sent
			request.setRequestHeader("Access-Control-Allow-Origin", "*");
			request.setRequestHeader("Referrer-Policy", "unsafe-url");
			request.setRequestHeader("X-Requested-With", "XMLHttpRequest"); 
			request.setRequestHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
			request.setRequestHeader("Access-Control-Allow-Credentials", "true");
			request.setRequestHeader("Access-Control-Max-Age", '86400'); // 24 hours
			request.setRequestHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");


			request.send("scope=callback%3Awrite&grant_type=client_credentials"); //specify the credentials to receive the token on request

			// global variables to pass from one POST to the next POST request
			var response; 
			var obj;
			var key;



			request.onreadystatechange = function () {

			    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {

			        response = request.responseText;
			        // console.log(response);
			        obj = JSON.parse(response);
			        // console.log(obj);
			        key = obj.access_token; //store the value of the accesstoken
			        // console.log(key);

			        //2nd post
					var r2 = new XMLHttpRequest(); 
					r2.open("POST", CallbackUrl, true);
					r2.setRequestHeader("Authorization", "Bearer "+ key);
					r2.setRequestHeader("Content-type", "application/json");
					r2.setRequestHeader("Access-Control-Allow-Origin", "*");
					r2.setRequestHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
					r2.setRequestHeader("Access-Control-Allow-Credentials", "false");
					r2.setRequestHeader("Access-Control-Max-Age", '86400'); // 24 hours
					r2.setRequestHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
					r2.send(DataString);
					r2.onreadystatechange = function () {
						if (r2.readyState === XMLHttpRequest.DONE && r2.status === 200)
						{
							var response2 = r2.responseText;
							var obj2 = JSON.stringify(response2);
						} 
					}
					
					
			    }  	
			}
	// 	} 
	// }
}

TalkdeskApi('{"talkdesk_phone_number":"+18555888924","contact_phone_number":"+14086494479"}');