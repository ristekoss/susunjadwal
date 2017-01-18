<?php

require 'vendor/autoload.php';

SSO\SSO::authenticate();

$user = SSO\SSO::getUser();

if ($user->role == 'staff' || $user->npm == "1406527620") {
	$data = array("token" => '8VlGnna26REH6xrh');
	$data_string = json_encode($data);
	$ch = curl_init('http://localhost:5000/auth/login/admin');
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json',
		'Authorization: vUDeeunLQOiKHATDr9YCB02WKa7CfqbD'
	));
	$data = curl_exec($ch);
	$data = json_decode($data);
} else {
	$npm = $user->npm;
	$user->angkatan = "20".$npm[0].$npm[1];
	$major = strtolower($user->study_program);
	if(preg_match("/^(ilmu komputer)/", $major)) {
		$major = 'ilmu-komputer';
	}
	else if(preg_match("/^(sistem informasi)/", $major)) {
		$major = 'sistem-informasi';
	}
	else if(preg_match("/^(teknik elektro)/", major)) {
		$major = 'teknik-elektro';
	}

	$data = array(	
		"name" 		=> $user->name,
		"npm"  		=> $user->npm,
		"angkatan"	=> $user->angkatan,
		"major"		=> $major,
		"token"		=> '8VlGnna26REH6xrh'
	);
	$data_string = json_encode($data);
	$ch = curl_init('http://localhost:5000/auth/login');
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json',
		'Authorization: vUDeeunLQOiKHATDr9YCB02WKa7CfqbD'
	));
	$data = curl_exec($ch);
	$data = json_decode($data);
}


?>

<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
<script src="js/js-cookie.js"></script>
<script type="text/javascript">
  var user = {
    token: '<?= $data->token ?>',
    user_id: '<?= $data->user_id ?>',
    major_id: '<?= $data->major_id ?>'
  };
  window.opener.processLogin(user);
  window.close();
</script>