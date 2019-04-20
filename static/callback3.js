function submitCall() {

	console.log('hi');

	$.ajax({
	    url: "static/test.py",
	    type: "GET",
	    dataType: "json",
	    success: function(response) {
	        console.log('success');
	    }
	})
}
    

submitCall();





