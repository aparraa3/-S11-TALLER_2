// Vector para almacenar los nombres de los clientes que esperan.
const turnos = [];
let totalAsignados = 0;
let atendidos = 0;

document.getElementById("btnAsignar").addEventListener("click", asignarTurno);
document.getElementById("btnAtender").addEventListener("click", atenderSiguiente);
document.getElementById("btnEstadisticas").addEventListener("click", verEstadisticas);

function asignarTurno() {
  const nombre = document.getElementById("nombre").value.trim();

  if (nombre === "") {
    alert("Ingrese el nombre del cliente.");
    return;
  }

  // No se permite repetir un nombre entre los turnos pendientes.
  const repetido = turnos.some(cliente => cliente.nombre.toLowerCase() === nombre.toLowerCase());
  if (repetido) {
    alert("Ese cliente ya tiene un turno pendiente.");
    return;
  }

  totalAsignados++;
  const numero = "T-" + String(totalAsignados).padStart(3, "0");
  turnos.push({ nombre: nombre, numero: numero });

  document.getElementById("nombre").value = "";
  mostrarTurnos();
}

function atenderSiguiente() {
  if (turnos.length === 0) {
    alert("No hay turnos pendientes.");
    return;
  }

  // shift() atiende y elimina el primer cliente de la fila.
  const cliente = turnos.shift();
  atendidos++;

  document.getElementById("atencion").innerHTML =
    `<strong>En atencion:</strong> ${cliente.nombre} - ${cliente.numero}`;

  mostrarTurnos();
}

function mostrarTurnos() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (let i = 0; i < turnos.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${turnos[i].numero} - ${turnos[i].nombre}`;
    lista.appendChild(li);
  }

  if (turnos.length === 0) {
    lista.innerHTML = "<li>No hay turnos pendientes.</li>";
  }
}

function verEstadisticas() {
  const pendientes = turnos.length;
  const porcentaje = totalAsignados === 0 ? 0 : (atendidos / totalAsignados) * 100;
  let mensaje = "";

  if (pendientes === 0 && totalAsignados > 0) {
    mensaje = "<p><strong>Jornada cerrada: no quedan turnos pendientes.</strong></p>";
  }

  document.getElementById("estadisticas").innerHTML = `
    <h3>Estadisticas del dia</h3>
    <p>Turnos totales asignados: ${totalAsignados}</p>
    <p>Turnos atendidos: ${atendidos}</p>
    <p>Turnos pendientes: ${pendientes}</p>
    <p>Porcentaje atendido: ${porcentaje.toFixed(2)}%</p>
    ${mensaje}`;
}