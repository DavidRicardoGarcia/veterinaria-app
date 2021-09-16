'use strict'
let proveedores = [{
  id: 1,
  nombre: "JOHN FAVELA",
  direccion: "Usumacinta 99- Union",
  telefono: 3131239547,
  articulos: [{ id: 1, nombre: "Jabon para perro", precio: 25, publico: 45 }, { id: 1, nombre: "Shampoo veterinario", precio: 89, publico: 119 }, { id: 3, nombre: "Pastilla anti-garrapatas", precio: 299, publico: 350 }]
}, {
  id: 2,
  nombre: "AMERICA DIAZ",
  direccion: "REY COLIMAN 293 - TUXPAN",
  telefono: 3137894568,
  articulos: [{ id: 2, nombre: "Jabon para perro", precio: 25, publico: 45 }, { id: 2, nombre: "Shampoo veterinario", precio: 89, publico: 119 }, { id: 3, nombre: "Pastilla anti-garrapatas", precio: 299, publico: 350 }]
}]
//autocompletador
const autoCompleteJS2 = new autoComplete({
  selector: "#autocomplete",
  placeHolder: "Buscar proveedor",
  data: {
    src: proveedores.map(proveedor => proveedor.nombre),
    cache: true,
  },
  resultItem: {
    highlight: true
  },

  events: {
    input: {
      selection: (event) => {
        const selection = event.detail.selection.value;
        autoCompleteJS2.input.value = selection;
      }
    }
  }
});


//Lista los datos del proveedor seleccionado
function listado(id) {
  let contenido = document.getElementById("cuerpo");
  proveedores.map(function prov(persona, index) {
    if (persona.id == id) {
      let contenidoHTML = `<div class="card w-100" >
    <div class="card-header">
    <h5>${persona.nombre}</h5>
    </div>
    <div class="card-body">
    <h6 class="card-title">Datos:</h6>
    <input type="hidden" id="pid" name="hID" value="${persona.id}">
    <p class="card-text">Dirección: ${persona.direccion}</p>
    <p class="card-text">Teléfono: ${persona.telefono}</p>
    <button type="button" class="btn btn-primary" onclick="editarProveedor(${persona.id})"data-toggle="modal" data-target="#modal1">
    Editar
    </button>
    <div class="card-body">
    <table class="table table-responsive-sm">
     <thead class="">
      <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Precio</th>
      <th scope="col">Precio público</th>
      </tr>
      </thead>
     <tbody>
    ${persona.articulos.map(art => `<tr>
      <th scope="row">${art.id}</th>
      <td>${art.nombre}</td>
      <td>${art.precio}</td>
      <td>${art.publico}</td>
      <td><div class="btn-group" role="group">
      <button type="button" onclick="editarArt(${persona.id},${art.id} )" class="btn btn-info" data-toggle="modal" data-target="#modal1">Editar</button>
      <button type="button" class="btn btn-danger" onclick="clicEliminar(${persona.id},${art.id} )">Eliminar</button>
      
    </div></td>
  
    </tr>`).join("")}
  
        </tbody>
    </table>
  
  <div class="card-footer"><button type="button" class="btn btn-primary" onclick="nuevoProducto()" data-toggle="modal" data-target="#modal1">
  Nuevo articulo
  </button></div>
  </div>
  </div>
         
          
         
          
  
    </div>`;





      contenido.innerHTML = contenidoHTML;
    }
  });


}
// modal para cuando se edita los datos de un provveedor
function editarProveedor(id) {
  let contenidoHTML = document.getElementById("modal1");
  proveedores.map(function ed(persona, idx) {
    if (persona.id == id) {
      let contenido = `
        <div class="modal-dialog" role="document">
        <div class="modal-content" >
          <div class="modal-header" >
        <h5 class="modal-title" id="">${persona.nombre}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
        <div class="form-group">
          <label for="dir">Dirección</label>
          <input type="text" name="" id="dir" class="form-control" value="${persona.direccion}" >
          <label for="telefon">Teléfono</label>
          <input type="tel" name="" id="telefon" class="form-control" value="${persona.telefono}" >
        </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" data-dismiss="modal" onclick="guardarCambios(${persona.id})" class="btn btn-primary">Guardar cambios</button>
        </div>
        </div>
        </div>
        </div>`
      contenidoHTML.innerHTML = contenido;
    }
  });

}

//guarda los cambios guardados en la edicion del proveedor
function guardarCambios(id) {

  let dir = document.getElementById("dir").value;
  let tel = document.getElementById("telefon").value;
  let cambio = proveedores.find(item => item.id == id);
  cambio.direccion = dir;
  cambio.telefono = tel;
  buscadora();
}
// buscador
function buscadora() {

  let texto = document.getElementById("autocomplete").value;
  console.log(texto);
  let contenido = document.getElementById("cuerpo");



  let nombres = proveedores.filter(item => item.nombre.includes(texto.toUpperCase()))
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
      <p class="card-text">Dirección: ${item.direccion}</p>
      <p class="card-text">Teléfono: ${item.telefono}</p>
      <p class="card-text text-center">Artículos:</p>
      <ul class="list-group">
      ${item.articulos.map(art => `<li class="list-group-item text-center">${art.nombre}</li>`)}
  
    </ul>
    </div>
           
            
           
            
  
      </div>`).join("");
    contenido.innerHTML = contenidoHTML;

  }
}
// eliminar articulo del proveedor
function clicEliminar(ida, idb) {


  var result = confirm("¿En verdad desea eliminar el artículo?");
  if (result) {
    let entidad = proveedores.find(prov => prov.id == ida);
    let art = entidad.articulos.findIndex((arti, index) => arti.id == idb);
    entidad.articulos.splice(+art, 1)
    entidad.articulos = entidad.articulos;
    listado(ida);

  }

}


//editar articulo
function editarArt(id, ida) {
  let entidad = proveedores.findIndex(prov => prov.id == id);
  let art = proveedores[+entidad].articulos.findIndex((arti, index) => arti.id == ida);
  let producto = proveedores[entidad].articulos[art];
  let contenidoHTML = document.getElementById("modal1");



  let contenido = `
  <div class="modal-dialog" role="document">
  <div class="modal-content" >
    <div class="modal-header" >
  <h5 class="modal-title" id="exampleModalLabel">Nueva mascota</h5>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  </div>
  <div class="modal-body">
  <div class="form-group">
    
    <label for="nombreProducto">Nombre</label>
    <input type="hidden" id="idProv" name="" value="${id}">
    <input type="hidden" id="idProd" name="" value="${ida}">
    <input type="text" name="" id="nombreProducto" value="${producto.nombre}" class="form-control"  required>
    <label for="precio">Precio</label>
    <input type="tel" name="" id="precio" value="${producto.precio}" class="form-control" required >
    <label for="precioPublico">Precio Público</label>
    <input type="text" value="${producto.publico}"name="" id="precioPublico" class="form-control" required >
  </div>
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
  <button type="button" data-dismiss="modal" onclick="productoEditado()" class="btn btn-primary">Guardar</button>
  </div>
  </div>
  </div>
  </div>`;
  contenidoHTML.innerHTML = contenido;




}
function productoEditado() {

  let idPro = document.getElementById("idProv").value;
  let idProd = document.getElementById("idProd").value;
  let nombre = document.getElementById("nombreProducto").value;
  let precio = document.getElementById("precio").value;
  let publico = document.getElementById("precioPublico").value;

  let entidad = proveedores.findIndex(prov => prov.id == idPro);
  let art = proveedores[+entidad].articulos.findIndex((arti, index) => arti.id == idProd);
  let producto = {
    id: idProd,
    precio,
    nombre,
    publico
  };
  proveedores[entidad].articulos[art] = producto;
  listado(idPro);
}



function nuevoProducto(id) {
  let contenidoHTML = document.getElementById("modal1");
  let contenido = `
<div class="modal-dialog" role="document">
<div class="modal-content" >
  <div class="modal-header" >
<h5 class="modal-title" id="exampleModalLabel">Nuevo producto</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">
<div class="form-group">

  <label for="nombreProducto">Nombre</label>
  <input type="text" name="" id="nombreProducto" class="form-control" required >
  <label for="precio">Precio</label>
  <input type="tel" name="" id="precio" class="form-control"  required>

  <label for="precioPublico">Precio Público</label>
  <input type="text" name="" id="precioPublico" class="form-control">

</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar1</button>
<button type="button" data-dismiss="modal" onclick="guardarNuevo()" class="btn btn-primary">Guardar</button>
</div>
</div>
</div>
</div>`
  contenidoHTML.innerHTML = contenido;
}
// guardar nuevo articulo
let guardarNuevo = () => {
  let id = document.querySelector("#pid").value;
  let precio = document.querySelector("#precio").value;
  let nombre = document.querySelector("#nombreProducto").value;
  let publico = document.querySelector("#precioPublico").value;

  let base = proveedores.find(item => item.id == id);
  let ids = 0;
  console.log(base.articulos.length);
  if (base.articulos.length <= 0) { ids = 1; }
  else {
    ids = base.articulos.map(item => parseFloat(item.id));
    ids = Math.max(...ids);
    ids=++ids;
  }
  console.log(ids);
  base.articulos.push({
    precio, nombre, publico, id: ids
  });
  listado(id);

}


let limpieza = document.querySelector("#limpiar");
limpieza.addEventListener("click", () => {
  document.getElementById("autocomplete").value = "";
  return document.querySelector("#cuerpo").innerHTML = "";
});

let btnProv = document.querySelector("#nvProv");
btnProv.addEventListener("click", () => {

  let contenidoHTML = document.getElementById("modal1");
  let contenido = `
<div class="modal-dialog" role="document">
<div class="modal-content" >
  <div class="modal-header" >
<h5 class="modal-title" id="exampleModalLabel">Nuevo Proveedor</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">
<div class="form-group">

  <label for="nombrePro">Nombre</label>
  <input type="text" name="" id="nombrePro" class="form-control" required >
  <label for="direccion">Dirección</label>
  <input type="tel" name="" id="direccion" class="form-control"  required>

  <label for="telefono">Teléfono</label>
  <input type="tel" name="" id="telefono" class="form-control">

</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
<button type="button" data-dismiss="modal" id="btnGuardarProv" class="btn btn-primary">Guardar</button>
</div>
</div>
</div>
</div>`
  contenidoHTML.innerHTML = contenido;

  let btnGuardarProv = document.querySelector("#btnGuardarProv");
  btnGuardarProv.addEventListener("click", () => {

    let telefono = document.querySelector("#telefono").value;
    let direccion = document.querySelector("#direccion").value;
    let nombre = document.querySelector("#nombrePro").value;

    let ids = proveedores.map(item => (+item.id));
    ids = Math.max(...ids);
    ids = ++ids;
    proveedores.push({
      telefono, direccion, nombre, articulos: [], id: ids
    });
    buscadora();
  });

});

