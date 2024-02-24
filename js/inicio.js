let productosSection = document.getElementById("productosSectionId");
const carrito = [];
const keyCart = "cart";
let productos = [];

function mostrarProductos() {
  var contenidoHTML = "";
  // Generar el HTML para cada producto
  productos.forEach(function (producto) {
    contenidoHTML += `
        <div class="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
          <div class="card">
            <img src="${producto.imagen}" alt="${producto.nombre}" sizes="" />
            <p>${producto.categoria}</p>
            <h2>${producto.nombre}</h2>
            <p class="price">$${producto.precio}</p>
            <a href="./pages/Detalle-Productos.html">Ver más..</a>
          </div>
        </div>
      
      `;
    var carrito = JSON.parse(localStorage.getItem(keyCart)) || [];
  });

  productosSection.innerHTML = contenidoHTML;
}

document.addEventListener("DOMContentLoaded", function () {
  getProducts();
});

function getProducts() {
  const http = new XMLHttpRequest();
  const url = "https://run.mocky.io/v3/d1fbb33c-00f8-4f9b-9569-723e12490f66";
  http.onreadystatechange = function () {
    if (this.status === 200) {
      if (this.responseText != "") {
        productos = JSON.parse(this.responseText);
        mostrarProductos();
      }
    }
  };

  http.open("GET", url);
  http.send();
}
