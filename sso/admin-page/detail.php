<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Susun Jadwal Dashboard</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/datatables.min.css">
    <link rel="stylesheet" href="css/sweetalert.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" >
                    Susun Jadwal Dashboard
                </a>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">  
                <ul class="nav navbar-nav">
                    <li><a>Logged in as <span id="username">jundi.ahmad</span></a></li>                
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <li><a>Compiled and crafted by Ristek Fasilkom UI</a></li>                
                </ul>
            </div>
        </div>
    </nav>

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <h3>Detail Mata Kuliah: <span id="nama-kelas-matkul">Basis Data - A</span></h3>
                <hr>
                <div class="alert alert-info" role="alert">
                    Penyelenggara: <span id="jurusan">Ilmu Komputer</span> <br>
                    Jumlah SKS: <span id="jml-sks">4</span> <br>
                    <strong>Jumlah Peminat: <span id="jml-peminat">120</span> Orang</strong>
                </div>
                <h4><strong>Daftar Peminat</strong></h4>
                <table id="peminat-table" class="table table-striped">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>NPM</th>
                            <th>Nama</th>
                            <th>Jurusan</th>                            
                        </tr>                            
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>    
    </div>

    <script src="js/jquery.min.js" defer="defer"></script>
    <script src="js/jquery.cookie.js" defer="defer"></script>
    <script src="js/bootstrap.min.js" defer="defer"></script>
    <script src="js/datatables.min.js" defer="defer"></script>
    <script src="js/sweetalert.min.js" defer="defer"></script>
    <script src="js/detail.js" defer="defer"></script>
    <script>
        var courseName = "<?= $_GET['courseName'] ?>";
        var majorName = "<?= $_GET['majorName'] ?>";
        var majorId = "<?= $_GET['majorId'] ?>";
    </script>
</body>
</html>