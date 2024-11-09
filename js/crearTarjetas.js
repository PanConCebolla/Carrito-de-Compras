const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en bicicletas.js */
function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevaBebida = document.createElement("div");
    nuevaBebida.classList = "tarjeta-producto"
    nuevaBebida.innerHTML = `
    <img src="./img/productos/${producto.id}.png" alt="Bebida ${producto.id}">
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`
    contenedorTarjetas.appendChild(nuevaBebida);
    nuevaBebida.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
  });
}
crearTarjetasProductosInicio(bebidas);