<?php
header('Content-Type:text/html; charset=utf-8');
$originales = scandir('../_imagenes/originales');

$first = true;
foreach($originales as $imagen) {
    if($imagen != '.' && $imagen != '..'){
        if($first) {
            echo "$imagen";
            $first = false;
        }  else {
            echo ";$imagen";
        }
    }
}
?>
