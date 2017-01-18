$(document).ready(function() {
    $('#classes-table').dataTable({
        paging: false,
        searching: true,
        ordering: true,        
        autoWidth: true,
        bLengthChange: true,
        columnDefs: [{ targets: 'no-sort', orderable: false }],
    });

    // sweetalert when ajax start
    $(document).ajaxStart(function() {
        swal({
            imageUrl: 'img/loading.gif',
            title: 'Mengambil data...',
            text: 'Mohon tunggu data sedang dipersiapkan',
            showConfirmButton: false,                    
            allowEscapeKey: false,
            allowOutsideClick: false
        });        
    });

    // sweetalert when ajax stop
    $(document).ajaxStop(function() {
        swal({            
            title: ' ',
            text: ' ',
            timer: 1,
            showConfirmButton: false,                    
            allowEscapeKey: false,
            allowOutsideClick: false
        });
    });


    $.ajaxSetup({
        headers: {
            'Authorization': 'Bearer ' + $.cookie("token")
        }
    });

    $.ajax({
        url: "http://ristek.cs.ui.ac.id/susunjadwal/api/admin/majors",
        type: "GET",

        success: function(result) {
            result['majors'].forEach(function(major) {
                $.ajax({
                    url: "http://ristek.cs.ui.ac.id/susunjadwal/api/admin/majors/" + major['id'] + "/courses",
                    type: "GET",

                    success: function(result) {
                        result['courses'].forEach(function(course, index) {
                            $('#classes-table > tbody').append('<tr>' + 
                                    '<td>' + (index+1) + '</td>' +
                                    '<td>' + course['name'] + '</td>' +
                                    '<td>' + major['name'] + '</td>' +
                                    '<td style="text-align: right">' + course['num_student'] + '</td>' +
                                    '<td><a href="" class="btn btn-primary" onclick="toDetail(\''+major['id']+'\', \''+course['name']+'\', \''+major['name']+'\')">' + "Lihat Detail" + '</a></td>' +
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
        window.location.replace("http://ristek.cs.ui.ac.id/susunjadwal/admin/detail.php?" + jQuery.param(params), "_blank");
    }        
});