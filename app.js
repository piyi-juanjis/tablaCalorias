const myModal = document.getElementById('exampleModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus()
})

// Obtener el botón y la tabla
var btnCargar = document.getElementById("inputCarga");
var tablaClientes = document.getElementById("tablaClientes");


// Agregar un evento de clic al botón
btnCargar.addEventListener("click", function() {
  // Hacer una solicitud HTTP para obtener los datos JSON de la URL
  var url = new XMLHttpRequest();
  url.open("GET", "https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/clientes.json");
  url.onload = function() {
    if (url.status === 200) {
      // Analizar los datos JSON y agregarlos a la tabla
      var clientes = JSON.parse(url.responseText);
      for (var i = 0; i < clientes.length; i++) {
        var cliente = clientes[i];
        var fila = "<tr>" +
          "<td>" + cliente.nombre + "</td>" +
          "<td>" + cliente.apellidos + "</td>" +
          "<td><span class='badge text-bg-primary'>" + cliente.sexo + "</span></td>" +
          "<td>" + cliente.edad + "</td>" +
          "<td>" + cliente.altura + "</td>" +
          "<td>" + cliente.peso + "</td>" +
          "<td><span class='badge text-bg-secondary'>" + cliente.actividad + "</span></td>" +
          "<td>" + cliente.get + "</td>" +
          "<td>" + cliente.ger + "</td>" +
          "</tr>";
        tablaClientes.innerHTML += fila;
      }
    }
  };
  url.send();
});


  

  
