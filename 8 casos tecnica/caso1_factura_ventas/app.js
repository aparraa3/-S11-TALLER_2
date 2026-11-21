// Vectores paralelos para almacenar los productos de la compra.
const productos = [];
const cantidades = [];
const precios = [];

const selector = document.getElementById("producto");
const cantidadInput = document.getElementById("cantidad");
const lista = document.getElementById("lista");
const resultado = document.getElementById("resultado");

document.getElementById("btnAgregar").addEventListener("click", agregarProducto);
document.getElementById("btnCalcular").addEventListener("click", calcularFactura);

function agregarProducto() {
  const datos = selector.value.split("|");
  const nombre = datos[0];
  const precio = Number(datos[1]);
  const cantidad = Number(cantidadInput.value);

  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    alert("Ingrese una cantidad entera mayor que cero.");
    return;
  }

  productos.push(nombre);
  cantidades.push(cantidad);
  precios.push(precio);
  mostrarProductos();
  cantidadInput.value = "";
}

function mostrarProductos() {
  lista.innerHTML = "";
  for (let i = 0; i < productos.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${productos[i]} - ${cantidades[i]} unidad(es) x $${precios[i].toFixed(2)}`;
    lista.appendChild(li);
  }
}

function calcularFactura() {
  if (productos.length === 0) {
    alert("Primero agregue al menos un producto.");
    return;
  }

  let subtotal = 0;
  // Se recorren los vectores para sumar cantidad por precio.
  for (let i = 0; i < productos.length; i++) {
    subtotal += cantidades[i] * precios[i];
  }

  const iva = subtotal * 0.15;
  let descuento = 0;

  if (subtotal > 20) {
    descuento = subtotal * 0.05;
  } else if (subtotal <= 20) {
    descuento = 0;
  }

  const total = subtotal + iva - descuento;
  resultado.innerHTML = `
    <h3>Resumen de factura</h3>
    <p>Subtotal: $${subtotal.toFixed(2)}</p>
    <p>IVA (15%): $${iva.toFixed(2)}</p>
    <p>Descuento: $${descuento.toFixed(2)}</p>
    <strong>Total a pagar: $${total.toFixed(2)}</strong>`;
}