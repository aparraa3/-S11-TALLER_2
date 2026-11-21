// Vectores paralelos: cada placa corresponde a una hora de entrada.
const placas = [];
const horasEntrada = [];
let totalCobrado = 0;

document.getElementById("btnEntrada").addEventListener("click", registrarEntrada);
document.getElementById("btnSalida").addEventListener("click", registrarSalida);

function registrarEntrada() {
  const placa = document.getElementById("placaEntrada").value.trim().toUpperCase();
  const hora = Number(document.getElementById("horaEntrada").value);

  if (placa === "" || document.getElementById("horaEntrada").value === "" || hora < 0 || hora > 23 || !Number.isInteger(hora)) {
    alert("Ingrese una placa y una hora valida entre 0 y 23.");
    return;
  }

  if (placas.includes(placa)) {
    alert("Ese vehiculo ya se encuentra en el parqueadero.");
    return;
  }

  placas.push(placa);
  horasEntrada.push(hora);
  document.getElementById("placaEntrada").value = "";
  document.getElementById("horaEntrada").value = "";
  mostrarVehiculos();
}

function registrarSalida() {
  const placa = document.getElementById("placaSalida").value.trim().toUpperCase();
  const textoHora = document.getElementById("horaSalida").value;
  const horaSalida = Number(textoHora);

  if (placa === "" || textoHora === "" || horaSalida < 0 || horaSalida > 23 || !Number.isInteger(horaSalida)) {
    alert("Ingrese una placa y una hora valida entre 0 y 23.");
    return;
  }

  const posicion = placas.indexOf(placa);
  if (posicion === -1) {
    alert("La placa no estaregistrada.");
    return;
  }

  let horas = horaSalida - horasEntrada[posicion];
  // Si la hora de salida es menor, se considera que salio al dia siguiente.
  if (horas <= 0) horas += 24;

  const cobro = horas * 0.75;
  totalCobrado += cobro;

  alert(`Tiempo: ${horas} hora(s). Total a pagar: $${cobro.toFixed(2)}`);

  // Se eliminan ambos elementos para mantener los vectores paralelos.
  placas.splice(posicion, 1);
  horasEntrada.splice(posicion, 1);

  document.getElementById("placaSalida").value = "";
  document.getElementById("horaSalida").value = "";
  mostrarVehiculos();
}

function mostrarVehiculos() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (let i = 0; i < placas.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${placas[i]} - Entrada: ${horasEntrada[i]}:00`;
    lista.appendChild(li);
  }

  if (placas.length === 0) lista.innerHTML = "<li>No hay vehículos estacionados.</li>";
  document.getElementById("resultado").textContent = `Total cobrado hoy: $${totalCobrado.toFixed(2)}`;
}

mostrarVehiculos();