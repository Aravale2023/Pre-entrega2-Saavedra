let carrito = document.getElementById("carritoListId");
let viewTotal = document.getElementById("total");
let btnPagar = document.getElementById("btnPagarId");

let carritoList = [];

document.addEventListener("DOMContentLoaded", function () {
  carritoList = recuperarCarrito();
  mostrarCarrito();
});

function recuperarCarrito() {
  let list = JSON.parse(localStorage.getItem("carrito"));
  return list ? list : [];
}
let total = 0;

function mostrarCarrito() {
  let contenidoHTML = "";
  carritoList.forEach((carrito) => {
    total = total + carrito.precio * carrito.cantidad;
    contenidoHTML += `
    <div class="card mb-3">
    <div class="row">
      <div class="col-md-2 col-2 d-flex justify-content-center">
        <img src="${carrito.imagen}" alt="Producto 1" />
      </div>
      <div class="col-md-10 col-12 align-self-center">
        <div class="row">
          <div
            class="col-12 col-md-3 d-flex justify-content-center align-self-center"
          >

            <h2>${carrito.nombre}</h2>
          </div>
          <div
            class="col-12 col-md-3 d-flex justify-content-center align-self-center"
          >
            <p>Cantidad: ${carrito.cantidad}</p>
          </div>
          <div
            class="col-12 col-md-3 d-flex justify-content-center align-self-center"
          >
            <p>$${carrito.precio * carrito.cantidad}</p>
          </div>
          <div
            class="col-12 col-md-3 mb-3 mb-md-0 d-flex justify-content-center align-self-center"
          >
          <i class="fa-solid fa-xmark" style="cursor:pointer" data-code="${
            carrito.code
          }"></i>


          </div>
        </div>
      </div>
    </div>
  </div>
        `;
  });
  viewTotal.innerHTML = "Total $" + total;
  carrito.innerHTML = contenidoHTML;
  const botonesBorrar = document.querySelectorAll(".fa-xmark");
  botonesBorrar.forEach((boton) => {
    boton.addEventListener("click", borrarItem);
  });
}

function borrarItem(event) {
  const codigoCarrito = event.target.dataset.code;
  // Lógica para borrar el elemento del carrito
  carritoList = carritoList.filter((carrito) => carrito.code != codigoCarrito);
  total = 0;
  guardarCarrito(carritoList);
  // Actualizar la vista del carrito
  mostrarCarrito();
}

function guardarCarrito(carritoList) {
  localStorage.setItem("carrito", JSON.stringify(carritoList));
}

btnPagar.addEventListener("click", function () {
  if (!carritoList || carritoList.length === 0) {
    Swal.fire({
      title: "Error!",
      text: "Escoge un producto para comprar",
      icon: "error",
      confirmButtonText: "Entendido",
    });
  } else {
    Swal.fire({
      title: "Estas seguro que quieres comprar?",
      text: "Se te descontara de la tarjeta ingresada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmo",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Felicidades",
          text: "Tu compra ha sido exitosa",
          icon: "success",
        });
      }
    });
  }
});
