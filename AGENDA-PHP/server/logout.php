<?php

    session_start();

    if($_SESSION['user'] == null || $_SESSION['user'] == ''){

        echo 'No tiene acceso!';

        die();

    } else session_destroy();