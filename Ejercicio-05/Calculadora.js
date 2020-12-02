class Calculadora {

    constructor() {
        // Pila de la memoria
        this.stack = new Stack()

        // Pantalla
        this.display = new Display(4, this.stack)

        // Currently on screen
        this.currentScreenContent = 0;

        // Operators
        this.operators = {
            '+': () => this.binaryOperation((x, y) => x + y),
            '-': () => this.binaryOperation((x, y) => x - y),
            '*': () => this.binaryOperation((x, y) => x * y),
            '/': () => this.binaryOperation((x, y) => x / y),
            '!': () => this.unaryOperation(x => this.calcularFactorial(x)),
            'log': () => this.unaryOperation(x => Math.log10(x)),
            'ln': () => this.unaryOperation(x => Math.log(x)),
            'sqrt': () => this.unaryOperation(x => Math.sqrt(x)),
            'sin': () => this.unaryOperation(x => Math.sin(x)),
            'cos': () => this.unaryOperation(x => Math.cos(x)),
            'tan': () => this.unaryOperation(x => Math.tan(x)),
            'pow2': () => this.unaryOperation(x => Math.pow(x, 2)),
            'pow': () => this.binaryOperation((x, y) => Math.pow(x, y)),
            '10pow': () => this.unaryOperation(x => Math.pow(10, x))
        }

        // Preparar la pantalla
        this.updateDisplay(this.currentScreenContent)
    }

    // Operation types
    binaryOperation(operation) {
        if(this.stack.size() >= 2) {
            let o2 = this.stack.pop()
            let o1 = this.stack.pop()
            return operation(o1, o2)
        } else {
            console.log("Underflow")
        }
    }

    unaryOperation(operation) {
        if(this.stack.size() >= 1) {
            let o = this.stack.pop()
            return operation(o)
        } else {
            console.log("Underflow")
        }
    }

    operate(op) {
        if(op in this.operators) {
            let result = this.operators[op]()
            if(result) {
                this.stack.push(result)
                this.clearDisplay()
            } 
        }
    }

    // Operations

    // Enter
    enter() {
        let number = parseFloat(this.currentScreenContent)
        this.stack.push(number)
        this.clearDisplay()
    }

    digitos(digito) {
        this.updateDisplay(digito)
    }

    punto() {
        this.updateDisplay('.')
    }

    borrar() {
        this.stack.clear()
        this.clearDisplay()
    }

    borrarUltimo() {
        if (this.currentScreenContent.length > 0) {
            this.currentScreenContent = this.currentScreenContent.slice(0, -1)
        }

        if (this.currentScreenContent.length == 0) {
            this.currentScreenContent = 0
        }

        this.display.updateDisplay(this.currentScreenContent)
    }

    cambiarSigno() {
        this.updateDisplay('-')
    }

    PI() {
        this.updateDisplay(Math.PI)
    }

    ans() {
        this.updateDisplay(this.stack.getElementAt(0))
    }

    random() {
        this.updateDisplay(Math.random())
    }

    // Util
    calcularFactorial(n) {
        var total = 1;
        for (let i = 1; i <= n; i++) {
            total = total * i;
        }
        return total;
    }

    // Pantalla
    updateDisplay(value) {
        this.currentScreenContent = String(this.currentScreenContent == 0 ? value : this.currentScreenContent + value)
        this.display.updateDisplay(this.currentScreenContent)
    }

    clearDisplay() {
        this.currentScreenContent = 0
        this.display.updateDisplay(this.currentScreenContent)
    }

}

class Display {
    
    constructor(numOfStackDisplays, stack) {
        this.numOfStackDisplays = numOfStackDisplays
        this.mainDisplay;
        this.stackDisplays = []
        this.container = document.getElementById("displays")
        this.displaying = stack
        this.createDisplays()
    }

    createDisplays() {
        let display = document.createElement("input")
        display.type = "text"
        display.id = "display"
        display.className = "display main"
        display.disabled = true
        this.mainDisplay = display
        this.container.appendChild(this.mainDisplay)

        for(let i = 0; i < this.numOfStackDisplays; i++) {
            display = document.createElement("input")
            display.type = "text"
            display.id = "display" + i
            display.className = "display"
            display.disabled = true
            this.stackDisplays.push(display)
            this.container.prepend(display)
        }
    }

    setStackDisplay(i, value) {
        this.stackDisplays[i].value = value
    }

    setDisplay(value) {
        this.mainDisplay.value = value
    }

    clearStackDisplays() {
        for(let i = 0; i < this.stackDisplays.length; i++) {
            this.setStackDisplay(i, "")
        }
    }

    updateDisplay(toDisplay) {
        this.setDisplay(toDisplay)

        this.clearStackDisplays()
        for(let i = 0; i < this.stackDisplays.length; i++) {
            let element = this.displaying.getElementAt(i)
            if(element) {
                this.setStackDisplay(i, element)
            }
        }
    }

}

class Stack {

    constructor() {
        this.items = []
    }

    push(item) {
        this.items.unshift(item)
    }

    pop() {
        return this.items.length == 0 ? "Underflow" : this.items.shift()
    }

    size() {
        return this.items.length
    }

    getElementAt(i) {
        // Aqui seria mejor hacer una copia porque no queremos que se modifiquen elementos de la pila
        // Solo para visualizacion
        return this.items[i] 
    }

    empty() {
        return this.items.length == 0
    }

    clear() {
        this.items = []
    }

}

var calculadora = new Calculadora();