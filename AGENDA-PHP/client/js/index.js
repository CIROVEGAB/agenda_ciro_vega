
$(() => {

    $('#btn-enviar').click(() => {

        var userData = {
            user: $('#user').val(),
            contrasena: $('#contrasena').val()
        }

        login(userData)

    })

})

function login(dataObj){

    $.ajax({
        url: '../server/login.php',
        type: 'POST',
        dataType: 'json',
        data: dataObj,
        success: data => {
            if(data.msg == 'OK'){
                window.location = 'agenda.html'
            } else alert(data.msg)
        },
        error: () => alert('Error en la comunicación con el servidor')
    })

}