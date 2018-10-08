
$(() => {

    verificarUsuarioDemo()

    $('.loginButton').on('click', () => login())

})

let showMessage = response => $('#message').show('fold').html(`<p>${response}</p>`),
    verificarUsuarioDemo = () => $.post('/usuarios/demo', {}, response => showMessage(response)),
    login = () => {

        let user = $('#user').val(),
            pass = $('#pass').val()

        if(user != '' && pass != ''){

            $.post(
                '/usuarios/login',
                {
                    user: user,
                    pass: pass
                }, 
                response => {
                    showMessage(response)
                    if(response == 'Validado')
                        window.location.href = 'http://localhost:3000/agenda'
                }
            )

        } else alert('Complete todos los campos')

    }