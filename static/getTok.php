<?php

  getTok();

  function getTok()
  {
      ini_set('display_errors', 'On');
      error_reporting(E_ALL);

      $url = 'https://tdcu.talkdeskid.com/oauth/token';
      $data = array('scope' => 'callback:write', 'grant_type' => 'client_credentials');

      // use key 'http' even if you send the request to https://...
      $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\nAuthorization: Basic ZmI0NDNhM2JkMWQ0NDczMWJhM2FmYzRjZDE0ZmE3ODc6Z0s1YVAwck5fZWVGdHdjd0ZhTzRzRXUyNDhVZlptcUZCNUI1YkFJNTFacHdwclFCTVY0dkhOeThiUjRBQXpscUM4NjVUZXF2LW95c2ZFbHNEalByX2c=\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        )
      );
      $context  = stream_context_create($options);
      $result = file_get_contents($url, false, $context);
      if ($result === false) { /* Handle error */
          echo "nah";
      }

      echo json_encode($result);

  }
