const btnBuscar = document.getElementById("btnBuscar");


var duenos = [
  {
    id: 1,
    nombre: "DAVID GARCIA",
    direccion: "Calle falsa 59 - Libertad",
    tel: 3124561234,
    mascotas: [],
  },
  {
    id: 2,
    nombre: "MARIA LUCRECIA RAMIREZ",
    direccion: "BENITO JUAREZ 44 - CHAMIZAL",
    tel: 3131456879,
    mascotas: [],
  },
  {
    id: 3,
    nombre: "GUADALUPE VICTORIA SERRANO",
    direccion: "JARDINES DE ANDARES 01 - UNION",
    tel: 3114567894,
    mascotas: [],
  },
  {
    id: 4,
    nombre: "FIONA MIJARES",
    direccion: "RIO BRAVO 25- CENTRO",
    tel: 3137894565,
    mascotas: [],
  },

];
var mascotas = [
  {
    id: 1,
    did: 1,
    nombre: "Garfield",
    especie: "Gato",
    sexo: "macho",
    color: "naranja",
    alergias: "Ninguna"
  },
  {
    id: 2,
    did: 2,
    nombre: "Felix",
    especie: "Gato",
    sexo: "macho",
    color: "negro",
    alergias: "Ninguna"
  },
  {
    id: 3,
    did: 3,
    nombre: "Firulais",
    especie: "Perro",
    sexo: "macho",
    color: "café",
    alergias: "Ninguna"
  },
  {
    id: 4,
    did: 1,
    nombre: "Manchas",
    especie: "Perro",
    sexo: "Macho",
    color: "blanco con manchas negras",
    alergias: "Ninguna"
  },
];
let mascotasDuen = mascotas.map(mascota => duenos[mascota.did - 1]["mascotas"].push(mascota));


function cuadro(evento) {

  let contenidoHTML = `<div class="card w-100" >
    <div class="card-header">
    <h5>${duenos[evento - 1].nombre}</h5>
    </div>
    <div class="card-body">
    <h6 class="card-title">Datos:</h6>
    <input type="hidden" id="hID" name="hID" value="${duenos[evento - 1].id}">
    <p class="card-text">Dirección: ${duenos[evento - 1].direccion}</p>
    <p class="card-text">Teléfono: ${duenos[evento - 1].tel}</p>
    <button type="button" class="btn btn-primary" onclick="modalEditar(${duenos[evento - 1].id})"data-toggle="modal" data-target="#modal1">
    Editar
    </button>
    <div class="card-body">
    <table class="table table-responsive-sm">
     <thead class="">
      <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Especie</th>
      <th scope="col">Sexo</th>
      <th scope="col">Color</th>
      <th scope="col">Alergias</th>
      <th scope="col">Acciones</th>
      <th scope="col">Consultas</th>
      </tr>
      </thead>
     <tbody>
    ${duenos[evento - 1].mascotas.map(mascota => `<tr>
      <th scope="row">${mascota.id}</th>
      <td>${mascota.nombre}</td>
      <td>${mascota.especie}</td>
      <td>${mascota.sexo}</td>
      <td>${mascota.color}</td>
      <td>${mascota.alergias}</td>
      <td><div class="btn-group" role="group" >
      <button type="button" onclick="editarMascota(${mascota.id})" class="btn btn-info" data-toggle="modal" data-target="#modal1">Editar</button>
      <button type="button" class="btn btn-danger" onclick="clicEliminar(${mascota.id})">Eliminar</button>
      
    </div></td>
    <td><div class="btn-group" role="group" >
      <button type="button" class="btn btn-info">Ver</button>
      <button type="button" class="btn btn-primary">Nueva</button>
      
    </div></td>
    </tr>`).join("")}
 
        </tbody>
    </table>

<div class="card-footer"><button type="button" class="btn btn-primary" onclick="modalNuevaMascota()" data-toggle="modal" data-target="#modal1">
Nueva mascota
</button></div>
  </div>
  </div>
         
          
         
          

    </div>`;





  contenido.innerHTML = contenidoHTML;
}
function buscador(index = 0) {

  let nombre = document.getElementById("textoBuscar").value;
  let contenido = document.getElementById("contenido");
  if (index > 0) {
    document.getElementById("textoBuscar").value = "";
    return contenido.innerHTML = "";
  }
  let nombres = duenos.filter(item => item.nombre.includes(nombre.toUpperCase()))
  if (nombres.length == 0) { return alert("Ningun nombre encontrado"); }
  else {








    let contenidoHTML = nombres.map(item =>
      ` <div class="card w-50" onclick="cuadro(${item.id})" >
 
    <div class="card-header">
    <h5>${item.nombre}</h5>
    </div>
    <div class="card-body">
    <h6 class="card-title">Datos:</h6>
    <p class="card-text">Dirección: ${item.direccion}</p>
    <p class="card-text">Teléfono: ${item.tel}</p>
    <p class="card-text text-center">Mascotas:</p>
    <ul class="list-group">
    ${item.mascotas.map(pet => `<li class="list-group-item text-center">${pet.nombre}</li>`)}

  </ul>
  </div>
         
          
         
          

    </div>`).join("");
    contenido.innerHTML = contenidoHTML;

  }
}

/* seccion editar dueño */
function modalEditar(index) {
  let contenidoHTML = document.getElementById("modal1");
  let persona = duenos[index - 1];
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
  <input type="tel" name="" id="telefon" class="form-control" value="${persona.tel}" >
</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
<button type="button" data-dismiss="modal" onclick="guardarEditar(${persona.id - 1})" class="btn btn-primary">Guardar cambios</button>
</div>
</div>
</div>
</div>`
  contenidoHTML.innerHTML = contenido;
}
function guardarEditar(id) {

  let dir = document.getElementById("dir").value;
  let tel = document.getElementById("telefon").value;
  duenos[id].direccion = dir;
  duenos[id].tel = tel;
  buscador();
}


/*seccion agregar mascota*/
function modalNuevaMascota(index) {
  let contenidoHTML = document.getElementById("modal1");
  let persona = duenos[1 - 1];
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
  <label for="petName">Nombre</label>
  <input type="text" name="" id="petName" class="form-control"  required>
  <label for="petRaze">Especie</label>
  <input type="tel" name="" id="petRaze" class="form-control" required >
  <label for="petSex">Sexo</label>
  <select id="petSex" class="form-select">
  <option value="hembra">Hembra</option>
  <option value="macho">Macho</option>
</select>
  <label for="petColor">Color</label>
  <input type="text" name="" id="petColor" class="form-control" required >
  <label for="petAlergy">Alergias</label>
  <input type="text" name="" id="petAlergy" class="form-control" required >
</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
<button type="button" data-dismiss="modal" onclick="guardarMascota()" class="btn btn-primary">Guardar</button>
</div>
</div>
</div>
</div>`
  contenidoHTML.innerHTML = contenido;
}

function guardarMascota() {
  let vID = parseFloat(document.getElementById("hID").value);
  let nombre = document.getElementById("petName").value;
  let color = document.getElementById("petColor").value;
  let alergias = document.getElementById("petAlergy").value;
  let sexo = document.getElementById("petSex").value;
  let especie = document.getElementById("petRaze").value;
  let ids = mascotas.map(item=>parseFloat(item.id));
  ids=Math.max(...ids);
 console.log(ids)
  let pet = {
    id: ids + 1,
    did: vID,
    nombre: nombre,
    especie: especie,
    sexo: sexo,
    color: color,
    alergias: alergias
  }
  mascotas.push(pet);

  duenos[vID - 1]["mascotas"].push(pet);
  cuadro(vID);
  console.log(mascotas);
}


/* Eliminar mascota */

function clicEliminar(index) {
  let mascota=mascotas.filter(item=>item.id==index);

  var result = confirm("¿Seguro que deseas eliminar a la mascota?");
  if (result) {

    let valor = mascota[0].did;
    let a = mascotas.splice(0, mascota[0].id-1);
    let b = mascotas.splice(1,)
   //nueva tabla mascotas
    mascotas = a.concat(b);
    duenos[valor - 1].mascotas = duenos[valor - 1].mascotas.filter(item => item.id != index);
     cuadro(valor);
     console.log(mascota,mascotas,duenos[valor - 1].mascotas)
  }

}

/* Editar mascota*/
function editarMascota(index) {
  let contenidoHTML = document.getElementById("modal1");
  let pet = mascotas.filter(item=>item.id==index);
 
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
    <label for="petName">Nombre</label>
    <input type="text" name="" id="petName" value="${pet[0].nombre}" class="form-control"  required>
    <label for="petRaze">Especie</label>
    <input type="tel" name="" id="petRaze" value="${pet[0].especie}" class="form-control" required >
    <label for="petSex">Sexo</label>
    <select id="petSex" value="${pet[0].nombre}" class="form-select">
 
    <option value="hembra">Hembra</option>
    <option value="macho">Macho</option>
  </select>
    <label for="petColor">Color</label>
    <input type="text" value="${pet[0].color}"name="" id="petColor" class="form-control" required >
    <label for="petAlergy">Alergias</label>
    <input type="text" value="${pet[0].alergias}"name="" id="petAlergy" class="form-control" required >
  </div>
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
  <button type="button" data-dismiss="modal" onclick="guardarEdicion()" class="btn btn-primary">Guardar</button>
  </div>
  </div>
  </div>
  </div>`
  contenidoHTML.innerHTML = contenido;
}

btnBuscar.onclick = buscador;
