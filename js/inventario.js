
let productos = [{
  id: 1,
  nombre: "JABÓN PARA PERRO",
  precio: 200,
  proveedor: "JOHN FAVELA",
  descripcion: "  "
}, {
  id: 2,
  nombre: "SHAMPOO VETERINARIO",
  precio: 100,
  proveedor: "AMERICA DIAZ",
  descripcion: "  "
}]

//autocompletador
const autoCompleteJS3 = new autoComplete({
  selector: "#autocomplete2",
  placeHolder: "Buscar producto",
  data: {
    src: productos.map(producto => producto.nombre),
    cache: true,
  },
  resultItem: {
    highlight: true
  },

  events: {
    input: {
      selection: (event) => {
        const selection = event.detail.selection.value;
        autoCompleteJS3.input.value = selection;
      }
    }
  }
});


//Lista los datos del proveedor seleccionado
function listado(id) {
  let contenido = document.getElementById("cuerpo1");
  productos.map(function prov(persona, index) {
    if (persona.id == id) {
      let contenidoHTML = `<div class="card w-100" >
    <div class="card-header">
    <h5>${persona.nombre}</h5>
    </div>
    <div class="card-body">
    <h6 class="card-title">Datos:</h6>
    <input type="hidden" id="pid" name="hID" value="${persona.id}">
    <p class="card-text">Precio: ${persona.precio}</p>
    <p class="card-text">Proveedor: ${persona.proveedor}</p>
    <p class="card-text">Descripción: ${persona.descripcion}</p>
    <button type="button" class="btn btn-primary" onclick="editarProveedor(${persona.id})"data-toggle="modal" data-target="#modal1">
    Editar
    </button>

    </div>`;





      contenido.innerHTML = contenidoHTML;
    }
  });


}

// buscador
function busqueda() {

  let texto = document.getElementById("autocomplete").value;
  console.log(texto);
  let contenido = document.getElementById("cuerpo1");



  let nombres = productos.filter(item => item.nombre.includes(texto.toUpperCase()))
  texto = "";
  if (nombres.length == 0) { return alert("Ningun nombre encontrado"); }
  else {

    let contenidoHTML = nombres.map(item =>
      ` <div class="card w-50" onclick="listado(${item.id})" >
   
      <div class="card-header">
      <h5>${item.nombre}</h5>
      </div>
      <div class="card-body">
      <h6 class="card-title">Datos:</h6>
      <p class="card-text">Precio: ${item.precio}</p>
      <p class="card-text">Proveedor: ${item.proveedor}</p>
      <p class="card-text">Descripcion: ${item.descripcion}</p>
      </div></div>`).join("");
    contenido.innerHTML = contenidoHTML;

  }
}






let limpieza1 = document.querySelector("#limpiar1");
limpieza1.addEventListener("click", () => {
  document.getElementById("autocomplete").value = "";
  return document.querySelector("#cuerpo1").innerHTML = "";
});

// let btnInv = document.querySelector("#nvInv");


// btnInv.addEventListener("click", () => {

//   let contenidoHTML = document.getElementById("modal1");
//   let contenido = `
// <div class="modal-dialog" role="document">
// <div class="modal-content" >
//   <div class="modal-header" >
// <h5 class="modal-title" id="exampleModalLabel">Nuevo Producto</h5>
// <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//   <span aria-hidden="true">&times;</span>
// </button>
// </div>
// <div class="modal-body">
// <div class="form-group">

//   <label for="nombrePro">Nombre</label>
//   <input type="text" name="" id="nombrePro" class="form-control" required >
//   <label for="direccion">Dirección</label>
//   <input type="tel" name="" id="direccion" class="form-control"  required>

//   <label for="telefono">Teléfono</label>
//   <input type="tel" name="" id="telefono" class="form-control">
//   <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
// <button type="button" data-dismiss="modal" id="btnGuardarProv" class="btn btn-primary">Guardar</button>
// </div>
// </div>
// <div class="modal-footer">

// </div>
// </div>
// </div>
// </div>`
//   contenidoHTML.innerHTML = contenido;

//   let btnGuardarProv = document.querySelector("#btnGuardarProv");
//   btnGuardarProv.addEventListener("click", () => {

//     let telefono = document.querySelector("#telefono").value;
//     let direccion = document.querySelector("#direccion").value;
//     let nombre = document.querySelector("#nombrePro").value;

//     let ids = productos.map(item => (+item.id));
//     ids = Math.max(...ids);
//     ids = ++ids;
//     productos.push({
//       telefono, direccion, nombre, articulos: [], id: ids
//     });
//     buscadora();
//   });

// });

