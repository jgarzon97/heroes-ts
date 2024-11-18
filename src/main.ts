import { Listar, Insertar, Editar, Eliminar, ActualizarHéroe, globals } from "../src/Controlador/TLista";
import './style.css';

document.addEventListener("DOMContentLoaded", () => {

  Listar();

  const modal = document.querySelector<HTMLDivElement>("#container-form");
  const buttonAdd = document.querySelector<HTMLButtonElement>("#btn-add");
  const buttonCancel = document.querySelector<HTMLButtonElement>("#btn-cancel");
  const form = document.querySelector<HTMLFormElement>("#hero-form");

  document.querySelector("#tabla-H tbody")?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("editar")) {
      const fila = target.closest("tr");
      const codigo = Number(fila?.children[0].textContent);
      console.log("Editar clicado. Código del héroe:", codigo);
      Editar(codigo);
      if (modal) modal.classList.add("active");
    }

    if (target.classList.contains("eliminar")) {
      const fila = target.closest("tr");
      const codigo = Number(fila?.children[0].textContent);
      console.log("Eliminar clicado. Código del héroe:", codigo);
      Eliminar(codigo);
    }
  });


  buttonAdd?.addEventListener("click", () => {
    if (modal) {
      modal.classList.add("active");
    }
    limpiarCampos(globals.opcion === "editar");
    globals.opcion = "agregar";
    globals.primerValor = 0;
  });


  buttonCancel?.addEventListener("click", () => {
    if (modal) {
      modal.classList.remove("active");
    }
    limpiarCampos();
    globals.opcion = "";
    globals.primerValor = 0;
  });


  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Formulario enviado. Opción actual:", globals.opcion);
    console.log("Primer valor (código) al enviar:", globals.primerValor);

    if (globals.opcion === "editar" && globals.primerValor !== 0) {
      const codigo = Number((document.querySelector<HTMLInputElement>("#codigo") as HTMLInputElement).value);
      const nombre = (document.querySelector<HTMLInputElement>("#nombre") as HTMLInputElement).value;
      const edad = Number((document.querySelector<HTMLInputElement>("#edad") as HTMLInputElement).value);
      const ciudad = (document.querySelector<HTMLInputElement>("#ciudad") as HTMLInputElement).value;
      const imagen = (document.querySelector<HTMLInputElement>("#imagen") as HTMLInputElement).value;

      console.log("Llamando a ActualizarHéroe con datos:", { codigo, nombre, edad, ciudad, imagen });
      ActualizarHéroe(codigo, nombre, edad, ciudad, imagen);
    } else if (globals.opcion === "agregar") {
      console.log("Llamando a Insertar.");
      Insertar();
    }

    if (modal) {
      modal.classList.remove("active");
      console.log("Modal cerrado después del envío.");
    }

    limpiarCampos();
    globals.opcion = "";
    globals.primerValor = 0;
  });


  function limpiarCampos(keepCodigo: boolean = false): void {
    const inputs = ["nombre", "edad", "ciudad", "imagen"];

    if (!keepCodigo) {
      const inputCodigo = document.querySelector<HTMLInputElement>("#codigo");
      if (inputCodigo) inputCodigo.value = "";
    }

    inputs.forEach(id => {
      const input = document.querySelector<HTMLInputElement>(`#${id}`);
      if (input) input.value = "";
    });
  }
});


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="header-container">
      <h1>Listado de Superhéroes</h1>
        <button id="btn-add">Agregar un Superheroe</button>
    </div>

    <table id="tabla-H">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Ciudad</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody> </tbody>
    </table>

    <div id="container-form" class="modal">
      <div class="modal-content">
        <h2>Formulario Héroe</h2>
        <form id="hero-form">
          <div>
            <label for="codigo">Código:</label>
            <input type="number" id="codigo" required>
          </div>
          <div>
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" required>
          </div>
          <div>
            <label for="edad">Edad:</label>
            <input type="number" id="edad" required>
          </div>
          <div>
            <label for="ciudad">Ciudad:</label>
            <input type="text" id="ciudad" required>
          </div>
          <div>
            <label for="imagen">Imagen:</label>
            <input type="text" id="imagen" required>
          </div>
          <div>
            <button type="submit">Guardar</button>
            <button type="button" id="btn-cancel">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
`;
