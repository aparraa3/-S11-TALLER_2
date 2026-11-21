// Vector que almacena el tipo y el monto de cada movimiento.
const movimientos = [];
let saldo = 0;

document.getElementById("btnRegistrar").addEventListener("click", registrarMovimiento);
document.getElementById("btnResumen").addEventListener("click", mostrarResumen);

function registrarMovimiento() {
  const monto = Number(document.getElementById("monto").value);
  const tipo = document.getElementById("operacion").value;

  if (!Number.isFinite(monto) || monto <= 0) {
    alert("Ingrese un monto mayor que cero.");
    return;
  }

  if (tipo === "deposito") {
    saldo += monto;
    movimientos.push({ tipo: "Depósito", monto: monto });
  } else if (tipo === "retiro") {
    if (monto > saldo) {
      alert("Saldo insuficiente. No se realizó el retiro.");
      return;
    }
    saldo -= monto;
    movimientos.push({ tipo: "Retiro", monto: monto });
  }

  document.getElementById("monto").value = "";
  mostrarMovimientos();
}

function mostrarMovimientos() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  for (let i = 0; i < movimientos.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${movimientos[i].tipo}: $${movimientos[i].monto.toFixed(2)}`;
    lista.appendChild(li);
  }
}

function mostrarResumen() {
  let totalDepositado = 0;
  let totalRetirado = 0;

  // Se recorre el vector y se acumulan depósitos y retiros.
  for (const movimiento of movimientos) {
    if (movimiento.tipo === "Depósito") {
      totalDepositado += movimiento.monto;
    } else if (movimiento.tipo === "Retiro") {
      totalRetirado += movimiento.monto;
    }
  }

  document.getElementById("resultado").innerHTML = `
    <h3>Resumen de cuenta</h3>
    <p>Total depositado: $${totalDepositado.toFixed(2)}</p>
    <p>Total retirado: $${totalRetirado.toFixed(2)}</p>
    <strong>Saldo final: $${saldo.toFixed(2)}</strong>`;
}