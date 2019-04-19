/* Talkdesk Callback */

let data = '';
let data2 = '';
var token = '';
var obj = '';
var http = require('https');

// We need this to build our post string
var querystring = require('querystring');
    

// Build the post string from an object
var post_data = 'scope=callback%3Awrite&grant_type=client_credentials';

        
// Build the post string from an object 2
var post_data2 = '{"talkdesk_phone_number":"+18555888924","contact_phone_number":"+14086494479"}';


// An object of options to indicate where to post to
var post_options = {
    host: 'tdcu.talkdeskid.com',
    port: '443',
    path: '/oauth/token',
    method: 'POST',
    headers: {
        'Authorization': 'Basic ZmI0NDNhM2JkMWQ0NDczMWJhM2FmYzRjZDE0ZmE3ODc6Z0s1YVAwck5fZWVGdHdjd0ZhTzRzRXUyNDhVZlptcUZCNUI1YkFJNTFacHdwclFCTVY0dkhOeThiUjRBQXpscUM4NjVUZXF2LW95c2ZFbHNEalByX2c=',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, FETCH',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept'
    }
};

// Set up the request
var post_req = http.request(post_options, function(res) {
    

    if (res.method === 'OPTIONS') {
          console.log('!OPTIONS');
          var headers = {};
          // IE8 does not allow domains to be specified, just the *
          // headers["Access-Control-Allow-Origin"] = req.headers.origin;
          headers["Access-Control-Allow-Origin"] = "*";
          headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
          headers["Access-Control-Allow-Credentials"] = false;
          headers["Access-Control-Max-Age"] = '86400'; // 24 hours
          headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
          res.writeHead(200, headers);
          res.end();
    }
    else{

        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
            data += chunk;
        });
          
        res.on('end', function () {
            console.log('data0 '+ data);
            obj = JSON.parse(data);
            console.log('data1 '+ obj.access_token);
            token = obj.access_token;
            console.log('data2 '+ token);


        
        // An object of options to indicate where to post to 2
        var post_options2 = {
            host: 'api.talkdeskapp.com',
            port: '443',
            path: '/calls/callback',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };
        
        // Set up the request 2
        var post_req2 = http.request(post_options2, function(res) {
            res.setEncoding('utf8');
            res.on('data2', function (chunk) {
                data2+= chunk
            });
            res.on('end', function () {
                console.log('data_final_2 '+ data2);
            });
        });
          
            post_req2.write(post_data2);
            post_req2.end();
        });

    }
});
  

// post the data
post_req.write(post_data);
post_req.end();
  

/* Talkdesk Callback End */