// Vectores paralelos: nombre y precio de cada producto.
const productos = [];
const precios = [];

document.getElementById("btnAgregar").addEventListener("click", agregarProducto);
document.getElementById("btnFactura").addEventListener("click", generarFactura);

function agregarProducto() {
  const nombre = document.getElementById("producto").value.trim();
  const textoPrecio = document.getElementById("precio").value;
  const precio = Number(textoPrecio);

  if (nombre === "" || textoPrecio === "") {
    alert("Ingrese el nombre y el precio.");
    return;
  }

  if (precio <= 0 || !Number.isFinite(precio)) {
    alert("El precio debe ser mayor que cero.");
    return;
  }

  // Se evita registrar dos veces el mismo producto.
  if (productos.some(p => p.toLowerCase() === nombre.toLowerCase())) {
    alert("Ese producto ya existe. No se permiten duplicados.");
    return;
  }

  productos.push(nombre);
  precios.push(precio);
  document.getElementById("producto").value = "";
  document.getElementById("precio").value = "";
  mostrarProductos();
}

function mostrarProductos() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (let i = 0; i < productos.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${productos[i]} - $${precios[i].toFixed(2)}`;
    lista.appendChild(li);
  }
}

function generarFactura() {
  if (productos.length === 0) {
    alert("Agregue productos antes de generar la factura.");
    return;
  }

  let subtotal = 0;
  let precioMayor = precios[0];
  let productoMayor = productos[0];

  for (let i = 0; i < precios.length; i++) {
    subtotal += precios[i];

    if (precios[i] > precioMayor) {
      precioMayor = precios[i];
      productoMayor = productos[i];
    }
  }

  const iva = subtotal * 0.15;
  const total = subtotal + iva;
  const promedio = subtotal / precios.length;

  document.getElementById("resultado").innerHTML = `
    <h3>Factura</h3>
    <p>Cantidad total de productos vendidos: ${productos.length}</p>
    <p>Subtotal: $${subtotal.toFixed(2)}</p>
    <p>IVA (15%): $${iva.toFixed(2)}</p>
    <p>Total a pagar: <strong>$${total.toFixed(2)}</strong></p>
    <p>Producto mas costoso: ${productoMayor} ($${precioMayor.toFixed(2)})</p>
    <p>Promedio de precios: $${promedio.toFixed(2)}</p>`;
}