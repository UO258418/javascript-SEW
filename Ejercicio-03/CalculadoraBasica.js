class Calculadora {

    constructor() {
        this.pantalla = "0";
        this.display = document.querySelector(".display");

        // memoria
        this.memoria = 0;

        this.actualizarPantalla();
    }

    digitos(digito) {
        this.meterEnPantalla(digito);
        this.actualizarPantalla();
    }

    punto() {
        this.meterEnPantalla('.');
        this.actualizarPantalla();
    }

    suma() {
        this.meterEnPantalla('+');
        this.actualizarPantalla();
    }

    resta() {
        this.meterEnPantalla('-');
        this.actualizarPantalla();
    }

    multiplicacion() {
        this.meterEnPantalla('*');
        this.actualizarPantalla();
    }

    division() {
        this.meterEnPantalla('/');
        this.actualizarPantalla();
    }

    mrc() {
        this.pantalla = this.memoria;
        this.actualizarPantalla();
    }

    mMenos() {
        this.memoria -= this.calcular(0);
    }

    mMas() {
        this.memoria += this.calcular(0);
    }

    borrar() {
        this.pantalla = "0";
        this.actualizarPantalla();
    }

    igual() {
        this.pantalla = this.calcular(this.pantalla);
        this.actualizarPantalla();
    }

    actualizarPantalla() {
        this.display.value = this.pantalla;
    }

    meterEnPantalla(valor) {
        this.pantalla = this.pantalla == 0 ? valor : this.pantalla + valor;
    }

    calcular(retornoSiHayError) {
        try {
            return eval(this.pantalla);
        } catch(error) {
            return retornoSiHayError;
        }
    }

}

var calculadora = new Calculadora();