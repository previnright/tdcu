function submitCall() {
	var token = ""; 
		var data = {
	    talkdesk_phone_number: "+18555888924",
	    contact_phone_number: "+14086494479"
	};

	console.log(data);

	$.ajax({
	    url: "static/getTok.php",
	    type: "GET",
	    dataType: "json",
	    success: function(response) {
	        var obj = JSON.parse(response);
	        console.log("~~Object~~");
	        console.log(obj);
	        token = obj["access_token"];
	        console.log(token);
	        $.ajax({
	            url: "https://api.talkdeskapp.com/calls/callback",
	            type: "POST",
	            crossDomain: true,
	            data: JSON.stringify(data),
	            contentType: "application/json",
	            beforeSend: function(xhr) {
	                xhr.setRequestHeader("Authorization", "Bearer " + token);
	            }
	        })
	    }
	})
}
    

submitCall();





