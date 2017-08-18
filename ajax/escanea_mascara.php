<?php
    header('Content-Type:text/html; charset=utf-8');

    $mascaras = scandir('../_imagenes/mascaras');
    $first = true;
    foreach($mascaras as $mascara) {
        if($mascara != '.' && $mascara != '..'){
            if($first) {
                echo "$mascara";
                $first = false;
            } else {
                echo ";$mascara";
            }
        }
    }


?>
