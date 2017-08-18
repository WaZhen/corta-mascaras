function Recorta_imagenes(array_nombres_mascara, array_nombres_originales, url_mascara, url_originales, debug) {
    var nombres_mascaras = array_nombres_mascara;
    var nombres_originales = array_nombres_originales;
    var url_mascara = url_mascara;
    var url_originales = url_originales;
    var mascara_actual = 0;
    var original_actual = 0;

    var progreso = 0;

    var img_mascara = new Image();
    var img_original = new Image();

    var mask_data;

    var escanea_mascara = function(){ // recursiva
        actualizaProgreso();
        busca_mascara(nombres_mascaras[mascara_actual]);
    };

    var actualizaProgreso = function() {
        $('#mi_progreso').removeClass('progress-bar-success');
        $('#mi_progreso').removeClass('progress-bar-danger');
        elementos_escaneados = original_actual + mascara_actual * nombres_originales.length;
        elementos_totales = nombres_mascaras.length * nombres_originales.length;
        progreso = elementos_escaneados / elementos_totales * 100;
        $('#mi_progreso').css('width', progreso+'%');
        debug.log(nombres_mascaras[mascara_actual] + "_" + nombres_originales[original_actual]);
    };

    var busca_mascara = function(nombre_mascara) {
        img_mascara.src = url_mascara + '/' + nombre_mascara;
        img_mascara.onload = function() {
            //console.log('mascara: ' + this.width + 'px');
            //debug.append_line('<br/>' + nombres_mascaras[mascara_actual] + '</br>');
            // debug.log(nombres_mascaras[mascara_actual] + '</br>');

            mask_data = crea_canvas_mascara_dibuja_toma_datos(this);
            escanea_originales();
        }
    };

    var crea_canvas_mascara_dibuja_toma_datos = function(imagen) {
        $('#contiene_canvas').html("<canvas id = 'canvas_mascara' width="+imagen.width+"px height="+imagen.height+"px></canvas>");
        var mask_canvas = document.getElementById('canvas_mascara');
        var mask_ctx = mask_canvas.getContext('2d');
        mask_ctx.drawImage(imagen, 0, 0);
        var mask_data = mask_ctx.getImageData(0, 0, imagen.width, imagen.height);
        return mask_data;
    }

    escanea_originales = function() { // recursiva
        actualizaProgreso();
        busca_original(nombres_originales[original_actual]);
    };

    var busca_original = function(nombre_original) {
        img_original.src = url_originales + '/' + nombre_original;
        img_original.onload = function() {
            gestiona_imagen_original(this);
        }
    };

    var gestiona_imagen_original = function(imagen) {
        //imprime_informacion_imagen_original(imagen);
        var original_data = crea_canvas_original_dibuja_toma_datos(imagen);
        crea_recorte(original_data, imagen.width, imagen.height);
        // console.log(original_data);

    };

    var crea_canvas_original_dibuja_toma_datos = function(imagen){
        $('#contiene_canvas').append("<canvas id = 'canvas_original' width="+imagen.width+"px height="+imagen.height+"px></canvas>");
        var original_canvas = document.getElementById('canvas_original');
        var original_ctx = original_canvas.getContext('2d');
        original_ctx.drawImage(imagen,0,0);
        var original_data = original_ctx.getImageData(0, 0, imagen.width, imagen.height);
        return original_data
    };

    var crea_recorte = function(original_data, width, height) {
        for(var i = 0; i < mask_data.data.length; i+=4){
            var r = i; var g = i+1; var b = i+2; var a = i+3;
            if(mask_data.data[a] > 0) {
                mask_data.data[r] = original_data.data[r];
                mask_data.data[g] = original_data.data[g];
                mask_data.data[b] = original_data.data[b];
                //mask_data.data[a] = original_data.data[a];
            }
        }
        var mask_canvas = document.getElementById('canvas_mascara');
        var mask_ctx = mask_canvas.getContext('2d');
        mask_ctx.putImageData(mask_data, 0, 0);
        guarda_imagen_resultado();
    };

    var guarda_imagen_resultado = function() {
        var resultado = document.getElementById('canvas_mascara');
        var data_url = resultado.toDataURL('image/png');
        $.ajax({
            url:'ajax/guarda_imagen.php',
            type:'POST',
            data:{imagen:data_url, nombre_mascara:nombres_mascaras[mascara_actual], nombre_original:nombres_originales[original_actual]},
            success:exitoGuardaImagen,
            error:errorGuardaImagen
        });
    };

    var exitoGuardaImagen = function(data) {
        // console.log(data);
        if(data = 'exito'){
            llama_siguiente_original_o_mascara();
        } else {
            debug.log('ha ocurrido un error guardando el recorte: ' + nombres_mascaras[mascara_actual] + ', ' + nombres_originales[original_actual]);
        }
    }

    var errorGuardaImagen = function(data) {
        console.log(data);
    }


    var imprime_informacion_imagen_original = function(imagen) {
        console.log('acabado ' + nombres_originales[original_actual] + ': ' + imagen.width + 'px');
        debug.append_line('~~~~~~'+nombres_originales[original_actual]);
    };

    var llama_siguiente_original_o_mascara = function() {
        if(original_actual < nombres_originales.length-1) {
            siguiente_original();
        } else {
            original_actual = 0;
            llama_siguiente_mascara();
        }
    };

    var siguiente_mascara = function() {
        mascara_actual++;
        escanea_mascara();
    };

    var siguiente_original = function() {
        original_actual++;
        escanea_originales();
    };

    var llama_siguiente_mascara = function() {
        if(mascara_actual < nombres_mascaras.length-1) {
            siguiente_mascara();
        } else {
            mascara_actual = 0;
            progreso_cien();
        }
    };

    var progreso_cien = function() {
        $('#mi_progreso').css('width', '100%');
        $('#mi_progreso').removeClass('progress-bar-danger');
        $('#mi_progreso').addClass('progress-bar-success');
        debug.log('Completado');
        $('#contiene_canvas').html('');
        $('#contenedor_principal > .container').append('<button class = "btn btn-default disabled" id = "boton_descargar_resultado">Descargar</button>');
        $('#boton_volver_principal').show();
        $('#boton_ejecutar_carpeta').show();
    };

    escanea_mascara();
}
