
$(() => {

    $('#btn-enviar').click(() => {

        var formData = {
            nombre: $('#nombre').val(),
            fecha: $('#fecha_nacimiento').val(),
            correo: $('#correo').val(),
            contrasena: $('#contrasena').val()
        }

        createUser(formData)

    })

})

function createUser(dataObj){

    $.ajax({
        url: '../server/create_user.php',
        type: 'POST',
        dataType: 'json',
        data: dataObj,
        success: data => {
            if(data.msg == 'OK'){
                window.location = 'index.html'
            } else alert(data.msg)
        },
        error: () => alert('Error en la comunicación con el servidor')
    })

}