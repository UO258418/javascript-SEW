class GeoLocalizacion {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosition.bind(this), this.showError);
        this.currentParent;
    }

    getPosition(position) {
        this.longitud         = position.coords.longitude; 
        this.latitud          = position.coords.latitude;  
        this.precision        = position.coords.accuracy;
        this.altitud          = position.coords.altitude;
        this.precisionAltitud = position.coords.altitudeAccuracy;
        this.rumbo            = position.coords.heading;
        this.velocidad        = position.coords.speed;   
        this.showPosition();
        this.showGoogleStaticMap();
    }

    showPosition() {
        this.currentParent = document.getElementById("position");
        this.createHtml("Longitud", this.longitud);
        this.createHtml("Latitud", this.latitud);
        this.createHtml("Precision", this.precision);
        this.createHtml("Altitud", this.altitud);
        this.createHtml("Precion de la altitud", this.precisionAltitud);
        this.createHtml("Rumbo", this.rumbo);
        this.createHtml("Velocidad", this.velocidad);
    }

    createHtml(title, value) {
        let p = document.createElement("p");
        p.innerHTML = `<b>${title}:</b> ${value}`;
        this.currentParent.appendChild(p);
    }

    showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no permite la petición de geolocalización";
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible";
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado";
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido";
                break;
        }
        //alert(this.mensaje);
    }

    showGoogleStaticMap(){
        this.currentParent = document.getElementById("map");
        
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        //URL: obligatoriamente https
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        //Parámetros
        // centro del mapa (obligatorio si no hay marcadores)
        var centro = "center=" + this.latitud + "," + this.longitud;
        //zoom (obligatorio si no hay marcadores)
        //zoom: 1 (el mundo), 5 (continentes), 10 (ciudad), 15 (calles), 20 (edificios)
        var zoom ="&zoom=15";
        //Tamaño del mapa en pixeles (obligatorio)
        var tamaño= "&size=800x600";
        //Escala (opcional)
        //Formato (opcional): PNG,JPEG,GIF
        //Tipo de mapa (opcional)
        //Idioma (opcional)
        //region (opcional)
        //marcadores (opcional)
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        //rutas. path (opcional)
        //visible (optional)
        //style (opcional)
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        this.currentParent.innerHTML = "<img src='"+this.imagenMapa+"'/>";
    }

}


var geoLocation = new GeoLocalizacion();