const myModal = document.getElementById('exampleModal');
const myInput = document.getElementById('myInput');

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus();
});

// Obtener el botón y la tabla
const btnCargar = document.getElementById("inputCarga");
const tablaClientes = document.getElementById("table_add");

// Agregar un evento de clic al botón
btnCargar.addEventListener("click", function () {
  // Hacer una solicitud HTTP para obtener los datos JSON de la URL
  const url = new XMLHttpRequest();
  url.open("GET", "https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/clientes.json");
  url.onload = function () {
    if (url.status === 200) {
      // Analizar los datos JSON y agregarlos a la tabla
      const clientes = JSON.parse(url.responseText);
      for (let i = 0; i < clientes.length; i++) {
        const cliente = clientes[i];
        const mb = calcularMB(cliente.edad, cliente.peso, cliente.altura, cliente.sexo);
        const ger = calcularGER(mb, cliente.actividad);
        const get = calcularGET(ger, cliente.ingresos);
        const fila = `<tr>
          <td>${cliente.nombre}</td>
          <td>${cliente.apellidos}</td>
          <td><span class='badge text-bg-primary'>${cliente.sexo}</span></td>
          <td>${cliente.edad}</td>
          <td>${cliente.altura}</td>
          <td>${cliente.peso}</td>
          <td><span class='badge text-bg-secondary'>${cliente.actividad}</span></td>
          <td>${get.toFixed(2)}</td>
          <td>${ger.toFixed(2)}</td>
        </tr>`;
        tablaClientes.innerHTML += fila;
      }
    }
  };
  url.send();
});




$(document).ready(function () {
  //obtenemos el valor de los input

  $('#save-client').click(function () {
    var Nombre = document.getElementById("Nombre").value;
    var Apellidos = document.getElementById("Apellidos").value;
    var Sexo = document.getElementById("Sexo").value;
    var NivelActividad = document.getElementById("NivelActividad").value;
    var Edad = document.getElementById("Edad").value;
    var Peso = document.getElementById("Peso").value;
    var Altura = document.getElementById("Altura").value;

    // Validar campos obligatorios
    if (!Nombre || !Apellidos || !Sexo || !NivelActividad || !Edad || !Peso || !Altura) {
      alert("Por favor, rellene todos los campos obligatorios");
      return false;
    }

    var fila = '<tr><td>' + Nombre + '</td><td>' + Apellidos + '</td><td><span class="badge text-bg-primary">' + Sexo + '</span></td><td>' + Edad + '</td><td>' + Altura + '</td><td>' + Peso + '</td><td><span class="badge text-bg-secondary">' + NivelActividad + '</span></td><td></td><td></td></tr>';

    $('#table_add tbody').append(fila);

    document.getElementById("Nombre").value = "";
    document.getElementById("Apellidos").value = "";
    document.getElementById("Sexo").value = "";
    document.getElementById("NivelActividad").value = "";
    document.getElementById("Edad").value = "";
    document.getElementById("Peso").value = "";
    document.getElementById("Altura").value = "";


    //Si quieres que desaparezca cuando se envie 
    $('#exampleModal').removeClass('show');
    $('body').prop("style").removeProperty("overflow");
    $('body').prop("style").removeProperty("padding-right");
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $('#exampleModal').css("display", "none");

  });

});



const tabla = document.querySelector("#table_add");
const filas = tabla.querySelectorAll("tr");

function calcularMB(edad, peso, altura, genero) {
  let mb = 0;
  if (genero === "hombre") {
    mb = 88.36
      + (13.4 * peso)
      + (4.8 * altura)
      - (5.7 * edad);
  } else if (genero === "mujer") {
    mb = 447.6
      + (9.2 * peso)
      + (3.1 * altura)
      - (4.3 * edad);
  }
  return mb;
}

function calcularGER(mb, actividad) {
  let factorActividad = 0;
  if (actividad === "sedentaria") {
    factorActividad = 1.2;
  } else if (actividad === "media") {
    factorActividad = 1.5;
  } else if (actividad === "intensa") {
    factorActividad = 1.9;
  }
  const ger = mb * factorActividad;
  return ger;
}

function calcularGET(ger, totalIngresos) {
  if (isNaN(totalIngresos) || totalIngresos <= 0) {
    // Si totalIngresos es NaN o menor o igual a cero, devuelve cero
    return 0;
  } else {
    // De lo contrario, realiza la operación de división
    const get = (ger / totalIngresos) * 100;
    return get;
  }
}


filas.forEach((fila, index) => {
  if (index === 0) {
    return; // Salta la primera fila (la fila de encabezado)
  }

  const edad = parseInt(fila.cells[3].textContent);
  const altura = parseInt(fila.cells[4].textContent);
  const peso = parseInt(fila.cells[5].textContent);
  const actividad = fila.cells[6].textContent.trim();

  const genero = fila.cells[2].textContent.trim();
  const mb = calcularMB(edad, peso, altura, genero);
  const ger = calcularGER(mb, actividad);
  const get = calcularGET(ger, peso);

  const gerCelda = document.createElement("td");
  gerCelda.textContent = ger.toFixed(2);
  fila.appendChild(gerCelda);

  const getCelda = document.createElement("td");
  getCelda.textContent = get.toFixed(2);
  fila.appendChild(getCelda);
}); 





