class Device {

    constructor(name) {
        this.container = document.getElementById("deviceList")

        if(name.length == 0) {
            this.name = "Dispositivo"
        } else {
            this.name = name
        }
        
        this.createElement()
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.className = "device"

        // Name 
        let nameHeader = document.createElement("h3")
        nameHeader.className = "name"
        nameHeader.innerHTML= this.name

        // Amount
        let amountPanel = this.createDataInput("Amount")

        // Power
        let powerPanel = this.createDataInput("Power")

        // Hours a day
        let hoursPanel = this.createDataInput("Hours")

        // Days a month
        let daysPanel = this.createDataInput("Days")

        this.element.innerHTML = nameHeader.outerHTML 
            + amountPanel.outerHTML 
            + powerPanel.outerHTML
            + hoursPanel.outerHTML
            + daysPanel.outerHTML

        this.container.appendChild(this.element)
    }

    createDataInput(name) {
        let panel = document.createElement("div")
        panel.className = "dataInput"
        let labelForPanel = document.createElement("label")
        labelForPanel.setAttribute("for", name)
        labelForPanel.innerHTML = `${name}:`
        let panelInput = document.createElement("input")
        panelInput.type = "text"  
        panelInput.className = name
        panel.innerHTML = labelForPanel.outerHTML + panelInput.outerHTML
        return panel
    }

    calcularConsumo() {
        let amount = this.getData("Amount")
        let power = this.getData("Power")
        let hours = this.getData("Hours")
        let days = this.getData("Days")
        return amount * power * hours * days
    }

    getData(type) {
        return this.element.getElementsByClassName(type)[0].value
    }

}

class CalculadoraEnergetica {

    constructor() {
        this.devices = []
        this.nameInput = document.getElementById("deviceName")
        this.output = document.getElementById("output")
    }

    addDevice() {
        let name = this.nameInput.value
        this.devices.push(new Device(name))
    }

    calcular() {
        let consumoTotal = 0
        for(const device of this.devices) {
            console.log(device)
            consumoTotal += device.calcularConsumo()
        }
        this.output.value = consumoTotal
    }

}

var ce = new CalculadoraEnergetica()