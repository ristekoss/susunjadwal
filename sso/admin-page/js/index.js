$(document).ready(function() {    
    $('#btn-sso').click(function() {
        window.open('http://ristek.cs.ui.ac.id/susunjadwal/sso', '_blank');
        return false;
    })

    window.processLogin = function(user) {
        var date = new Date();
        var minutes = 30;
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        document.cookie = 'token=' + user['token'] + ';expires=' + date.toString();
        window.location.replace("http://ristek.cs.ui.ac.id/susunjadwal/admin/admin.php");
    }
});