function Image_names() {
    var mask_names = [];
    var original_names = [];
    var referencia;
    var componente;
    var acabado;
    this.getReferencia = function(){
        return referencia;
    };
    this.getComponente = function() {
        return componente;
    }
    this.getAcabado = function() {
        return acabado;
    }
    this.setReferencia = function(ref){
        referencia = ref;
    }
    this.setComponente = function(comp) {
        componente = comp;
    }
    this.setAcabado = function(acab) {
        acabado = acab;
    }
}
