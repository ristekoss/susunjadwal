$(document).ready(function() {
    $('#peminat-table').dataTable({
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
        url: "http://ristek.cs.ui.ac.id/susunjadwal/api/admin/majors/" + majorId + "/courses/" + encodeURI(courseName),
        type: "GET",

        success: function(result) {
            result['student_list'].forEach(function(student, index) {
                $('#peminat-table').append('' + '<tr>' +
                        '<td>' + (index+1) + '</td>' +
                        '<td>' + student['npm'] + '</td>' +
                        '<td>' + student['name'] + '</td>' +
                        '<td>' + student['major'] + '</td>' +
                        '<td>' + 
                    '<tr>'
                );
            })
            $('#nama-kelas-matkul').text(courseName);
            $('#jurusan').text(majorName);
            $('#jml-peminat').text(result['course']['num_student']);
        }
    })

    function toDetail(majorId, courseName) {
        console.log(courseName);
    }    
});