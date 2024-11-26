document.addEventListener('DOMContentLoaded', () => {
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  const tabla = document.getElementById('tabla-pedidos').getElementsByTagName('tbody')[0];

  const actualizarTabla = () => {
      tabla.innerHTML = '';

      if (pedidos.length === 0) {
          const mensaje = document.createElement('tr');
          const celda = mensaje.insertCell();
          celda.colSpan = 10;
          celda.textContent = 'No hay pedidos registrados';
          tabla.appendChild(mensaje);
          return;
      }

      pedidos.forEach((pedido, index) => {
          const nuevaFila = tabla.insertRow();
          Object.values(pedido).forEach(valor => {
              const nuevaCelda = nuevaFila.insertCell();
              nuevaCelda.textContent = valor;
          });

          const celdaEliminar = nuevaFila.insertCell();
          const botonEliminar = document.createElement('button');
          botonEliminar.textContent = 'Eliminar';
          botonEliminar.className = 'btn-eliminar'; 
          botonEliminar.dataset.index = index; 
          celdaEliminar.appendChild(botonEliminar);
      });
  };

  const eliminarPedido = (index) => {
      pedidos.splice(index, 1);
      localStorage.setItem('pedidos', JSON.stringify(pedidos));
      actualizarTabla();
  };

  tabla.addEventListener('click', (event) => {
      if (event.target.classList.contains('btn-eliminar')) {
          const index = event.target.dataset.index;

          Swal.fire({
              title: '¿Desea Eliminar el Registro?',
              text: "No podrás revertir esta acción",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Sí, eliminar',
              cancelButtonText: 'Cancelar',
              reverseButtons: true
          }).then((result) => {
              if (result.isConfirmed) {
                  eliminarPedido(index);
                  Swal.fire(
                      'Eliminado!',
                      'El pedido ha sido eliminado.',
                      'success'
                  );
              }
          });
      }
  });

  actualizarTabla();
});
