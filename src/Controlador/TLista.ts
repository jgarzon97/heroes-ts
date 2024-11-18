import { Heroes } from "../Entidades/Heroe";
/*
export let ListaHeroes: Heroes[] = [
    new Heroes(1, "Batman", 40, "Gótica", "/src/Imagenes/batman.jpg"),
    new Heroes(2, "Spiderman", 20, "New York", "/src/Imagenes/spiderman.png"),
    new Heroes(3, "Superman", 35, "Metropolis", "/src/Imagenes/superman.jpg"),
];
*/

export let ListaHeroes: Heroes[] = [
    new Heroes(1, "Batman", 40, "Gótica", "https://raw.githubusercontent.com/jgarzon97/heroes-ts/refs/heads/main/src/Imagenes/batman.jpg"),
    new Heroes(2, "Spiderman", 20, "New York", "https://raw.githubusercontent.com/jgarzon97/heroes-ts/refs/heads/main/src/Imagenes/spiderman.png"),
    new Heroes(3, "Superman", 35, "Metropolis", "https://raw.githubusercontent.com/jgarzon97/heroes-ts/refs/heads/main/src/Imagenes/superman.jpg"),
];

export const globals = {
    opcion: "",
    primerValor: 0,
};

export function Insertar(): void {
    const cod = obtenerValorInput("codigo", true);
    const nom = obtenerValorInput("nombre");
    const eda = obtenerValorInput("edad", true);
    const ciu = obtenerValorInput("ciudad");
    const img = obtenerValorInput("imagen");

    if (typeof cod !== "number" || typeof eda !== "number") {
        console.error("Error: 'codigo' y 'edad' deben ser números.");
        return;
    }
    if (typeof nom !== "string" || typeof ciu !== "string" || typeof img !== "string") {
        console.error("Error: deben ser una cadena de texto.");
        return;
    }

    const codigoExistente = ListaHeroes.some(heroe => heroe.Codigo === cod);
    if (codigoExistente) {
        console.error(`Error: El código ${cod} ya existe en la lista.`);
        alert(`Error: El código ${cod} ya está en uso. Por favor, elige otro.`);
        return;
    }

    const nuevoHeroe = new Heroes(cod, nom, eda, ciu, img);
    ListaHeroes.push(nuevoHeroe);
    Listar();
}


export function Editar(codigo: number): void {
    const index = ListaHeroes.findIndex(heroe => heroe.Codigo === codigo);
    console.log("Índice encontrado para editar:", index);

    if (index === -1) {
        console.log("Héroe no encontrado para editar.");
        return;
    }

    const heroe = ListaHeroes[index];
    const inputCodigo = document.querySelector<HTMLInputElement>("#codigo");
    const inputNombre = document.querySelector<HTMLInputElement>("#nombre");
    const inputEdad = document.querySelector<HTMLInputElement>("#edad");
    const inputCiudad = document.querySelector<HTMLInputElement>("#ciudad");
    const inputImagen = document.querySelector<HTMLInputElement>("#imagen");

    [inputCodigo, inputNombre, inputEdad, inputCiudad, inputImagen].forEach((input, index) => {
        if (input) {
            input.value = [heroe.Codigo, heroe.Nombre, heroe.Edad, heroe.Ciudad, heroe.Imagen][index].toString();
        }
    });

    globals.primerValor = heroe.Codigo;
    globals.opcion = "editar";
}

export function Eliminar(codigo: number): void {
    const index = ListaHeroes.findIndex(heroe => heroe.Codigo === codigo);
    if (index !== -1) {
        ListaHeroes.splice(index, 1);
        Listar();
    }
}

export function Listar(): void {
    const tablaBody = document.querySelector<HTMLTableSectionElement>("#tabla-H tbody");
    if (!tablaBody) {
        console.error("No se encontró el elemento '#tabla-H tbody'.");
        return;
    }

    tablaBody.innerHTML = "";
    ListaHeroes.forEach(heroe => {
        const row = document.createElement("tr");

        const tdCodigo = document.createElement("td");
        tdCodigo.textContent = heroe.Codigo.toString();
        row.appendChild(tdCodigo);

        const tdNombre = document.createElement("td");
        tdNombre.textContent = heroe.Nombre;
        row.appendChild(tdNombre);

        const tdEdad = document.createElement("td");
        tdEdad.textContent = heroe.Edad.toString();
        row.appendChild(tdEdad);

        const tdCiudad = document.createElement("td");
        tdCiudad.textContent = heroe.Ciudad;
        row.appendChild(tdCiudad);

        const tdImagen = document.createElement("td");
        const img = document.createElement("img");
        img.src = heroe.Imagen;
        img.alt = `Imagen de ${heroe.Nombre}`;
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "4px";
        tdImagen.appendChild(img);
        row.appendChild(tdImagen);

        const tdAcciones = document.createElement("td");
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("editar", "btn", "btn-warning");
        btnEditar.onclick = () => Editar(heroe.Codigo);
        tdAcciones.appendChild(btnEditar);

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("eliminar", "btn", "btn-danger");
        btnEliminar.onclick = () => Eliminar(heroe.Codigo);
        tdAcciones.appendChild(btnEliminar);

        row.appendChild(tdAcciones);
        tablaBody.appendChild(row);
    });
}

function obtenerValorInput(id: string, esNumero: boolean = false): number | string {
    const input = document.getElementById(id) as HTMLInputElement;
    const valor = input.value.trim();
    if (esNumero) {
        const numero = Number(valor);
        return isNaN(numero) ? 0 : numero;
    }
    return valor;
}

export function ActualizarHéroe(codigo: number, nombre: string, edad: number, ciudad: string, imagen: string): void {
    const index = ListaHeroes.findIndex(heroe => heroe.Codigo === codigo);

    if (index === -1) {
        console.log("No se pudo encontrar el héroe para actualizar.");
        return;
    }

    ListaHeroes[index] = {
        Codigo: codigo,
        Nombre: nombre,
        Edad: edad,
        Ciudad: ciudad,
        Imagen: imagen,
    };

    console.log("Héroe actualizado:", ListaHeroes[index]);
    Listar();
}
