<?php

    session_start();

    require_once('./ConnectDB.php');

    $_SESSION['user'] = trim($_POST['user']);

    
    $con = new ConnectDB('localhost', 'root', '');
    $response['conexion'] = $con->initConnection('agenda');

if ($response['conexion'] == 'OK') {
    $resultado_consulta = $con->consultation(['usuarios'], ['id', 'nombre', 'contrasena'], 'WHERE email = "'.$_SESSION['user'].'"');

    $data = $resultado_consulta->fetch_assoc();

    $_SESSION['index'] = $data['id'];

    $_SESSION['name'] = $data['nombre'];

    $hash = $data['contrasena'];

    $password = trim($_POST['contrasena']);

    if (password_verify($password, $hash)) {
        $response['msg'] = 'OK';
    } else {
        $response['msg'] = 'Contraseña o Usuario incorrecto o no registrado.';
    }

    $con->closeConnection();
} else {
    $response['msg'] = 'No se pudo conectar a la base de datos';
}

    echo json_encode($response);
