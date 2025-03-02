const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');


let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

const usuario = usuarios.find(u => u.id == userId);

if (usuario) {
 
  document.getElementById('nombre').value = usuario.nombre;
  document.getElementById('apellidos').value = usuario.apellidos;
  document.getElementById('email').value = usuario.email;
  document.getElementById('estado').value = usuario.estado;
} else {
  console.error("Usuario no encontrado");
}
