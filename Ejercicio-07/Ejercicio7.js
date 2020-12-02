class Encabezados {

    constructor() {}

    ocultar() {
        $("h1, h2, h3").hide();
    }

    mostrar() {
        $("h1, h2, h3").show();
    }

}

class Animal {

    constructor() {}

    mostrarPuma() {
        $("#texto-animal").text("Puma");
        $("#img-animal").attr("src", "https://okdiario.com/img/2019/06/24/puma-en-peligro-de-extincion.jpg");
    }

    mostrarOso() {
        $("#texto-animal").text("Oso");
        $("#img-animal").attr("src", "https://www.ngenespanol.com/wp-content/uploads/2018/09/oso-grizzly-caza.png");
    }

}

class ControlParrafos {

    constructor() {}
    
    addParrafo() {
        let txt = $("#add-parrafo input[type=text]").val();
        let p = document.createElement("p");
        p.innerHTML = txt;
        $("#add-parrafos").append(p);
        $("#add-parrafo input[type=text]").val('');
    }

    eliminarParrafo() {
        $("#add-parrafos p").last().remove();
    }

}

class Traverser {

    constructor() {}

    recorrerDOM() {
        $("*", document.body).each(function() {
            console.log($(this).parent().tagName);
            let padre = $(this).parent().get(0).tagName;
            $(this).prepend(document.createTextNode( "Etiqueta padre : <"  + padre + "> elemento : <" + $(this).get(0).tagName +"> valor: "));
        });
    }

}


class SumarTabla {

    constructor() {}

    sumar() {
        let sum = 0;
        $("table td").each(function() {
            let textoCelda = $(this).text();
            sum += parseInt(textoCelda, 10);
        });

        $("#sumar-tabla input[type=text]").val(sum);
    }

}

var encabezados = new Encabezados();
var animal = new Animal();
var controlParrafos = new ControlParrafos();
var traverser = new Traverser();
var sumarTabla = new SumarTabla();