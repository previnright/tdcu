
(function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();


/* Talkdesk Callback */

let data = '';
let data2 = '';
var token = '';
var obj = '';
const http = require('https');

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
});
  

// post the data
post_req.write(post_data);
post_req.end();
  

/* Talkdesk Callback End */