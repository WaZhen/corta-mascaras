function Escaner(debug) {
    this.lee_carpeta_mascara = function() {
        $.ajax({
            url:'ajax/escanea_mascara.php',
            type: 'POST',
            success: success_mascara,
            error: error_mascara
        });
    }
    var split = function(string) {
        return string.split(';');
    };
    var print_splitted = function(array) {
        for(var i in array) {
            debug.append_line(array[i]);
        }
    }
    var success_mascara = function(data) {
        debug.log('Las máscaras son: <br/>');
        var split_serialized_mask = split(data);
        print_splitted(split_serialized_mask);
    };
    var error_mascara = function(data) {
        debug.log('Error: </br>');
        debug.append_line(data);
    };

    this.lee_carpeta_originales = function() {
        $.ajax({
            url:'ajax/escanea_originales.php',
            type: 'POST',
            success: success_originales,
            error: error_originales
        });
    }
    var success_originales = function(data) {
        debug.append_line('<br/><br/>Las imagenes originales son: <br/>');
        var split_serialized_original = split(data);
        print_splitted(split_serialized_original);
    };
    var error_originales = function(data) {
        debug.log('Error: </br>');
        debug.append_line(data);
    };
}
