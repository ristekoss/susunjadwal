$(document).ready(function() {    
    // Awal Perubahan
    var classesTable = $('#classes-table').dataTable({
        paging: false,
        searching: true,
        ordering: true,        
        autoWidth: true,
        bLengthChange: true,
        columnDefs: [
            { targets: 'no-sort', orderable: false },
            { targets: [3], className: 'text-right' }
        ],        
    }).api();
    // Akhir Perubahan

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
                            classesTable.row.add([
                                (index+1),
                                course['name'],
                                course['major'],
                                course['num_student']+' orang',
                                '<a href="#" class="btn btn-primary" onclick="toDetail('+course['id']+', \''+major['id']+'\', \''+course['name']+'\', \''+major['name']+'\')">' + "Lihat Detail" + '</a>'
                            ]).draw();                             
                        })
                    }
                })
            });
        }
    })

});

function toDetail(courseId, majorId, courseName, majorName) {
    var params = {
        courseId: courseId,
        majorId: majorId,
        courseName: courseName,
        majorName: majorName
    };
    window.open("http://ristek.cs.ui.ac.id/susunjadwal/admin/detail.php?" + jQuery.param(params), "_blank");
}        