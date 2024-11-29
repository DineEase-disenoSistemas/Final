const productTitle = localStorage.getItem('productTitle');
const total = localStorage.getItem('total');   
const medio = localStorage.getItem('medio');
const estado = localStorage.getItem('estado');

print(medio)
if (productTitle) {
    // document.getElementById('productImage').src = productImage;
    document.getElementById('productTitle').value = productTitle;
    document.getElementById('total').value = total;
    document.getElementById('status').value = estado;

    document.getElementById('payment').value = medio;

}

document.addEventListener('DOMContentLoaded', () => {
    const botonCancelar = document.querySelector('.btn-cancel');

    const cancelarReserva = () => {
        // Recuperar la lista de pedidos desde localStorage
        let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

        if (pedidos.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Sin Pedidos',
                text: 'No hay pedidos registrados para cancelar.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'Volver',
        }).then((result) => {
            if (result.isConfirmed) {
                // Eliminar el último pedido de la lista
                pedidos.pop(); // Si deseas eliminar un pedido específico, usa `splice(index, 1)`

                // Guardar los cambios en localStorage
                localStorage.setItem('pedidos', JSON.stringify(pedidos));

                Swal.fire({
                    icon: 'success',
                    title: 'Reserva Cancelada',
                    text: 'El pedido ha sido eliminado correctamente.',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    // Redirigir a otra página si es necesario
                    window.location.href = 'menu.html'; // Cambia 'menu.html' por la URL correcta
                });
            }
        });
    };

    // Asignar evento click al botón "Cancelar reserva"
    botonCancelar.addEventListener('click', cancelarReserva);
});




// if (productImage && productTitle) {
//   document.getElementById('productImage').src = productImage;
//   document.getElementById('productTitle').value = productTitle;
//   document.getElementById('productPrice').value = productPrice;

//   // Asignar valores a los campos 'total', 'status' y 'payment'
//   if (total) document.getElementById('total').value = total;
//   if (estado) document.getElementById('status').value = estado;
//   if (medio) document.getElementById('payment').value = medio;
// }