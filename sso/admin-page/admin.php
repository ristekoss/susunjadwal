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
                    <li><a>Logged in as <span id="username">Administrator</span></a></li>                
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
                <div class="alert alert-info alert-dismissible" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong>Dari mana data dibawah didapatkan?</strong> Data mata kuliah dan peminat dibawah diambil dari sistem Susun Jadwal Ristek Fasilkom UI secara real-time. Data mata kuliah pada Susun Jadwal di-scrap dari SIAK-NG sehingga data dibawah akurat sesuai SIAK-NG.
                </div>

                <table id="classes-table" class="table table-striped">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kelas MatKul</th>
                            <th>Jurusan</th>
                            <th class="text-right">Jumlah Peminat</th>
                            <th class="no-sort">&nbsp;</th>
                        </tr>                            
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>    
    </div>

    <script src="js/jquery.min.js" defer="defer"></script>
    <script src="js/bootstrap.min.js" defer="defer"></script>
    <script src="js/datatables.min.js" defer="defer"></script>
    <script src="js/sweetalert.min.js" defer="defer"></script>
    <script src="js/admin.js" defer="defer"></script>    
</body>
</html>