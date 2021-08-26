const listaMascotas = document.getElementById('lista-Mascotas');
//variables del modal
const tipo = document.getElementById('tipoRaza');
const bodyConsultas=document.getElementById("cambio");
const nombreDueno = document.getElementById('fnombreD');
const nombreMascota = document.getElementById('fnombreM');
const formModal = document.getElementById("form-modal");
const btnGuardar = document.getElementById("guardar");
const indiceEditar = document.getElementsByName("indice");
const ftel = document.getElementsByName("tel");
const fcolor = document.getElementsByName("color");
const falergias = document.getElementsByName("color");
const fgenero = document.getElementsByName("genero");
const fdireccion = document.getElementsByName("direccion");
function getDate(){
    let fecha=new Date();
    fecha=fecha.toLocaleDateString;
    return fecha
}

let mascotas = [{
    tipo: "Gato",
    nombreD: "David García",
    direccion: "Rio lerma 255, Miguel Hidalgo",
    tel: 3134568746,
    tipo: "Gato",
    genero: "Macho",
    color: "blanco con negro",
    alergias: "Ninguna",
    reproductivo: "Incompleto",
    nombreM: "Zeus"
},
{
    tipo: "Perro",
    nombreD: "Felipe Cruz",
    direccion: "Las marias 33, Union",
    tel: 3124589124,
    tipo: "Gato",
    genero: "Hembra",
    color: "gris",
    alergias: "Ninguna",
    reproductivo: "Incompleto",
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
    <div class="btn-group" role="group" >   <a name="" id="" class="btn btn-info editar" data-toggle="modal" data-target="#modalCrearMascota" onclick=editar(${index}) href="#" role="button">${mascota.tipo == "Gato" ? `<i class="fa fa-cat" aria-hidden="true"></i>` : `<i class="fa fa-dog" aria-hidden="true"></i>`} Editar</a>
        
        <a name="" id="" class="btn btn-danger eliminar" href="#" role="button" onclick=clicEliminar(${index})><i class="fa fa-trash"  aria-hidden="true"></i> Eliminar</a> </div>
   </td>
    <td>
    <div class="btn-group" role="group">  <a name="" id="" class="btn btn-info"  href="#" role="button">
            <i class="far fa-eye"></i>Ver</a>
        
        <a name="" id="" class="btn btn-primary"  data-toggle="modal" data-target="#modalNuevaConsulta" onclick="nuevaConsulta(${index})" href="#" role="button"><i class="fas fa-pen-square"></i> Crear</a> </div>
   </td>
    </tr>`).join("");

    listaMascotas.innerHTML = htmlMascotas;
    //Array.from(document.getElementsByClassName("eliminar")).forEach((btneliminar,index)=> btneliminar.onclick=clicEliminar(index));
}
function limpiadora() {
    fnombreM.value = "";
    fnombreD.value = "";
    tipoRaza.value = "";
    indice.value = "";
    genero.value = "";
    tel.value = "";
    direccion.value = "";
    alergias.value = "";
    btnGuardar.innerHTML = "Crear";
    color.value = "";
    reproductivo.value = "";

}
function enviarModalForm(evento) {
    evento.preventDefault();
    
    const datos = {
        nombreM:fnombreM.value,
        tipo:tipoRaza.value,
        genero: genero.value,
        tel: tel.value,
        nombreD:fnombreD.value,
        direccion:direccion.value,
        alergias:alergias.value,
        color:color.value,
        reproductivo: reproductivo.value,
    }
    limpiadora();
    const accion = btnGuardar.innerHTML;
    if (accion == "Editar") { mascotas[indice.value] = datos; } else { mascotas.push(datos); }


    console.log(mascotas)
    listarMascotas();
    
}
function clicEliminar(index) {
    var result = confirm("Seguro que deseas eliminar a la mascota?");
    if (result) {
        delete mascotas[index];
        listarMascotas();
    }
}
function editar(index) {
    btnGuardar.innerHTML = "Editar";
    $("modalCrearMascota").modal('toggle');
    const mascota = mascotas[index];
    fnombreM.value=mascota.nombreM,
    tipoRaza=mascota.tipo.value,
     genero.value=mascota.genero,
     tel.value=mascota.tel ,
    fnombreD.value=mascota.nombreD,
    direccion.value=mascota.direccion,
    alergias.value=mascota.alergias,
    color.value=mascota.color,
    reproductivo.value=mascota.reproductivo,
    indice.value = index;


}

function nuevaConsulta(index){
    const mascota = mascotas[index];
    cnombreM.value=mascota.nombreM,
     ctel.value=mascota.tel ,
    cnombreD.value=mascota.nombreD,
    calergia.value=mascota.alergias

}
// funcion para agregar campos a consulta
function cambioTipo(opcion){
    const varPeso=document.getElementById("peso").value;
    if(opcion.value==1 || opcion.value==3){
        bodyConsultas.innerHTML="";
   
    }
if(opcion.value==2){
let htmlConsulta=`  <div class="form-group fconsult">
<label for="xiza1" class="col-form-label">Tipo de cirugía:</label>
<input type="text" class="form-control" id="tipoCirugia">
<label for="xiza1" class="col-form-label">Xilazina >10Kg 10%:</label>
<input type="number" class="form-control" id="xiza1" value="${(varPeso*1.3)/100}"readonly>
<label for="xiza2" class="col-form-label">Xilazina <10Kg 20%:</label>
<input type="number" class="form-control"value="${(varPeso*1.3)/20}" id="xiza2" readonly>
<label for="Tramadol" class="col-form-label">Tramadol:</label>
<input type="number" class="form-control" value="${(varPeso*3)/50}" id="Tramadol" readonly>
<label for="Zelazol" class="col-form-label" >Zelazol:</label>
<input type="number" class="form-control" value="${(varPeso*0.05)}" id="Zelazol" readonly>
<label for="Pentobarbital" class="col-form-label">Pentobarbital:</label>
<input type="number" class="form-control" id="Pentobarbital" value="${(varPeso*28)/63}" readonly>
<label for="Pentobarbital" class="col-form-label">Zoletil:</label>
<input type="number" class="form-control" id="Pentobarbital" value="${(varPeso*0.125)}" readonly>
<label for="Pentobarbital" class="col-form-label">Vitamina K:</label>
<input type="number" class="form-control" id="Pentobarbital" value="${(varPeso*2)/20}" readonly>
</div>`;
bodyConsultas.innerHTML=htmlConsulta;

}
if(opcion.value==4){
    let htmlConsulta=`<div class="form-group fconsult">
<label for="tipoEstudio" class="col-form-label">Estudio:</label>
<input type="text" class="form-control" id="tipoEstudio">
<label for="estudioResultado" class="col-form-label">Resultado:</label>
<input type="text" class="form-control" id="estudioResultado">
`;
bodyConsultas.innerHTML=htmlConsulta;
}

}
listarMascotas();
formModal.onsubmit = enviarModalForm;
btnGuardar.onclick = enviarModalForm;
