document.addEventListener('DOMContentLoaded', () => {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const tabla = document.getElementById('tabla-pedidos').getElementsByTagName('tbody')[0];
    const modalEdicion = document.getElementById('modal-edicion');
    const formEditar = document.getElementById('form-editar');
    let pedidoActualIndex = null;

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

            const celdaAcciones = nuevaFila.insertCell();

            // Botón de eliminar
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.className = 'btn-eliminar';
            botonEliminar.dataset.index = index;
            celdaAcciones.appendChild(botonEliminar);

            // Botón de editar
            const botonEditar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.className = 'btn-editar';
            botonEditar.dataset.index = index;
            celdaAcciones.appendChild(botonEditar);
        });
    };

    const eliminarPedido = (index) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                pedidos.splice(index, 1);
                localStorage.setItem('pedidos', JSON.stringify(pedidos));
                actualizarTabla();
                Swal.fire('Eliminado', 'El pedido ha sido eliminado.', 'success');
            }
        });
    };

    const mostrarModalEdicion = (index) => {
        pedidoActualIndex = index;
        const pedido = pedidos[index];

        document.getElementById('editar-plato').value = pedido.Plato;
        document.getElementById('editar-nombres').value = pedido.Nombres;
        document.getElementById('editar-apellidos').value = pedido.apellidos;
        document.getElementById('editar-cedula').value = pedido.cedula;
        document.getElementById('editar-celular').value = pedido.celular;
        document.getElementById('editar-carnet').value = pedido.carnet;
        document.getElementById('editar-correo').value = pedido.correo;
        document.getElementById('editar-cantidad').value = pedido.cantidad;
        document.getElementById('editar-valor').value = pedido.valor;
        document.getElementById('editar-medio').value = pedido.medio;

        modalEdicion.style.display = 'flex';
    };

    const guardarCambios = (event) => {
        event.preventDefault();

        const pedidoEditado = {
            Plato: document.getElementById('editar-plato').value,
            nombres: document.getElementById('editar-nombres').value,
            apellidos: document.getElementById('editar-apellidos').value,
            cedula: document.getElementById('editar-cedula').value,
            celular: document.getElementById('editar-celular').value,
            carnet: document.getElementById('editar-carnet').value,
            correo: document.getElementById('editar-correo').value,
            cantidad: document.getElementById('editar-cantidad').value,
            valor: document.getElementById('editar-valor').value,
            medio: document.getElementById('editar-medio').value
        };

        pedidos[pedidoActualIndex] = pedidoEditado;
        localStorage.setItem('pedidos', JSON.stringify(pedidos));

        actualizarTabla();
        modalEdicion.style.display = 'none';

        Swal.fire('Actualizado', 'El pedido ha sido actualizado.', 'success');
    };

    const cerrarModal = () => {
        modalEdicion.style.display = 'none';
    };

    tabla.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-eliminar')) {
            const index = event.target.dataset.index;
            eliminarPedido(index);
        }

        if (event.target.classList.contains('btn-editar')) {
            const index = event.target.dataset.index;
            mostrarModalEdicion(index);
        }
    });

    // Evento para guardar los cambios
    formEditar.addEventListener('submit', guardarCambios);
    
    document.getElementById('cancelar-edicion').addEventListener('click', cerrarModal);

    actualizarTabla();
});