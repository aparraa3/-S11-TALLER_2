// Vector de objetos: cada paciente tiene nombre y prioridad.
const turnos = [];

document.getElementById("btnRegistrar").addEventListener("click", registrarPaciente);
document.getElementById("btnAtender").addEventListener("click", atenderPaciente);

function registrarPaciente() {
  const nombre = document.getElementById("nombre").value.trim();
  const prioridad = document.getElementById("prioridad").value;

  if (nombre === "") {
    alert("Ingrese el nombre del paciente.");
    return;
  }

  turnos.push({ nombre: nombre, prioridad: prioridad });
  document.getElementById("nombre").value = "";
  mostrarTurnos();
}

function atenderPaciente() {
  if (turnos.length === 0) {
    alert("No hay pacientes pendientes.");
    return;
  }

  let posicion = -1;

  // Se busca el primer paciente con prioridad alta.
  for (let i = 0; i < turnos.length; i++) {
    if (turnos[i].prioridad === "Alta") {
      posicion = i;
      break;
    }
  }

  // Si no existe prioridad alta, se atiende al primero que llegó.
  let paciente;
  if (posicion !== -1) {
    paciente = turnos.splice(posicion, 1)[0];
  } else {
    paciente = turnos.shift();
  }

  document.getElementById("atencion").innerHTML =
    `<strong>Paciente en atención:</strong> ${paciente.nombre} (Prioridad ${paciente.prioridad})`;
  mostrarTurnos();
}

function mostrarTurnos() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (let i = 0; i < turnos.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${turnos[i].nombre} - Prioridad ${turnos[i].prioridad}`;
    lista.appendChild(li);
  }

  if (turnos.length === 0) {
    lista.innerHTML = "<li>No hay turnos pendientes.</li>";
  }
}