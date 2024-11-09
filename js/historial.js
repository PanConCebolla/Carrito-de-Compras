
// Obtener el historial desde localStorage
const historial = JSON.parse(localStorage.getItem("historial")) || [];

function generarHistorial() {
    const historialParaMostrar = historial.length > 0 ? historial : getCompraEjemplo(bebidas);

    // Crear un array con el historial generado
    let historialHTML = "";
    historialParaMostrar.forEach(compra => {
        let compraHTML = `<div class="contenedor-Informacion">
                            <p>Fecha: ${compra.fecha}</p>`;

        compra.productos.forEach(producto => {
            // Buscar el producto en el array de bebidas
            const bebida = bebidas.find(b => b.id === producto.id);
            if (bebida) {
                compraHTML += `
                    <div class="producto-item">
                        <img src="${bebida.img}" alt="${bebida.nombre}" />
                        <p>${bebida.nombre}</p>
                        <p>Precio: $${bebida.precio}</p>
                        <p>Cantidad: ${producto.cantidad}</p>
                    </div>
                `;
            }
        });
        compraHTML += `</div>`;
        historialHTML += compraHTML;
    });

    // Devolver el historial generado como un string
    return historialHTML;
}

// Función para generar un ejemplo de compra con el array de bebidas
function getCompraEjemplo(bebidas) {
    return [{
        fecha: new Date().toLocaleString(),
        productos: bebidas.map(bebida => ({
            id: bebida.id,
            cantidad: 1
        }))
    }];
}

// Al cargar la página, generamos el historial y lo mostramos
window.onload = () => {
    const historialGenerado = generarHistorial();
    document.getElementById("contenedor-historial").innerHTML = historialGenerado;
};