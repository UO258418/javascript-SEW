class GeoLocalizacion {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosition.bind(this));
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

}

var geoLocation = new GeoLocalizacion();