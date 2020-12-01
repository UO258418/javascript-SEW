class Calculadora {

    constructor() {
        this.pantalla = "0";
        this.display = document.querySelector(".display");

        // memoria
        this.lastResult = 0;
        this.actualizarPantalla();


        this.reemplazos = {
            factorial: {
                searchValue: new RegExp(/(\d+)!/g),
                replaceValue: (n) => {
                    let number = parseInt(n.replace('!', ''))
                    return this.calcularFactorial(number)
                }
            },
            PI: {
                searchValue: '\u03a0',
                replaceValue: (n) => Math.PI
            },
            log: {
                searchValue: new RegExp(/log\(.+\)/g),
                replaceValue: (n) => {
                    let number = this.evalBetween(n, "log")
                    return Math.log10(number)
                }
            },
            ln: {
                searchValue: new RegExp(/ln\(.+\)/g),
                replaceValue: (n) => {
                    let number = this.evalBetween(n, "ln")
                    return Math.log(number)
                }
            },
            sr: {
                searchValue: new RegExp(/\u221A\(.+\)/g),
                replaceValue: (n) => {
                    let number = this.evalBetween(n, '\u221A')
                    return Math.sqrt(number)
                }
            },
            sin: {
                searchValue: new RegExp(/sin\(.+\)/g),
                replaceValue: (n) => {
                    let number = this.evalBetween(n, "sin")
                    return Math.sin(number)
                }
            },
            cos: {
                searchValue: new RegExp(/cos\(.+\)/g),
                replaceValue: (n) => {
                    let number = this.evalBetween(n, "cos")
                    return Math.cos(number)
                }
            },
            tan: {
                searchValue: new RegExp(/tan\(.+\)/g),
                replaceValue: (n) => {
                    let number = this.evalBetween(n, "tan")
                    return Math.tan(number)
                }
            },
            pow: {
                searchValue: new RegExp(/\d+(\.\d+)?\^\d+(\.\d+)?/g),
                replaceValue: (n) => {
                    let numbers = n.split("^")
                    return Math.pow(numbers[0], numbers[1])
                }
            }
        }
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

    borrar() {
        this.pantalla = "0";
        this.actualizarPantalla();
    }

    borrarUltimo() {
        if (this.pantalla.length > 0) {
            this.pantalla = this.pantalla.slice(0, -1)
        }

        if (this.pantalla.length == 0) {
            this.pantalla = 0
        }

        this.actualizarPantalla()
    }

    igual() {
        this.pantalla = this.calcular(this.pantalla);
        this.actualizarPantalla();
    }

    parentesis(parentesis) {
        this.meterEnPantalla(parentesis);
        this.actualizarPantalla();
    }

    cambiarSigno() {
        if (this.lastCharacter() == '-') {
            this.borrarUltimo()
        } else {
            this.resta()
        }
    }

    factorial() {
        this.meterEnPantalla('!')
        this.actualizarPantalla()
    }

    PI() {
        this.meterEnPantalla('\u03a0')
        this.actualizarPantalla()
    }

    log() {
        this.meterEnPantalla("log(")
        this.actualizarPantalla()
    }

    squareRoot() {
        this.meterEnPantalla("\u221A(")
        this.actualizarPantalla()
    }

    sin() {
        this.meterEnPantalla("sin(")
        this.actualizarPantalla()
    }

    cos() {
        this.meterEnPantalla("cos(")
        this.actualizarPantalla()
    }

    tan() {
        this.meterEnPantalla("tan(")
        this.actualizarPantalla()
    }

    pow2() {
        this.meterEnPantalla("^2")
        this.actualizarPantalla()
    }

    pow() {
        this.meterEnPantalla("^")
        this.actualizarPantalla()
    }

    ln() {
        this.meterEnPantalla("ln(")
        this.actualizarPantalla()
    }

    tenToThePow() {
        this.meterEnPantalla("10^")
        this.actualizarPantalla()
    }

    ans() {
        this.meterEnPantalla(this.lastResult)
        this.actualizarPantalla()
    }

    random() {
        this.meterEnPantalla(Math.random())
        this.actualizarPantalla()
    }

    // Util
    calcularFactorial(n) {
        var total = 1;
        for (let i = 1; i <= n; i++) {
            total = total * i;
        }
        return total;
    }

    lastCharacter() {
        return this.pantalla.charAt(this.pantalla.length - 1)
    }

    evalBetween(str, prefix) {
        let number = str.replace(prefix + "(", "").slice(0, -1)
        return eval(number)
    }

    // Pantalla
    actualizarPantalla() {
        this.display.value = this.pantalla;
    }

    meterEnPantalla(valor) {
        this.pantalla = String(this.pantalla == 0 ? valor : this.pantalla + valor);
    }

    // Calcular
    calcular(retornoSiHayError) {
        // reemplazos

        if(isNaN(this.pantalla)) {
            for (const key in this.reemplazos) {
                let reemplazo = this.reemplazos[key]
                this.pantalla = this.pantalla.replace(reemplazo.searchValue, reemplazo.replaceValue)
            }
        }

        try {
            let result = eval(this.pantalla)
            this.lastResult = result
            return result;
        } catch (error) {
            return retornoSiHayError;
        }
    }

}

var calculadora = new Calculadora();