<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Susun Jadwal Dashboard - Login</title>
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
                <ul class="nav navbar-nav navbar-right">
                    <li><a>Compiled and crafted by Ristek Fasilkom UI</a></li>                
                </ul>
            </div>
        </div>
    </nav>

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Login via SSO
                    </div>
                    <div class="panel-body">
                        <div class="alert alert-info text-center">
                            Anda dapat login menggunakan akun SSO Anda dengan aman. <br> Kami tidak menyimpan password SSO Anda.
                        </div>
                        <button id="btn-sso" class="btn btn-primary btn-block font-24" style="padding-top:12px;padding-bottom:12px;font-size:24px">Login SSO</button>
                    </div>
                </div>
            </div>
        </div>            
    </div>

    <script src="js/jquery.min.js" defer="defer"></script>
    <script src="js/jquery.cookie.js" defer="defer"></script>
    <script src="js/bootstrap.min.js" defer="defer"></script>
    <script src="js/datatables.min.js" defer="defer"></script>
    <script src="js/sweetalert.min.js" defer="defer"></script>
    <script src="js/index.js" defer="defer"></script>    
</body>
</html>