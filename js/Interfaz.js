function Interfaz() {
        this.MENU_PRINCIPAL = `
        <p>Ejecuta por carpeta funciona como el antiguo programa. Da por hecho que ya has colocado los archivos en las carpetas correspondientes.</p>
        <p>Subir archivos te permite elegir desde el explorador de tu ordenador los archivos.</p>
        <div class = 'container' align = 'center'>
            <button class = 'btn btn-default' id = 'boton_muestra_ejectua_carpeta'>Ejecuta por carpeta</button>
            <button class = 'btn btn-default disabled' id = 'boton_muestra_subir_archivos'>Subir archivos</button>
        </div>
        `;

        this.MENU_EJECUTA_CARPETA = `
        <ul class ='list-group'>
            <li class = 'list-group-item'>Copia las imágenes de la máscara en la carpeta _imagenes/mascaras</li>
            <li class = 'list-group-item'>Las imágenes se deben llamar referencia_componente.png. El componente debe seguir la nomenclatura de <a href = 'https://es.wikipedia.org/wiki/CamelCase' target = '_blank'>camelcase</a> sin tildes. Ej:1270_cajonInferior.png</li>
            <li class = 'list-group-item'>Copia las imagenes a recortar en la carpeta _imagenes/originales</li>
            <li class = 'list-group-item'>Las imágenes se deben llamar referencia_acabado.png. El componente debe seguir la nomenclatura de <a href = 'https://es.wikipedia.org/wiki/CamelCase' target = '_blank'>camelcase</a> sin tildes. Ej:1270_verdeEpoca.png</li>
            <li class = 'list-group-item'>Si todo está correcto dale al botón de comenzar</li>
            <li class = 'list-group-item'>Cuando en la consola te avise que ha terminado, busca las imágenes finales en _imagenes/resultado</li>
        </ul>
        <div class = 'container' align = 'center'>
            <button class = 'btn btn-default' id = 'boton_ejecutar_carpeta'>Comenzar</button>
            <button class = 'btn btn-default' id = 'boton_volver_principal'>Volver</button>
        </div>
        `;

        this.MENU_SUBIR_ARCHIVOS = `
        <ul>
            <li>Menu subir archivos</li>
            <button class = 'btn btn-default' id = 'boton_buscar_archivos'>Buscar</button>
            <button class = 'btn btn-default' id = 'boton_volver_principal'>Volver</button>
        </ul>
        `;
}
