<?php

    require_once('./ConnectDB.php');

    $con = new ConnectDB('localhost', 'root', '');
    $response['conexion'] = $con->initConnection('agenda');

    if($response['conexion'] == 'OK'){

        if($con->deleteRegister('eventos', 'id = '.$_POST['id'])){
            
            $response['msg'] = 'OK';

        } else $response['msg'] = 'Hubo un error en la eliminación del evento';

        $con->closeConnection();

    } else $response['msg'] = 'No se pudo conectar a la base de datos';

    echo json_encode($response);