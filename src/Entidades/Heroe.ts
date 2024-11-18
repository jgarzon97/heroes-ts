export class Heroes {
    Codigo: number;
    Nombre: string;
    Edad: number;
    Ciudad: string;
    Imagen: string;

    constructor(cod: number, nom: string, eda: number, ciu: string, img: string) {
        this.Codigo = cod;
        this.Nombre = nom;
        this.Edad = eda;
        this.Ciudad = ciu;
        this.Imagen = img;
    }
}