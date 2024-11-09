const cuentaCarritoElement = document.getElementById("cuenta-carrito");

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarAlCarrito(producto){
  //Revisa si el producto está en el carrito.
  let memoria = JSON.parse(localStorage.getItem("bebidas"));
  let cantidadProductoFinal;
  //Si no hay localstorage se crea
  if(!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto)
    localStorage.setItem("bebidas",JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  }
  else {
    //Ver si el producto esta en el LocalStorage
    const indiceProducto = memoria.findIndex(bebida => bebida.id === producto.id)
    const nuevaMemoria = memoria;
    //Si el producto no está en el carrito, se agrega
    if(indiceProducto === -1){
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
      //Si el producto YA está en el carrito le agrego 1 a la cantidad.
      nuevaMemoria[indiceProducto].cantidad ++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("bebidas",JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}

/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto){
  let memoria = JSON.parse(localStorage.getItem("bebidas"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(bebida => bebida.id === producto.id)
  let nuevaMemoria = memoria;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
  if(cantidadProductoFinal === 0){
    nuevaMemoria.splice(indiceProducto,1)
  };
  localStorage.setItem("bebidas",JSON.stringify(nuevaMemoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

/*
function eliminarItemCarrito(event){
  let memoria = JSON.parse(localStorage.getItem("bebidas"));
  const indiceProducto = memoria.findIndex(bebida => bebida.id === producto.id);
  const buttonClicked = event.target;

  memoria.remove();
}
*/

/** Agrega cantidad a un objeto producto */
function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/** Actualiza el número del carrito del header */
function actualizarNumeroCarrito(){
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("bebidas"));
  if(memoria && memoria.length > 0){
    cuenta = memoria.reduce((acum, current)=>acum+current.cantidad,0)
    return cuentaCarritoElement.innerText = cuenta;
  }
  cuentaCarritoElement.innerText = 0;
}

/** Reinicia el carrito */
function reiniciarCarrito(){
  localStorage.removeItem("bebidas");
  actualizarNumeroCarrito();
}

/** Finaliza la compra y guarda el historial */
/** Evento de clic en el botón de finalizar compra */
document.getElementById("boton-pagar").addEventListener("click", finalizarCompra);
function finalizarCompra() {
  // Obtener el carrito actual desde localStorage
  const carritoActual = JSON.parse(localStorage.getItem("bebidas")) || [];

  // Si el carrito está vacío, no se realiza ninguna acción
  if (carritoActual.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  // Obtener el historial actual del localStorage
  let historial = JSON.parse(localStorage.getItem("historial")) || [];

  // Agregar los productos del carrito al historial con la fecha de compra
  const nuevaCompra = {
    fecha: new Date().toLocaleString(),
    productos: carritoActual
  };
  historial.push(nuevaCompra);

  // Guardar el historial actualizado en localStorage
  localStorage.setItem("historial", JSON.stringify(historial));

  // Vaciar el carrito y actualizar la cuenta
  reiniciarCarrito();

  alert("Compra realizada exitosamente y guardada en el historial.");
}



actualizarNumeroCarrito();