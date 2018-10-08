<?php

    require_once('./ConnectDB.php');

    $idEvent                = $_POST['id'];
    $data['fecha_inicial']  = $_POST['fecha_inicial'];
    $data['fecha_final']    = $_POST['fecha_final'];

    $con = new ConnectDB('localhost', 'root', '');
    $response['conexion'] = $con->initConnection('agenda');

    if($response['conexion'] == 'OK'){

        if($con->updateRegister('eventos', $data, "id = {$idEvent}")){
            
            $response['msg'] = 'OK';

        } else $response['msg'] = 'Hubo un error en la actualización del evento';

        $con->closeConnection();

    } else $response['msg'] = 'No se pudo conectar a la base de datos';

    echo json_encode($response);