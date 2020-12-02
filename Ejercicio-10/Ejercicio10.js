class Converter {

    constructor() {
        this.apikey = "61a46e025f6747fb3205";
        this.baseURL = "https://free.currconv.com/api/v7/convert?q=";
        this.amountInput = $("#amount")[0];
        this.fromInput = $("#from")[0];
        this.toInput = $("#to")[0];
        this.display = $("#display")[0];
        this.availableCurrencies = {
            "Euro": "EUR",
            "United States Dollar": "USD",
            "British Pound Sterling": "GBP"
        }
        this.fillSelectsWithCurrencies();
    }

    convert() {
        let query = `${this.fromInput.value}_${this.toInput.value}`;
        $.ajax({
            url: `${this.baseURL}${query}&compact=ultra&apiKey=${this.apikey}`,
            dataType: 'json',
            method: 'GET',
            success: function(json) {
                this.showConvertedAmount(json, query);
                this.amountInput.value = "";
            }.bind(this),
            error: function() {
                alert("Error trying to convert");
            }
        });
    }

    fillSelectsWithCurrencies() {
        for(let currency in this.availableCurrencies) {
            let fromOption = document.createElement("option");
            let toOption =  document.createElement("option");
            fromOption.value = toOption.value = this.availableCurrencies[currency];
            fromOption.text = toOption.text = currency;
            this.fromInput.appendChild(fromOption);
            this.toInput.appendChild(toOption);
        }
    }

    showConvertedAmount(json, value) {
        this.display.value = json[value] * this.amountInput.value;
    }

}

var converter = new Converter();