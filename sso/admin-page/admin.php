<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<div id="content">
		<table id="table-content">
			<tr>
				<th>Nama Matkul</th>
				<th>Jurusan</th>
				<th>Jumlah Peminat</th>
				<th>Detail</th>
			</tr>
		</table>
	</div>
	<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
	<script src="../js/jquery.cookie.js"></script>
	<script>
		$.ajaxSetup({
			headers: {
				'Authorization': 'Bearer ' + $.cookie("token")
			}
		});
		$.ajax({
			url: "http://localhost:5000/susunjadwal/api/admin/majors",
			type: "GET",

			success: function(result) {
				result['majors'].forEach(function(major) {
					$.ajax({
						url: "http://localhost:5000/susunjadwal/api/admin/majors/" + major['id'] + "/courses",
						type: "GET",

						success: function(result) {
							result['courses'].forEach(function(course) {
								$('#table-content').append('' + '<tr>' + 
										'<td>' + course['name'] + '</td>' +
										'<td>' + major['name'] + '</td>' +
										'<td style="text-align: right">' + course['num_student'] + '</td>' +
										'<td><a href="#" onclick="toDetail(\''+major['id']+'\', \''+course['name']+'\', \''+major['name']+'\')">' + "Lihat Detail" + '</a></td>' +
									'<tr>'
								);
							})
						}
					})
				});
			}
		})

		function toDetail(majorId, courseName, majorName) {
			var params = {
				majorId: majorId,
				courseName: courseName,
				majorName: majorName
			};
			window.location.replace("detail.php?" + jQuery.param(params));
		}
	</script>
</body>
</html>