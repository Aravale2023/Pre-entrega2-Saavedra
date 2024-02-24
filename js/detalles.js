let detalleProducto = document.getElementById("detalleProductoId");
let exampleModal = document.getElementById("exampleModal");
let cantidadInput = exampleModal.querySelector("#cantidadInputId");
let btnAgregarCarrito = exampleModal.querySelector("#btnAgregarCarritoId");

let productos = [];

function mostrarDetalle() {
  let contenidoHTML = "";
  productos.forEach((producto) => {
    contenidoHTML += `
    <div class="mt-5">
        <h2>${producto.nombre}</h2>
        <div class="row">
          <div class="col-2">
            <img src="${producto.imagen}"/>
          </div>
          <div class="col-10">
            <p> ${producto.descripcion}</p>
          </div>
        </div>
        <button class="btn-add mt-4"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-code="${producto.nombre}">Seleccionar</button>
        <h3 class="mt-4">Caracteristicas</h3>
        <table class="table">
          <tbody>
            <tr>
              <td>Tipo de Producto:</td>
              <td>${producto.tipo}</td>
            </tr>
            <tr>
              <td>Envase:</td>
              <td>${producto.envase}</td>
            </tr>
            <tr>
              <td>Contenido</td>
              <td>${producto.unidad}</td>
            </tr>
          </tbody>
        </table>
    </div>
        `;
  });
  detalleProducto.innerHTML = contenidoHTML;
  const btnAdd = document.querySelectorAll(".btn-add");
  btnAdd.forEach((boton) => {
    boton.addEventListener("click", openModal);
  });
}
let productSelect = {};
let carritoList = [];

//Evento que abre el modal, todo esto es la interaccion con el modal
function openModal(event) {
  const nombre = event.target.dataset.code;
  let variableOutputNombreId = exampleModal.querySelector(
    "#variableOutputNombreId"
  );
  let variableOutputPrecioId = exampleModal.querySelector(
    "#variableOutputPrecioId"
  );
  productSelect = productos.filter((x) => x.nombre === nombre)[0];

  variableOutputNombreId.textContent = productSelect.nombre;
  variableOutputPrecioId.textContent = productSelect.precio;
  cantidadInput.value = 1;
}

document.addEventListener("DOMContentLoaded", function () {
  obtenerListaCarrito();
  getProducts();
});

function obtenerListaCarrito() {
  carritoList = JSON.parse(localStorage.getItem("carrito"));
}

btnAgregarCarrito.addEventListener("click", function () {
  const cantidad = cantidadInput.value;
  productSelect.cantidad = cantidad;
  let canBeAdded = true;

  if (!carritoList) {
    carritoList = [];
  }
  carritoList.forEach((item) => {
    if (item.code === productSelect.code) {
      item.cantidad = cantidad;
      canBeAdded = false;
    }
  });

  if (canBeAdded) {
    carritoList.push(productSelect);
  }
  Toastify({
    text: "Producto Agregado",
    className: "info",
    style: {
      background: "#155724",
    },
  }).showToast();
  localStorage.setItem("carrito", JSON.stringify(carritoList));
});

function getProducts() {
  const http = new XMLHttpRequest();
  const url = "https://run.mocky.io/v3/d1fbb33c-00f8-4f9b-9569-723e12490f66";
  http.onreadystatechange = function () {
    if (this.status === 200) {
      if (this.responseText != "") {
        productos = JSON.parse(this.responseText);
        mostrarDetalle();
      }
    }
  };

  http.open("GET", url);
  http.send();
}
