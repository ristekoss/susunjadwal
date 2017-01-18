<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<h3 id="name"></h3>
	<h3 id="major"></h3>
	<h4 id="num_student"></h4>
	<div id="content">
		<table id="table-content">
			<tr>
				<th>Nama</th>
				<th>NPM</th>
				<th>Jurusan</th>
			</tr>
		</table>
	</div>
	<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
	<script src="../js/jquery.cookie.js"></script>
	<script>
		var courseName = "<?= $_GET['courseName'] ?>";
		var majorName = "<?= $_GET['majorName'] ?>";
		var majorId = "<?= $_GET['majorId'] ?>";
		$.ajaxSetup({
			headers: {
				'Authorization': 'Bearer ' + $.cookie("token")
			}
		});
		$.ajax({
			url: "http://localhost:5000/susunjadwal/api/admin/majors/" + majorId + "/courses/" + encodeURI(courseName),
			type: "GET",

			success: function(result) {
				result['student_list'].forEach(function(student) {
					$('#table-content').append('' + '<tr>' + 
							'<td>' + student['name'] + '</td>' +
							'<td>' + student['npm'] + '</td>' +
							'<td>' + student['major'] + '</td>' +
							'<td>' + 
						'<tr>'
					);
				})
				$('#name').text(courseName);
				$('#major').text(majorName);
				$('#num_student').text(result['course']['num_student']);
			}
		})

		function toDetail(majorId, courseName) {
			console.log(courseName);
		}
	</script>
</body>
</html>