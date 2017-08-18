<?php

    header('Content-Type:text/html; charset=utf-8');
    if(!file_exists('../_imagenes/resultado/')) {
        mkdir('../_imagenes/resultado/', 0777, true);
    }

    $nombre_mascara = $_POST['nombre_mascara'];
    $nombre_original = $_POST['nombre_original'];
    $img = $_POST['imagen'];

    $referencia = explode("_",$nombre_mascara)[0];
    $componente = explode("_",$nombre_mascara)[1];
    $componente = explode('.',$componente)[0];
    $acabado = explode("_",$nombre_original)[1];
    $acabado = explode(".",$acabado)[0];
    $nombreImagen = $referencia."_".$componente."_".$acabado;

    define('UPLOAD_DIR', '../_imagenes/resultado/');
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $file = UPLOAD_DIR . $nombreImagen . '.png';
    $success = file_put_contents($file, $data);
    echo 'exito';
?>
