<!DOCTYPE html>
<html>
<head>
	<title>Susunjadwal Admin Login Page</title>
</head>
<body>
	<button>Login via SSO</button>
	<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
	<script src="../js/js-cookie.js"></script>
	<script>
		$('button').click(function() {
			window.open('http://localhost:3000', '_blank');
			return false;
		})

		window.processLogin = function(user) {
			var date = new Date();
			var minutes = 30;
			date.setTime(date.getTime() + (minutes * 60 * 1000));
			document.cookie = 'token=' + user['token'] + ';expires=' + date.toString();
			window.location.replace("admin.php");
		}
	</script>
</body>
</html>