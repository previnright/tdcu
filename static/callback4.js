$.ajax({
  type: "POST",
  beforeSend: function(request) {
    request.setRequestHeader("Authorization", "Basic ZmI0NDNhM2JkMWQ0NDczMWJhM2FmYzRjZDE0ZmE3ODc6Z0s1YVAwck5fZWVGdHdjd0ZhTzRzRXUyNDhVZlptcUZCNUI1YkFJNTFacHdwclFCTVY0dkhOeThiUjRBQXpscUM4NjVUZXF2LW95c2ZFbHNEalByX2c="); // basic authorization with client id
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // content type that is sent
  },
  url: "https://tdcu.talkdeskid.com/oauth/token",
  data: "scope=callback%3Awrite&grant_type=client_credentials",
  crossDomain: true,
  processData: false,
  success: function(msg) {
    console.log("The result =" + StringifyPretty(msg));
  }
});