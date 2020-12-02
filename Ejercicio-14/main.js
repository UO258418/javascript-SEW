class Blackboard {

    constructor() {
        this.setDrawingContext()
        this.commandPrompt = document.getElementById("commandPrompt")
        document.getElementById("uploadimage").addEventListener("change", this.insertImage, false)
    }

    setDrawingContext() {
        const canvas = document.getElementById("myCanvas")
        this.ctx = canvas.getContext("2d")
    }

    fullscreen() {
        var elem = document.getElementById('fullscreen');
        if (document.webkitFullscreenElement) {
            document.webkitCancelFullScreen();
        }
        else {
            elem.webkitRequestFullScreen();
        };
    }

    draw() {
        try {
            let command = this.commandPrompt.value
            eval("this.ctx." + command)
            this.commandPrompt.value = ""
        } catch (error) {
            console.log("Invalid command")
        }
    }

    insertImage() {
        let img = new Image(),
        f = document.getElementById("uploadimage").files[0],
        url = window.URL || window.webkitURL,
        src = url.createObjectURL(f),
        ctx = document.getElementById("myCanvas").getContext("2d")

        img.src = src;
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            url.revokeObjectURL(src);
        }.bind(this)
    }

}

var blackboard = new Blackboard()