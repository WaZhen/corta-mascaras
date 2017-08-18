$('document').ready(function() {
    var debug = new Debug();
    var interfaz = new Interfaz();
    var escaner = new Escaner(debug);
    var image_names = new Image_names();
    var listeners = new Listeners(interfaz, debug, escaner, image_names);
});
