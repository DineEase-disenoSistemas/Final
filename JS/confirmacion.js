function guardarDatos() {
  const Nombres = document.getElementById('Nombres').value;
  const apellidos = document.getElementById('apellidos').value;
  const cedula = document.getElementById('cedula').value;
  const celular = document.getElementById('celular').value;
  const carnet = document.getElementById('carnet').value;
  const correo = document.getElementById('correo').value;
  const cantidad = document.getElementById('cantidad').value;
  const valor = document.getElementById('productPrice').value;
  const medio = document.getElementById('medio').value;
  const Plato = document.getElementById('productTitle').value;
  const estado="Pendiente"

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
      Plato,
      Nombres,
      apellidos,
      cedula,
      celular,
      carnet,
      correo,
      cantidad,
      valor,
      medio,
      estado
  };

  let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.push(pedido);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));

  Swal.fire({
    icon: 'success',
    title: 'Pedido Guardado',
    text: 'Los datos se han guardado correctamente.',
    confirmButtonText: 'Aceptar'
  }).then(() => {
    window.location.href = 'reservaEnCurso.html';
  });
}

const productImage = localStorage.getItem('productImage');
const productTitle = localStorage.getItem('productTitle');
const productPrice = localStorage.getItem('productPrice');  

if (productImage && productTitle) {
    document.getElementById('productImage').src = productImage;
    document.getElementById('productTitle').value = productTitle;
    document.getElementById('productPrice').value = productPrice;
}
