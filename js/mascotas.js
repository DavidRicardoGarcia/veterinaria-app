const listaMascotas = document.getElementById('lista-Mascotas');
//variables del modal
const tipo=document.getElementById('tipoRaza');
const nombreDueno=document.getElementById('fnombreD');
const nombreMascota=document.getElementById('fnombreM');
const formModal=document.getElementById("form-modal");
const btnGuardar=document.getElementById("guardar");
const indiceEditar=document.getElementsByName("indice");
const ftel=document.getElementsByName("tel");
const fcolor=document.getElementsByName("color");
const falergias=document.getElementsByName("color");
const fgenero=document.getElementsByName("genero");
const fdireccion=document.getElementsByName("direccion");


let mascotas = [{
    tipo: "Gato",
    nombreD: "David García",
    direccion: "Rio lerma 255, Miguel Hidalgo",
    tel: 3134568746,
    tipo:"Gato",
    genero:"Macho",
    color:"blanco con negro",
    alergias:"Ninguna",
    reproductivo:"incompleto",
    nombreM: "Zeus"
},
{
    tipo: "Perro",
    nombreD: "Felipe Cruz",
    direccion: "Las marias 33, Union",
    tel: 3124589124,
    tipo:"Gato",
    genero:"Hembra",
    color:"gris",
    alergias:"Ninguna",
    reproductivo:"incompleto",
    nombreM: "Fiona"
}];


function listarMascotas() {
    let htmlMascotas = mascotas.map((mascota, index) => `<tr>
    <td>${index}</td>
    <td>${mascota.nombreD}</td>
    <td>${mascota.direccion}</td>
    <td>${mascota.tel}</td>
    <td>${mascota.nombreM}</td>
    <td>${mascota.tipo}</td>
    <td>${mascota.genero}</td>
    <td>${mascota.color}</td>
    <td>${mascota.alergias}</td>
    <td>${mascota.reproductivo}</td>
    <td>
    <div class="btn-group" role="group" >   <a name="" id="" class="btn btn-info editar" data-toggle="modal" data-target="#modalCrearMascota" onclick=editar(${index}) href="#" role="button">${mascota.tipo=="Gato" ? `<i class="fa fa-cat" aria-hidden="true"></i>` : `<i class="fa fa-dog" aria-hidden="true"></i>`} Editar</a>
        
        <a name="" id="" class="btn btn-danger eliminar" href="#" role="button" onclick=clicEliminar(${index})><i class="fa fa-trash"  aria-hidden="true"></i> Eliminar</a> </div>
   </td>
    <td>
    <div class="btn-group" role="group">  <a name="" id="" class="btn btn-info"  href="#" role="button">
            <i class="far fa-eye"></i>Ver</a>
        
        <a name="" id="" class="btn btn-primary" href="#" role="button"><i class="fas fa-pen-square"></i> Crear</a> </div>
   </td>
    </tr>`).join("");

    listaMascotas.innerHTML = htmlMascotas;
    //Array.from(document.getElementsByClassName("eliminar")).forEach((btneliminar,index)=> btneliminar.onclick=clicEliminar(index));
}

function enviarModalForm(evento){
    evento.preventDefault();
    const datos={
        tipo: tipo.value,
        nombreD:nombreDueno.value,
        nombreM:nombreMascota.value
    }
    const accion=btnGuardar.innerHTML;
    console.log(indice.value)
    if (accion=="Editar") {mascotas[indice.value]=datos;}else {mascotas.push(datos);}
    fnombreM.value="";
    fnombreD.value="";
    tipoRaza.value="";
    indice.value="";
    btnGuardar.innerHTML="Crear"
    
    
    listarMascotas();
}
    function clicEliminar(index){
    var result = confirm("Seguro que deseas eliminar a la mascota?");
    if(result){
     delete mascotas[index];
     listarMascotas();}
}
function editar(index){
    btnGuardar.innerHTML="Editar";
    $("modalCrearMascota").modal('toggle');
    const mascota=mascotas[index];
    fnombreM.value=mascota.nombreM;
    fnombreD.value=mascota.nombreD;
    tipoRaza.value=mascota.tipo;
    indice.value=index;

}
listarMascotas();
formModal.onsubmit=enviarModalForm;
btnGuardar.onclick=enviarModalForm;