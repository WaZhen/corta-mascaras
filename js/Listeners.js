function Listeners(interfaz, debug, escaner, image_names) {
    $('#contenedor_principal').on('click', '#boton_muestra_ejectua_carpeta', function() {
        $('#contenedor_principal').html(interfaz.MENU_EJECUTA_CARPETA);
        escaner.lee_carpeta_mascara();
        escaner.lee_carpeta_originales();
        set_image_names_arrays();
    });

    $('#contenedor_principal').on('click', '#boton_muestra_subir_archivos', function() {
        // $('#contenedor_principal').html(interfaz.MENU_SUBIR_ARCHIVOS);
    });

    $('#contenedor_principal').on('click', '#boton_volver_principal', function() {
        $('#contenedor_principal').html(interfaz.MENU_PRINCIPAL);
        debug.vacia_consola();
    });

    $('#contenedor_principal').on('click', '#boton_ejecutar_carpeta', function() {
        $(this).hide();
        $('#boton_volver_principal').hide();
        debug.log('Comenzando... <br/>');
        var recortador_imagenes = new Recorta_imagenes(image_names.mask_names, image_names.original_names, '_imagenes/mascaras', '_imagenes/originales', debug);
    });

    $('#contenedor_principal').on('click', '#boton_descargar_resultado', function(){
        // $(this).hide();
        // $('#boton_volver_principal').show();
        // var descargar_resultado = new DescargarResultado();
    })

    var set_image_names_arrays = function() {
        $.post('ajax/escanea_mascara.php', function(data) {
            image_names.mask_names = data.split(';');
        });
        $.post('ajax/escanea_originales.php', function(data) {
            image_names.original_names = data.split(';');
        });
    }
}
