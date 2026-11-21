// Vectores paralelos para nombres y notas.
const nombres = [];
const notas = [];

document.getElementById("btnAgregar").addEventListener("click", agregarEstudiante);
document.getElementById("btnCalcular").addEventListener("click", calcularEstadisticas);

function agregarEstudiante() {
  const nombre = document.getElementById("nombre").value.trim();
  const textoNota = document.getElementById("nota").value;
  const nota = Number(textoNota);

  if (nombre === "" || textoNota === "") {
    alert("Complete el nombre y la nota.");
    return;
  }

  if (nota < 0 || nota > 10) {
    alert("La nota debe estar entre 0 y 10.");
    return;
  }

  nombres.push(nombre);
  notas.push(nota);
  document.getElementById("nombre").value = "";
  document.getElementById("nota").value = "";
  mostrarEstudiantes();
}

function mostrarEstudiantes() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (let i = 0; i < nombres.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${nombres[i]}: ${notas[i]}`;
    lista.appendChild(li);
  }
}

function calcularEstadisticas() {
  if (notas.length === 0) {
    alert("Registre al menos un estudiante.");
    return;
  }

  let suma = 0;
  let aprobados = 0;
  let notaMayor = notas[0];
  let nombreMayor = nombres[0];

  for (let i = 0; i < notas.length; i++) {
    suma += notas[i];

    if (notas[i] >= 7) {
      aprobados++;
    }

    if (notas[i] > notaMayor) {
      notaMayor = notas[i];
      nombreMayor = nombres[i];
    }
  }

  const promedio = suma / notas.length;
  const porcentaje = (aprobados / notas.length) * 100;

  document.getElementById("resultado").innerHTML = `
    <h3>Estadísticas del grupo</h3>
    <p>Promedio general: ${promedio.toFixed(2)}</p>
    <p>Nota más alta: ${notaMayor} (${nombreMayor})</p>
    <p>Aprobados: ${aprobados} de ${notas.length}</p>
    <strong>Porcentaje de aprobados: ${porcentaje.toFixed(2)}%</strong>`;
}