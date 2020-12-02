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

}

var geoLocation = new GeoLocalizacion();