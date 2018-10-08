<?php

    session_start();

    require_once('./ConnectDB.php');

    $data['titulo']         = trim($_POST['titulo']);
    $data['fecha_inicial']  = trim($_POST['start_date']);
    $data['ev_usuario']     = $_SESSION['index'];
    
    if($_POST['allDay'] == 'true'){
        $data['dia_completo'] = 1;
    } else{
        $data['dia_completo'] = 0;
    }

    if($data['dia_completo'] == 0){
        $data['fecha_final']    = trim($_POST['end_date']);
        $data['hora_inicial']   = trim($_POST['start_hour']);
        $data['hora_final']     = trim($_POST['end_hour']);
    } else{
        $data['fecha_final']    = $data['fecha_inicial'];
        $data['hora_inicial']   = '';
        $data['hora_final']     = '';
    }

    $con = new ConnectDB('localhost', 'root', '');
    $response['conexion'] = $con->initConnection('agenda');

    if($response['conexion'] == 'OK'){

        if($con->insertData('eventos', $data)){

            $response['msg'] = 'OK';

        } else $response['msg'] = 'Hubo un error y el evento no se ha añadido';

        $con->closeConnection();

    } else $response['msg'] = 'No se pudo conectar a la base de datos';

    echo json_encode($response);