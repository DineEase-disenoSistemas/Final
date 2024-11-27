function guardarDatos() {
  const Nombres = document.getElementById('Nombres').value;
  const apellidos = document.getElementById('apellidos').value;
  const cedula = document.getElementById('cedula').value;
  const celular = document.getElementById('celular').value;
  const carnet = document.getElementById('carnet').value;
  const correo = document.getElementById('correo').value;
  const cantidad = document.getElementById('cantidad').value;
  const valor = document.getElementById('valor').value;
  const medio = document.getElementById('medio').value;

  if (!Nombres || !apellidos || !cedula || !celular || !carnet || !correo || !cantidad || !valor || !medio) {
    Swal.fire({
      icon: 'error',
      title: 'Campos Vacíos',
      text: 'Por favor, complete todos los campos antes de enviar el formulario.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const pedido = {
      Nombres,
      apellidos,
      cedula,
      celular,
      carnet,
      correo,
      cantidad,
      valor,
      medio
  };

  let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.push(pedido);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
  // hola

  Swal.fire({
    icon: 'success',
    title: 'Pedido Guardado',
    text: 'Los datos se han guardado correctamente.',
    confirmButtonText: 'Aceptar'
  }).then(() => {
    window.location.href = 'pedido.html';
  });
}

const productImage = localStorage.getItem('productImage');
const productTitle = localStorage.getItem('productTitle');

// Mostrar los datos en los elementos HTML
if (productImage && productTitle) {
    document.getElementById('productImage').src = productImage;
    document.getElementById('productTitle').value = productTitle;
}
localStorage.removeItem('productImage');
localStorage.removeItem('productTitle');