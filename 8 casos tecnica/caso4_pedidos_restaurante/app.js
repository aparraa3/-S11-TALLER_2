// Vectores paralelos de platos y unidades disponibles.
const platos = ["Arroz con pollo", "Ensalada", "Hamburguesa", "Sopa"];
const stock = [3, 1, 2, 0];
const pedidos = [];

document.getElementById("btnPedido").addEventListener("click", registrarPedido);

function registrarPedido() {
  const nombre = document.getElementById("plato").value;
  const posicion = platos.indexOf(nombre);

  if (posicion === -1) {
    alert("El plato seleccionado no existe.");
    return;
  }

  if (stock[posicion] > 0) {
    stock[posicion]--;
    pedidos.push(nombre);
    alert("Pedido registrado correctamente.");
  } else {
    alert("Producto agotado: " + nombre);
  }

  mostrarDatos();
}

function mostrarDatos() {
  const inventario = document.getElementById("inventario");
  const listaPedidos = document.getElementById("pedidos");
  const agotados = document.getElementById("agotados");

  inventario.innerHTML = "";
  listaPedidos.innerHTML = "";
  let platosAgotados = [];

  for (let i = 0; i < platos.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${platos[i]}: ${stock[i]} unidad(es)`;
    inventario.appendChild(li);

    if (stock[i] === 0) {
      platosAgotados.push(platos[i]);
    }
  }

  for (let i = 0; i < pedidos.length; i++) {
    const li = document.createElement("li");
    li.textContent = pedidos[i];
    listaPedidos.appendChild(li);
  }

  if (pedidos.length === 0) listaPedidos.innerHTML = "<li>No hay pedidos.</li>";
  agotados.innerHTML = `<strong>Platos agotados:</strong> ${platosAgotados.length ? platosAgotados.join(", ") : "Ninguno"}`;
}

mostrarDatos();