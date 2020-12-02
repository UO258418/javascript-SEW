class Lector {

    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //El navegador soporta el API File
            document.write("<h2>Este navegador soporta el API File </h2>");
        }
        else document.write("<h2>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</h2>");
        this.currentParent;
    }

    readFileAtIndex(files, index) {
        let file = files[index];
        this.createHeader(2, file.name);
        this.createParagraph("Nombre del archivo", file.name);
        this.createParagraph("Tamaño del archivo", file.size, " bytes");
        this.createParagraph("Tipo del archivo", file.type);
        this.createParagraph("Fecha de ultima modificacion", file.lastModifiedDate);
        this.readFile(files, file, index);
    }

    leerArchivoTexto(files) {
        this.currentParent = document.getElementById("fileInfoDisplay");
        this.clearCurrentParent();
        this.readFileAtIndex(files, 0);
    }

    readFile(files, file, index) {
        var fileTypes = {};
        fileTypes["text/plain"] = {
            blob: file
        };

        fileTypes["application/json"] = {
            blob: new Blob([file], {type:"application/json"})
        };

        fileTypes["text/xml"] = {
            blob: file
        };

        var validType = false;

        for (let type in fileTypes) {
            let regexp = new RegExp(type);
            if (file.type.match(type)) {
                validType = true;
                var lector = new FileReader();
                let fileType = fileTypes[type];
                lector.onload = function (evento) {
                    //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
                    //La propiedad "result" es donde se almacena el contenido del archivo
                    //Esta propiedad solamente es válida cuando se termina la operación de lectura
                    this.createParagraph(`Contenido de ${file.name}`, `<br>${lector.result}`);
                    if(index + 1 < files.length) {
                        this.readFileAtIndex(files, index + 1);
                    }
                }.bind(this);
                lector.readAsText(fileType.blob);
            }
        }

        if(!validType) {
            this.createParagraph("Error", "Archivo no válido");
        }
    }

    createParagraph(title, value, subfix = "") {
        let p = document.createElement("p");
        p.innerHTML = `<b>${title}:</b> ${value}${subfix}`;
        this.currentParent.appendChild(p);
    }

    createHeader(type, value) {
        let h = document.createElement("h" + type);
        h.innerHTML = value;
        this.currentParent.appendChild(h);
    }

    clearCurrentParent() {
        this.currentParent.innerHTML = "";
    }

}

var lector = new Lector();