function Debug() {
    var div = '#consola';
    this.vacia_consola = function() {
        $(div).html('');
    }
    this.log = function(string) {
        $(div).html(string);
    }
    this.append_line = function(string) {
        $(div).append(string + '<br/>');
    }
}
