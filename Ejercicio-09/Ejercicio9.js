class Meteo {

    constructor() {
        this.apikey = "53edf51783988513ce176ca48faa8972";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.tipo = "&mode=xml";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=";
        this.error = "<h2>No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
        this.section;
    }

    cargarDatos(ciudad) {
        $.ajax({
            dataType: "xml",
            url: `${this.url}${ciudad}${this.tipo}${this.unidades}${this.idioma}&APPID=${this.apikey}`,
            method: 'GET',
            success: function(data) {
                this.verDatos(data);
            }.bind(this),
            error: function() {
                document.write(this.error);
            }.bind(this)
        });
    }

    verJSON(datos) {
        document.write("<h2>JSON</h2>");
        let str = JSON.stringify(datos, null, 2);
        document.write(`<pre>${str}</pre>`);
    }

    verDatos(datos) {
        // section para la ciudad
       this.section = document.createElement("section");
        
        // nombre
        let nombre = document.createElement("h2");
        nombre.innerHTML = $('city',datos).attr("name");
        this.section.appendChild(nombre);

        // Icono
        let icono = document.createElement("img");
        icono.src = `http://openweathermap.org/img/w/${$('weather', datos).attr("icon")}.png`;
        this.section.appendChild(icono);

        this.createHtml("Pais", $('country',datos).text());
        this.createHtml("Latitud", $('coord',datos).attr("lon")); 
        this.createHtml("Longitud", $('coord',datos).attr("lat")); 

        // Temperatura
        let unidadTemperatura = " grados " + $('temperature',datos).attr("unit");
        this.createHtml("Temperatura", $('temperature',datos).attr("value"), unidadTemperatura);
        this.createHtml("Temperatura máxima", $('temperature',datos).attr("max"), unidadTemperatura);
        this.createHtml("Temperatura mínima", $('temperature',datos).attr("min"), unidadTemperatura);

        // Presion
        let unidadPresion = $('pressure',datos).attr("unit");
        this.createHtml("Presión", $('pressure',datos).attr("value"), unidadPresion);

        // Humedad
        let unindadHumedad = $('humidity',datos).attr("unit");
        this.createHtml("Humedad",  $('humidity',datos).attr("value"), unindadHumedad);

        // Amanecer
        let amanecer              = $('sun',datos).attr("rise");
        let minutosZonaHoraria    = new Date().getTimezoneOffset();
        let amanecerMiliSeg1970   = Date.parse(amanecer) - minutosZonaHoraria * 60 * 1000;
        let amanecerLocal         = new Date(amanecerMiliSeg1970).toLocaleTimeString("es-ES");
        this.createHtml("Amanece a las", amanecerLocal);

        // Atardecer
        let oscurecer             = $('sun',datos).attr("set");          
        let oscurecerMiliSeg1970  = Date.parse(oscurecer) - minutosZonaHoraria * 60 * 1000;
        let oscurecerLocal        = new Date(oscurecerMiliSeg1970).toLocaleTimeString("es-ES");
        this.createHtml("Oscurece a las", oscurecerLocal);

        this.createHtml("Dirección del viento", $('direction',datos).attr("value"), " deg");
        this.createHtml("Velocidad del viento", $('speed',datos).attr("value"), " metros/segundo");

        // Hora  y fecha de la medida
        let horaMedida            = $('lastupdate',datos).attr("value");
        let horaMedidaMiliSeg1970 = Date.parse(horaMedida) - minutosZonaHoraria * 60 * 1000;
        let horaMedidaLocal       = new Date(horaMedidaMiliSeg1970).toLocaleTimeString("es-ES");
        let fechaMedidaLocal      = new Date(horaMedidaMiliSeg1970).toLocaleDateString("es-ES");
        this.createHtml("Hora de la medida", horaMedidaLocal);
        this.createHtml("Fecha de la medida", fechaMedidaLocal);

        this.createHtml("Descripcion", $('weather',datos).attr("value"));
        this.createHtml("Visibilidad", $('visibility',datos).attr("value"), " metros");
        this.createHtml("Nubosidad", $('clouds',datos).attr("value"), "%");
        
        document.body.appendChild(this.section);
    }

    createHtml(title, content, subfix = "") {
        let p = document.createElement("p");
        p.innerHTML = `<b>${title}:</b> ${content}${subfix}`;
        this.section.appendChild(p);
    }

}

var meteo = new Meteo();
meteo.cargarDatos("Cadaques");
meteo.cargarDatos("Empuriabrava");
meteo.cargarDatos("Cangas de Onís");