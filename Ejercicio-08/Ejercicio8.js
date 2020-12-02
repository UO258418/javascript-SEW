class Meteo {

    constructor() {
        this.apikey = "53edf51783988513ce176ca48faa8972";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=";
        this.error = "<h2>No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
        this.section;
    }

    cargarDatos(ciudad) {
        $.ajax({
            dataType: "json",
            url: `${this.url}${ciudad}${this.unidades}${this.idioma}&APPID=${this.apikey}`,
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
        nombre.innerHTML = datos.name;
        this.section.appendChild(nombre);

        // icono
        let icono = document.createElement("img");
        icono.src = `http://openweathermap.org/img/w/${datos.weather[0].icon}.png`;
        this.section.appendChild(icono);

        this.createHtml("Pais", datos.sys.country);
        this.createHtml("Latitud", datos.coord.lat); 
        this.createHtml("Longitud", datos.coord.lon); 
        this.createHtml("Temperatura", datos.main.temp);
        this.createHtml("Temperatura máxima", datos.main.temp_max);
        this.createHtml("Temperatura mínima", datos.main.temp_min);
        this.createHtml("Presión", datos.main.pressure, " milímetros");
        this.createHtml("Humedad", datos.main.humidity, "%");
        this.createHtml("Amanece a las", new Date(datos.sys.sunrise * 1000).toLocaleTimeString());
        this.createHtml("Oscurece a las", new Date(datos.sys.sunset * 1000).toLocaleTimeString());
        this.createHtml("Dirección del viento", datos.wind.deg, " deg");
        this.createHtml("Velocidad del viento", datos.wind.speed, " metros/segundo");
        this.createHtml("Hora de la medida", new Date(datos.dt * 1000).toLocaleTimeString());
        this.createHtml("Fecha de la medida", new Date(datos.dt * 1000).toLocaleDateString());
        this.createHtml("Descripcion", datos.weather[0].description);
        this.createHtml("Visibilidad", datos.visibility, " metros");
        this.createHtml("Nubosidad", datos.clouds.all, "%");
        
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