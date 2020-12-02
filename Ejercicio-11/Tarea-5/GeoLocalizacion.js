class GeoLocalizacion {

    constructor() {
        this.currentParent;
    }

    getPosition(position) {
        this.longitud = position.coords.longitude;
        this.latitud = position.coords.latitude;
        this.precision = position.coords.accuracy;
        this.altitud = position.coords.altitude;
        this.precisionAltitud = position.coords.altitudeAccuracy;
        this.rumbo = position.coords.heading;
        this.velocidad = position.coords.speed;
    }

    initDynamicMap() {
        var centro = { lat: 43.3672702, lng: -5.8502461 };
        var mapaGeoposicionado = new google.maps.Map(document.getElementById('dynamicMap'), {
            zoom: 8,
            center: centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        let infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Localización encontrada');
                infoWindow.open(mapaGeoposicionado);
                mapaGeoposicionado.setCenter(pos);
            }, function () {
                this.handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
        }
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: Ha fallado la geolocalización' :
            'Error: Su navegador no soporta geolocalización');
        infoWindow.open(mapaGeoposicionado);
    }

}

var geoLocation = new GeoLocalizacion();