const btnBuscar = document.getElementById("btnBuscar");
var vector=[];



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


const autoCompleteJS = new autoComplete({  placeHolder: "Buscar persona",
data: {
    src: duenos.map(index=>index.nombre),
    cache: true,
},
resultItem: {
    highlight: true
},
events: {
    input: {
        selection: (event) => {
            const selection = event.detail.selection.value;
            autoCompleteJS.input.value = selection;
        }
    }
} });
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

let mascotasD= duenos.map(function f(dueno, index){
    mascotas.map(function m(mascota,ind){
if(mascota.did==dueno.id){
  duenos[index]["mascotas"].push(mascota)
}
    });

  
});

var consultas = [{
  id:1
}]

function cuadro(evento) {
  duenos.map(function owner(dueno, index) {
    if (dueno.id == evento) {
      let contenidoHTML = `<div class="card w-100" >
  <div class="card-header">
  <h5>${dueno.nombre}</h5>
  </div>
  <div class="card-body">
  <h6 class="card-title">Datos:</h6>
  <input type="hidden" id="hID" name="hID" value="${dueno.id}">
  <p class="card-text">Dirección: ${dueno.direccion}</p>
  <p class="card-text">Teléfono: ${dueno.tel}</p>
  <button type="button" class="btn btn-primary" onclick="modalEditar(${dueno.id})"data-toggle="modal" data-target="#modal1">
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
  ${dueno.mascotas.map(mascota => `<tr>
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
    ${consultas.filter(item=>item.idc==mascota.id).length>0?
      `<button type="button" class="btn btn-info" onclick="verConsultas(${mascota.id})" data-toggle="modal" data-target="#modal1">Ver</button>`: ""}
    <button type="button" class="btn btn-primary" onclick="nuevaConsulta(${mascota.id})" data-toggle="modal" data-target="#modal1">Nueva</button>
    
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
  });


}
function buscador(index = 0) {

  let nombre = document.getElementById("autoComplete").value;
  let contenido = document.getElementById("contenido");
  if (index > 0) {
    document.getElementById("autoComplete").value = "";
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
  duenos.map(function ed(persona, idx) {
    if (persona.id == index) {
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
  });

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
  <input type="text" name="" id="petName" class="form-control" required >
  <label for="petRaze">Especie</label>
  <input type="tel" name="" id="petRaze" class="form-control"  required>
  <label for="petSex">Sexo</label>
  <select id="petSex" class="form-select">
  <option value="hembra">Hembra</option>
  <option value="macho">Macho</option>
</select>
  <label for="petColor">Color</label>
  <input type="text" name="" id="petColor" class="form-control"  >
  <label for="petAlergy">Alergias</label>
  <input type="text" name="" id="petAlergy" class="form-control"  >
  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
<button type="button" data-dismiss="modal" onclick="guardarMascota()" class="btn btn-primary">Guardar</button>
</div>
</div>
<div class="modal-footer">

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
  let ids = mascotas.map(item => parseFloat(item.id));
  ids = Math.max(...ids);

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

  guardar(pet);
  cuadro(vID);

}


/* Eliminar mascota */

function clicEliminar(index) {


  var result = confirm("¿Seguro que deseas eliminar a la mascota?");
  if (result) {

    mascotas.map(function eli(mascota, ind) {

      if (mascota.id == index) {
        let a = mascotas.splice(0, ind);
        let b = mascotas.splice(1,)
        mascotas = a.concat(b);

        eliminar(mascota);
        cuadro(mascota.did);
      }
    })

    //nueva tabla mascotas






  }

}

/* Editar mascota*/
function editarMascota(index) {
  let contenidoHTML = document.getElementById("modal1");
  mascotas.map(function mas(mascota, ind) {
    if (mascota.id == index) {
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
    <input type="hidden" id="pID" name="pID" value="${mascota.id}">
    <input type="hidden" id="pDID" name="pDID" value="${mascota.did}">
    <label for="petName">Nombre</label>
    
    <input type="text" name="" id="petName" value="${mascota.nombre}" class="form-control"  required>
    <label for="petRaze">Especie</label>
    <input type="tel" name="" id="petRaze" value="${mascota.especie}" class="form-control" required >
    <label for="petSex">Sexo</label>
    <select id="petSex"  class="form-select">
    <option selected>${mascota.sexo}</option>
    <option value="hembra">Hembra</option>
    <option value="macho">Macho</option>
  </select>
    <label for="petColor">Color</label>
    <input type="text" value="${mascota.color}"name="" id="petColor" class="form-control" required >
    <label for="petAlergy">Alergias</label>
    <input type="text" value="${mascota.alergias}"name="" id="petAlergy" class="form-control" required >
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
  })


}
function guardarEdicion() {

  let ID = document.getElementById("pID").value;
  let amors = document.getElementById("pDID").value;
  let nombre = document.getElementById("petName").value;
  let especie = document.getElementById("petRaze").value;
  let sexo = document.getElementById("petSex").value;
  let color = document.getElementById("petColor").value;
  let alergy = document.getElementById("petAlergy").value;
  let a = duenos.map((item, index) => item.id == ID ? index : false);
  let b = a.filter(item => item != false)
  pet = {
    id: ID,
    nombre: nombre,
    especie: especie,
    sexo: sexo,
    color: color,
    alergias: alergy,
    did: amors
  };
  mascotas[b] = pet;
  actualizar(b, pet)
}

function actualizar(pos, pet) {
  let mD = duenos.map(function f(dueno, index) {

    if (pet.did == dueno.id) {
      duenos[index]["mascotas"].map(function g(item, ind) {
        if (pet.id == item.id) { duenos[index]["mascotas"][ind] = pet; }
      });
      cuadro(dueno.id);
    }



  });
}

function guardar(pet) {
  let mD = duenos.map(function f(dueno, index) {

    if (pet.did == dueno.id) {
      duenos[index]["mascotas"].push(pet)
    }



  });
}

function eliminar(pet) {

  let mD = duenos.map(function f(dueno, index) {

    if (pet.did == dueno.id) {
      duenos[index]["mascotas"].map(function g(item, ind) {
        if (pet.id == item.id) {
          let c = duenos[index]["mascotas"].splice(0, ind);
          let d = duenos[index]["mascotas"].splice(1,);
          duenos[index]["mascotas"] = c.concat(d);
        }
      });
    }



  });
}



function nuevaConsulta(index) {

  let contenidoHTML = document.getElementById("modal1");
  let fecha = new Date();

  mascotas.map(function cons(mascota, indice) {
    if (mascota.id === index) {
      let contenido = `
      <div class="modal-dialog" role="document">
      <div class="modal-content" >
        <div class="modal-header" >
      <h5 class="modal-title" id="">Nueva consulta</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      <div class="modal-body">
      <div class="form-group">
      <label for="fecha" class="col-form-label">Fecha:</label>
      <input type="text" class="form-control" value="${fecha.toLocaleDateString()}"id="fecha" readonly>
      <label for="calergia" class="col-form-label">Especie:</label>
      <input type="text" class="form-control" value="${mascota.especie}"id="cespecie" readonly>
      <label for="calergia" class="col-form-label">Sexo:</label>
      <input type="text" class="form-control" value="${mascota.sexo}"id="csexo" readonly>
      <label for="calergia" class="col-form-label">Alergias:</label>
      <input type="text" class="form-control" value="${mascota.alergias}"id="calergia" readonly>
     
      <label for="observaciones">Observaciones:</label>
      <textarea class="form-control" id="observaciones" rows="3"></textarea>
      <label for="peso" class="col-form-label">Peso:</label>
      <input type="number" class="form-control" id="peso" >
      </div>
      <label for="selecConsulta" class="col-form-label">Tipo de consulta:</label>
      <select class="form-select" onchange="cambioTipo(this)" id="selectConsulta" required>
      <option selected>Open this select menu</option>
      <option value="1" >Consulta general</option>
      <option value="2">Cirugía</option>
      <option value="3">Estética</option>
      <option value="4">Laboratorio</option>
    </select>
    <div id="cambio">

    </div>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      <button type="button" data-dismiss="modal" onclick="guardarConsulta(${mascota.id},${mascota.did})" class="btn btn-primary">Guardar cambios</button>
      </div>
      </div>
      </div>
      </div>`;
      contenidoHTML.innerHTML = contenido;

    }

  });

}

function cambioTipo(objeto) {
  let kg = document.getElementById("peso").value;
  let agregar = document.getElementById("cambio");
  let valor = parseFloat(objeto.value);
  switch (valor) {
    case 1:
      agregar.innerHTML = "";
      let agregarHTML1 = `<div class="form-group">
    <label for="diag">Diagnóstico:</label>
    <textarea class="form-control" id="diag" rows="3"></textarea>
  </div>`;
      agregar.innerHTML = agregarHTML1;
      break;
    case 2:


      agregar.innerHTML = "";
      let agregarHTML = ` <div class="form-group">
    <label for="xilazina">Xilazina 10% >10Kg
    </label>
    <input type="number" class="form-control" id="xilazina" value="${(kg * 1.3) / 100}">
    <label for="xilazina2">Xilazina % 20 <10Kg</label>
    <input type="number" class="form-control" id="xilazina2" value="${(kg * 1.3) / 20}">
    <label for="Tramadol">Tramadol</label>
    <input type="number" class="form-control" id="Tramadol" value="${(kg * 3) / 50}">
    <label for="Zelazol">Zelazol
    </label>
    <input type="number" class="form-control" id="Zelazol" value="${(kg * 0.05)}">
    <label for="Zoletil">Zoletil</label>
    <input type="number" class="form-control" id="Zoletil" value="${(kg * 0.125)}">
    <label for="Pento">Pento</label>
    <input type="number" class="form-control" id="Pento" value="${(kg * 28 / 65)}">
    <label for="Vk">Vitamina K</label>
    <input type="number" class="form-control" id="Vk" value="${(kg * 2 / 10)}">
    <small  class="form-text text-muted">Medidas sugeridas con base en el peso y formulas conocidas.</small>
  </div>`;
      agregar.innerHTML = agregarHTML;
      break;
    case 3:
      agregar.innerHTML = "";
      break;
    case 4:
      agregar.innerHTML = "";
      let agregarHTML2 = `<div class="form-group">
    <label for="estudio">Estudio:</label>
    <input type="number" class="form-control" id="estudio">
    <label for="resultado">Resultado:</label>
    <input type="text" class="form-control" id="resultado">
  </div>`;
      agregar.innerHTML = agregarHTML2;
      break;
    default:
      //nothing to do here
      break;
  }
}

function guardarConsulta(mid,did) {

  let id = mid;
  let fecha = document.getElementById("fecha").value;
  let cespecie = document.getElementById("cespecie").value;
  let csexo = document.getElementById("csexo").value;
  let calergia = document.getElementById("calergia").value;
  let peso = document.getElementById("peso").value;
  let observaciones = document.getElementById("observaciones").value;
  let ctipo = document.getElementById("selectConsulta").value;
  let ids = consultas.map(item => parseFloat(item.id));
  ids = Math.max(...ids);

  let consul = {
    id: ids + 1,
    idc: id,
    peso: peso,
    alergias: calergia,
    observaciones: observaciones,
    sexo: csexo,
    especie: cespecie,
    tipo: ctipo,
    estudios: "",
    resultados: "",
    fecha: fecha,
    xilazina: "",
    xilazina2: "",
    Tramadol: "",
    Zelazol: "",
    Zoletil: "",
    Pento: "",
    Vk: "",
    diagnostico: ""
  }

  switch (parseFloat(ctipo)) {
    case 1:
      let diag = document.getElementById("diag").value;
      consul.diagnostico = diag;
      consul.tipo="Consulta General";
      break;

    case 2:
      let xila1 = document.getElementById("xilazina").value;
      let xila2 = document.getElementById("xilazina2").value;
      let tramadol = document.getElementById("Tramadol").value;
      let Zela = document.getElementById("Zelazol").value;
      let zole = document.getElementById("Zoletil").value;
      let pento = document.getElementById("Pento").value;
      let vk = document.getElementById("Vk").value;
      consul.xilazina = xila1;
      consul.xilazina2 = xila2;
      consul.Tramadol = tramadol;
      consul.Zelazol = Zela;
      consul.Zoletil = zole;
      consul.Pento = pento;
      consul.Vk = vk;
      consul.tipo="Cirugía";
      break;
    case 3:
      consul.tipo="Estética";
      break;
    case 4:
      let estudio = document.getElementById("estudio").value;
      let resultado = document.getElementById("resultado").value;
      consul.estudios = estudio;
      consul.resultados = resultado;
      break;
    
  }
  consultas.push(consul);
  cuadro(did);
  

}




function verConsultas(id){
 
  let contenidoHTML = document.getElementById("modal1");
  let uno,dos;
  contenidoHTML.innerHTML="";
  vector=[];
 
  
  consultas.map(function ed(consulta) {
    
    if (consulta.idc == id) {
     
      uno = `
      <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content" >
        <div class="modal-header" >
      <h5 class="modal-title" id="">Consultas</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      <div class="modal-body table-responsive">
          <table class="table">
  <thead class="thead-dark">
    <tr>
    <th scope="col">#</th>
    <th scope="col">Fecha</th>
    <th scope="col">Especie</th>
    <th scope="col">Sexo</th>
    <th scope="col">Peso</th>
    <th scope="col">Alergias</th>
    <th scope="col">Observaciones</th>
    <th scope="col">Tipo de consulta</th>
    <th scope="col">Estudio</th>
    <th scope="col">Resultados</th>
    <th scope="col">Xilazina 10%>10Kg</th>
    <th scope="col">Xilazina % 20 <10Kg</th>
    <th scope="col">Tramadol</th>
    <th scope="col">Zelazol</th>
    <th scope="col">Zoletil</th>
    <th scope="col">Pento</th>
    <th scope="col">Vitamina K</th>
    <th scope="col">Diagnóstico</th>
    </tr>
  </thead>
  <tbody>
  `;
  
    }
  });
  vector.push(uno);
  consultas.map(function ed(consulta) {
    if (consulta.idc == id) {
     
      dos = `
      <tr>
      <td>${consulta.id}</td>
      <td>${consulta.fecha}</td>
      <td>${consulta.especie}</td>
      <td>${consulta.sexo}</td>
      <td>${consulta.peso}</td>
      <td>${consulta.alergias}</td>
      <td>${consulta.observaciones}</td>
      <td>${consulta.tipo}</td>
      <td>${consulta.estudios}</td>
      <td>${consulta.resultados}</td>
      <td>${consulta.xilazina}</td>
      <td>${consulta.xilazina2}</td>
      <td>${consulta.Tramadol}</td>
      <td>${consulta.Zelazol}</td>
      <td>${consulta.Zoletil}</td>
      <td>${consulta.Pento}</td>
      <td>${consulta.Vk}</td>
      <td>${consulta.diagnostico}</td>
      </tr>
  `;
  vector.push(dos);
    }
  });
  vector.push(`</tbody>
     
  </div> </table>
        </div>
        <div class="modal-footer">
        <a data-toggle="modal" href="#myModal2" class="btn btn-primary">Launch modal</a>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" data-dismiss="modal"  class="btn btn-primary">Guardar cambios</button>
        </div>
        </div>
        </div>
        </div>`)
  contenidoHTML.innerHTML=vector.join("");
}
btnBuscar.onclick = buscador;