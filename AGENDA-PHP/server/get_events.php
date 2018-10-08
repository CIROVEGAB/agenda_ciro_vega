<?php

    session_start();

    require_once('./ConnectDB.php');

    $con = new ConnectDB('localhost', 'root', '');
    $response['conexion'] = $con->initConnection('agenda');

    if($response['conexion'] == 'OK'){
        
        $resultado_consulta = $con->consultation(['eventos'], ['id', 'titulo', 'fecha_inicial', 'fecha_final', 'hora_inicial', 'hora_final', 'dia_completo'], 'WHERE ev_usuario = "'.$_SESSION['index'].'"');

        $i = 0;

        while($row = $resultado_consulta->fetch_assoc()):

            $data[$i]['id']         = $row['id'];
            $data[$i]['title']      = $row['titulo'];
            $data[$i]['start']      = $row['fecha_inicial'];
            $data[$i]['end']        = $row['fecha_final'];

            if($row['dia_completo'] == 0){
                $data[$i]['allDay'] = false;
            } else $data[$i]['allDay'] = true;

            $i++;

        endwhile;

        $response['nombre'] = $_SESSION['name'];

        if(count($data) > 0){

            $response['eventos'] = $data;
            $response['msg'] = 'OK';

        } else $response['msg'] = 'Hubo un error en la consulta de eventos';

        $con->closeConnection();

    } else $response['msg'] = 'No se pudo conectar a la base de datos';

    echo json_encode($response);