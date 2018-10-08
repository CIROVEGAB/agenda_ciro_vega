<?php

    require_once('./ConnectDB.php');

    $data['nombre']             = trim($_POST['nombre']);
    $data['fecha_nacimiento']   = trim($_POST['fecha']);
    $data['email']              = trim($_POST['correo']);
    $data['contrasena']         = trim(password_hash($_POST['contrasena'], PASSWORD_DEFAULT));

    $con = new ConnectDB('localhost', 'root', '');
    $response['conexion'] = $con->initConnection('agenda');

if ($response['conexion'] == 'OK') {
    if ($con->insertData('usuarios', $data)) {
        $response['msg'] = 'OK';
    } else {
        $response['msg'] = 'Hubo un error y el usuario no ha sido creado';
    }

    $con->closeConnection();
} else {
    $response['msg'] = 'No se pudo conectar a la base de datos';
}

    echo json_encode($response);
