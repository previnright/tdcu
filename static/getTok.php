<?php

  getTok();

  function getTok()
  {
      ini_set('display_errors', 'On');
      error_reporting(E_ALL);

      $url = 'https://talkforce.talkdeskid.com/oauth/token';
      $data = array('scope' => 'callback:write', 'grant_type' => 'client_credentials');

      // use key 'http' even if you send the request to https://...
      $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\nAuthorization: Basic YzQxODVhZjU2NzAyNDA5NzlkNGFmMjUwZmEwM2YwMDI6MlIzYTdmNldpS2xQckdqRUxYd2hjcmVpLW0wUlpFOEc5TFBFdThITHlNeFNheFRBNnQxYS1BVmJVMllwVFVUVzJNRTFCVzNDbXVUemh5OXFxaGEyQmc=\r\n",
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
